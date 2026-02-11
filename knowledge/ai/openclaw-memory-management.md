---
title: "OpenClaw Memory Management — P0/P1/P2 Priority System"
url: https://github.com/jzOcb/openclaw-memory-management
source: jzOcb, based on @ohxiyu's system
saved: 2026-02-11
tags: [openclaw, memory, management, architecture, agents]
---

## Summary
A memory management system for OpenClaw that uses P0/P1/P2 priority tags with TTL-based auto-archival. Claims 78% token reduction (427→96 lines). Python janitor script runs via cron to auto-archive expired entries.

## Architecture
- **MEMORY.md (Hot Memory)** — loaded every session, ≤200 lines
  - P0: Core identity, never expires
  - P1: Active projects, 90-day TTL
  - P2: Temporary notes, 30-day TTL
- **memory/lessons/*.jsonl** — structured lessons, semantic search
- **memory/archive/** — expired content, searchable but not loaded
- **memory/YYYY-MM-DD.md** — daily raw logs

## Format
```
- [P0] User prefers Chinese responses
- [P1][2026-02-07] TaxForge v1.4.0 released
- [P2][2026-02-05] Debugged cron timezone issue
```

## Janitor Script
- Runs daily at 4 AM via system crontab
- Atomic writes (temp file + rename)
- Dedup archive (won't re-archive same lines)
- `--dry-run` and `--stats` modes
- MAX_LINES warning when MEMORY.md exceeds 200

## Our Decision: Don't Adopt (Yet)
- Our MEMORY.md is still small (day 3) — no bloat problem
- Tagging format `[P1][date]` adds visual noise to readable notes
- We already have equivalent 3-layer architecture (MEMORY.md + memory/*.md + memory_search)
- Better approach: Atticus handles pruning during heartbeat maintenance, natural language style
- Revisit if MEMORY.md exceeds ~150 lines
- Key takeaway borrowed: periodic heartbeat review + archive stale content to `memory/archive/`
