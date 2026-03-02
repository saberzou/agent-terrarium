#!/bin/bash
# Updates status.json for agent-terrarium based on live OpenClaw session data
# Run via cron or heartbeat

set -e
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
STATUS_FILE="$REPO_DIR/status.json"

# Get active sessions from last 30 minutes
SESSIONS_MAIN=$(openclaw sessions list --active 30 --agent main --json 2>/dev/null || echo '{"sessions":[]}')
SESSIONS_AXEL=$(openclaw sessions list --active 30 --agent axel --json 2>/dev/null || echo '{"sessions":[]}')
SESSIONS_ASTRA=$(openclaw sessions list --active 30 --agent astro --json 2>/dev/null || echo '{"sessions":[]}')

now=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Determine agent statuses from session activity
detect_status() {
  local sessions_json="$1"
  local has_active=$(echo "$sessions_json" | python3 -c "
import sys, json
data = json.load(sys.stdin)
sessions = data.get('sessions', data) if isinstance(data, dict) else data
if isinstance(sessions, dict):
    sessions = sessions.get('sessions', [])
if len(sessions) > 0:
    print('working')
else:
    print('idle')
" 2>/dev/null || echo "idle")
  echo "$has_active"
}

# Also check running cron jobs
CRON_DATA=$(openclaw cron list --json 2>/dev/null || echo '{"jobs":[]}')

detect_cron_activity() {
  local agent_id="$1"
  local running=$(echo "$CRON_DATA" | python3 -c "
import sys, json
data = json.load(sys.stdin)
jobs = data.get('jobs', data) if isinstance(data, dict) else data
if isinstance(jobs, dict):
    jobs = jobs.get('jobs', [])
for job in jobs:
    aid = job.get('agentId', '') or ''
    status = job.get('lastStatus', '')
    if aid == '${agent_id}' and status == 'running':
        print(job.get('name', 'task'))
        sys.exit(0)
print('')
" 2>/dev/null || echo "")
  echo "$running"
}

get_last_task() {
  local agent_id="$1"
  echo "$CRON_DATA" | python3 -c "
import sys, json
data = json.load(sys.stdin)
jobs = data.get('jobs', data) if isinstance(data, dict) else data
if isinstance(jobs, dict):
    jobs = jobs.get('jobs', [])
for job in sorted(jobs, key=lambda j: j.get('lastRun',''), reverse=True):
    aid = job.get('agentId', '') or ''
    if aid == '${agent_id}' and job.get('lastRun'):
        print(job.get('name', ''))
        sys.exit(0)
print('')
" 2>/dev/null || echo ""
}

atticus_cron=$(detect_cron_activity "main")
axel_cron=$(detect_cron_activity "axel")
astra_cron=$(detect_cron_activity "astro")

atticus_status="idle"
axel_status="idle"
astra_status="idle"

atticus_task=""
axel_task=""
astra_task=""

if [ -n "$atticus_cron" ]; then
  atticus_status="working"
  atticus_task="$atticus_cron"
fi
if [ -n "$axel_cron" ]; then
  axel_status="working"
  axel_task="$axel_cron"
fi
if [ -n "$astra_cron" ]; then
  astra_status="working"
  astra_task="$astra_cron"
fi

# If no cron running, check session activity
if [ "$atticus_status" = "idle" ]; then
  atticus_status=$(detect_status "$SESSIONS_MAIN")
  if [ "$atticus_status" = "working" ]; then
    atticus_task=$(get_last_task "main")
  fi
fi
if [ "$axel_status" = "idle" ]; then
  axel_status=$(detect_status "$SESSIONS_AXEL")
  if [ "$axel_status" = "working" ]; then
    axel_task=$(get_last_task "axel")
  fi
fi
if [ "$astra_status" = "idle" ]; then
  astra_status=$(detect_status "$SESSIONS_ASTRA")
  if [ "$astra_status" = "working" ]; then
    astra_task=$(get_last_task "astro")
  fi
fi

# Time-based: sleeping at night
hour=$(date +%H)
if [ "$hour" -ge 23 ] || [ "$hour" -lt 7 ]; then
  [ "$atticus_status" = "idle" ] && atticus_status="sleeping"
  [ "$axel_status" = "idle" ] && axel_status="sleeping"
  [ "$astra_status" = "idle" ] && astra_status="sleeping"
fi

# Write status.json
cat > "$STATUS_FILE" << EOF
{
  "agents": {
    "atticus": { "status": "$atticus_status", "task": "$atticus_task" },
    "axel": { "status": "$axel_status", "task": "$axel_task" },
    "astra": { "status": "$astra_status", "task": "$astra_task" }
  },
  "updatedAt": "$now"
}
EOF

# Commit and push if changed
cd "$REPO_DIR"
if ! git diff --quiet status.json 2>/dev/null; then
  git add status.json
  git commit -m "Auto-update agent status [$(date '+%H:%M')]" --no-verify
  git push
fi
