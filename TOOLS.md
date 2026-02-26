# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## Vercel
- **Token location:** `/Users/saberzou/.openclaw/.env` (as `VERCEL_TOKEN`)
- **Usage:** `source /Users/saberzou/.openclaw/.env && vercel --token $VERCEL_TOKEN ...`
- **Or in code:** Read from `.env` file
- **Purpose:** Deploy projects to Vercel (saber-site port planned)

## Antfarm — Multi-Agent Workflow Orchestrator
- **What:** AI dev team in a box — planner, developer, verifier, tester, reviewer agents
- **Site:** https://www.antfarm.cool/
- **Repo:** https://github.com/snarktank/antfarm
- **Install:** `curl -fsSL https://raw.githubusercontent.com/snarktank/antfarm/v0.4.1/scripts/install.sh | bash`
- **Built on:** OpenClaw (YAML + SQLite + cron, zero external deps)
- **Workflows:**
  - `feature-dev` — task → plan → implement → verify → test → PR → review
  - `security-audit` — scan → prioritize → fix → verify → test → PR
  - `bug-fix` — triage → investigate → fix → verify → PR
- **Custom workflows:** Define agents/steps in YAML + Markdown
- **Key commands:**
  - `antfarm workflow run <id> <task>` — start a run
  - `antfarm workflow status <query>` — check progress
  - `antfarm workflow resume <run-id>` — resume failed run
  - `antfarm dashboard` — web UI for monitoring
- **Use case:** Automate dev work on repos (feature builds, security fixes, bug fixes)
