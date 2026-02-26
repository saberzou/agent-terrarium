# OpenClaw Best Practices — Community Tips (Feb 2026)

Source: https://x.com/aiedge_/status/2024882793462005866

## Already Implemented ✅
- Memory flush before compaction (memoryFlush.enabled: true)
- Loopback binding (gateway.bind: loopback)
- Auth token on gateway
- SOUL.md persona, USER.md, AGENTS.md workspace structure
- Lean HEARTBEAT.md with rotation
- Multi-chat (Telegram + Discord)
- Model selection with aliases and fallbacks
- Workspace as git repo
- Local embedding model for memory search
- Context pruning (cache-ttl)

## Worth Considering
- **Session memory search** (`memorySearch.experimental.sessionMemory: true`) — indexes past session transcripts so `memory_search` can find things from old conversations, not just memory files. Opt-in, async indexing, slightly more disk I/O.
- **Full autonomy pattern** — treat disk state (files, structured stores) as source of truth, not chat history. Design agent loop to reconstruct "what to do next" from disk after any compaction/reset. We partially do this; could be more disciplined.
- **End sessions cleanly** — summarize changes, confirm no pending edits, verify git status before closing.

## Notable Resources
- QMD Skill (95% token reduction): github.com/levineam/qmd-skill
- Claude Code skill (CC via MCP): github.com/Enderfga/openclaw-claude-code-skill
- X research skill: github.com/rohunvora/x-research-skill
- Supermemory plugin: github.com/supermemoryai/clawdbot-supermemory
- Skills collection: github.com/VoltAgent/awesome-openclaw-skills

## Key Principles (from article)
- Scope > execution — limit directories and editable files explicitly
- Planning > execution — propose plan first, approve before changes
- Think in workflows, not one-off tasks
- Break large tasks into phases (analysis → refactor → validation → optimization)
- Treat third-party skills as untrusted until verified
- RAM > CPU for OpenClaw workloads; SSD essential
