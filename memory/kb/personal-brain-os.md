# Personal Brain OS — File System as AI Memory
- **Source:** https://x.com/koylanai/status/2025286163641118915
- **Author:** Muratcan Koylan (Context Engineer @ Sully.ai)
- **Saved:** 2026-02-23
- **Stats:** 3.3K likes, 10.4K bookmarks, 847K views

## What It Is
A file-based personal operating system in a Git repo. 80+ files in Markdown, YAML, and JSONL that both humans and LLMs read natively. No database, no API keys, no build step. Clone it, open in Cursor/Claude Code, AI has full context: voice, brand, goals, contacts, content pipeline, research, failures.

**Repo:** https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering

## Core Architecture

### 1. Progressive Disclosure (Key Pattern)
Don't dump everything into system prompt — it degrades performance (U-shaped attention curve).

- **Level 1:** Lightweight routing file (`SKILL.md`) — always loaded, tells AI which module is relevant
- **Level 2:** Module-specific instructions (40-100 lines each) — loaded per-task
- **Level 3:** Actual data (JSONL, YAML, research) — loaded only when task requires

Max 2 hops to any piece of information.

### 2. Agent Instruction Hierarchy
Three scoped layers prevent conflicting instructions:
- **Repository level:** `CLAUDE.md` — onboarding, full project map
- **Brain level:** `AGENT.md` — 7 core rules + decision table mapping requests → action sequences
- **Module level:** Per-directory instruction files with domain-specific constraints

### 3. Format-Function Mapping
- **JSONL** for logs — append-only (prevents agent from overwriting history), stream-friendly, each line self-contained
- **YAML** for config — hierarchical, supports comments, clean for goals/values
- **Markdown** for narrative — LLMs read natively, clean Git diffs

### 4. 11 Isolated Modules
AI loads only what's needed per task. Writing task → voice guide + brand. Meeting prep → contacts + interactions. Never cross-loads irrelevant modules.

## Episodic Memory (Judgment, Not Just Facts)
Three append-only logs in `memory/`:
- `experiences.jsonl` — key moments with emotional weight (1-10)
- `decisions.jsonl` — reasoning, alternatives considered, outcomes
- `failures.jsonl` — root cause + prevention steps

This encodes *judgment*, not just data. Agent references past reasoning for similar decisions.

## Skill System
Two types following Anthropic Agent Skills standard:
- **Reference skills** (auto-loading): voice guide, anti-patterns — silently injected for relevant tasks
- **Task skills** (manual `/slash` commands): `/write-blog`, `/topic-research` — explicit invocation with full quality gates

### Voice Encoding
- 5 attributes rated 1-10 (Formal/Casual, Serious/Playful, etc.)
- 50+ banned words in 3 tiers
- 4-pass editing: structure → voice → evidence → read-aloud
- Checkpoints every 500 words

## Lessons Learned
1. **Over-engineered schemas fail.** Cut from 15+ fields to 8-10. Sparse data confuses agents.
2. **Voice guide was too long (1,200 lines).** Front-load distinctive patterns in first 100 lines — lost-in-middle effect kills voice consistency by paragraph 4.
3. **Module boundaries = loading decisions.** Wrong boundaries = loading too much. Splitting identity/brand saved 40% tokens on voice tasks.
4. **Append-only is non-negotiable.** Lost 3 months of data when agent rewrote a JSONL file. JSONL's append-only pattern is a safety mechanism.

## Key Insight
> Context engineering, not prompt engineering. Prompt engineering: "how do I phrase this better?" Context engineering: "what information does this AI need, and how do I structure it so the model actually uses it?"

The shift is from optimizing individual interactions to designing information architecture.

## Relevance to Our Setup
- OpenClaw already implements many of these patterns (SOUL.md, AGENTS.md, MEMORY.md, skill system)
- Progressive disclosure is worth refining — are we loading too much per task?
- Episodic memory (decisions.jsonl, failures.jsonl) is something we could add
- Voice encoding with numeric scales + banned words is more precise than prose descriptions
- Append-only JSONL for logs is a principle worth adopting more broadly
