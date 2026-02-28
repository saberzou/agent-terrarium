---
title: "Lessons from Building Claude Code: Seeing like an Agent"
url: https://x.com/trq212/status/2027463795355095314
source: Thariq (@trq212), Anthropic Claude Code team
saved: 2026-02-28
tags: [agents, tool-design, claude-code, progressive-disclosure, elicitation, context-engineering]
---

## Summary
X Article on designing agent tool interfaces, drawn from building Claude Code. Core thesis: design tools shaped to the model's abilities, not the developer's intuition. "See like an agent" — read outputs, experiment, iterate.

## Key Lessons

### 1. AskUserQuestion Tool — Elicitation
- **Attempt 1:** Bolted questions onto ExitPlanTool → confused model (plan + questions conflicted)
- **Attempt 2:** Custom markdown output format → unreliable (model appended extra text, omitted options)
- **Attempt 3 (winner):** Dedicated tool with structured output + modal UI blocking agent loop
- **Takeaway:** Best-designed tool is useless if the model doesn't understand how to call it

### 2. Todos → Tasks — Updating with Capabilities
- Originally: TodoWrite tool + system reminders every 5 turns to keep model on track
- As models improved: reminders became counterproductive (model stuck rigidly to list instead of adapting)
- Replaced with Task Tool for multi-agent coordination (dependencies, shared updates, deletable)
- **Takeaway:** Tools that helped weaker models can constrain stronger ones. Revisit assumptions constantly.

### 3. Search: RAG → Grep → Progressive Disclosure
- Started with vector DB RAG (fragile, required indexing, model received context passively)
- Switched to Grep tool — let Claude search and build context itself
- Formalized as "progressive disclosure" via Skills: files referencing other files, recursive discovery
- **Takeaway:** Smarter models are better at building their own context given search primitives

### 4. Guide Agent — Adding Capability Without Tools
- Problem: Claude didn't know about Claude Code features (MCPs, slash commands)
- System prompt approach → context rot, interfered with main coding job
- Solution: Subagent that Claude calls when asked about itself, with focused doc-search instructions
- **Takeaway:** Progressive disclosure adds capability without adding tools. ~20 tools total, bar to add new one is high.

## Quotable
> "Claude Code currently has ~20 tools, and we are constantly asking ourselves if we need all of them. The bar to add a new tool is high, because this gives the model one more option to think about."

> "As model capabilities increase, the tools that your models once needed might now be constraining them."

## Relevance to OpenClaw
- Progressive disclosure = OpenClaw's SKILL.md → references pattern
- Tool restraint philosophy aligns with skill-based architecture (load on demand, not always)
- Elicitation patterns relevant for improving agent ↔ user communication
- Todo → Task evolution mirrors how agent memory/planning should adapt with model upgrades
