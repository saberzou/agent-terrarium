---
title: "Autonomous Digital Designer — PRD-to-Production Architecture"
url: https://claude.ai/share/0b0c42d4-e40e-4a48-93c7-a13d2b631ce5
source: Saber's Claude conversation + Atticus analysis
saved: 2026-02-12
tags: [design-system, ai-agent, automation, architecture, microsoft]
---

## Concept
An AI agent that takes PRDs + design system tokens + production codebase context and generates multiple design/code options. Human designers select the best one, log the reasoning, and the system learns over time. Essentially: **design skill distillation** — turning a 70-person team's collective judgment into a learnable, scalable system.

## The Loop
```
PRD → Claude reads: tokens.css + DESIGN_SYSTEM.md + past decisions
    → Generates 3 options (production-ready, different philosophies)
    → Designer reviews, picks best, documents why
    → System logs decision → biases toward past winners next time
```

## 7-Layer Architecture (from Claude conversation)
1. Design system as queryable machine-readable context
2. Codebase mirror branch + context injection
3. PRD-to-design agent pipeline
4. Decision logger (learning system)
5. Multi-option generation with comparison
6. Human review + learning loop
7. Feedback + iteration

## Atticus's Critique

### Ship 3 layers, not 7
Start with: design system as context (already exists), multi-option generation, decision logging. Close the learning loop only after accumulating enough decisions.

### Constrain the 3 options
Not 3 random variations — 3 strategically different options along a defined axis (minimal vs. rich, dense vs. spacious). Otherwise decision logs capture noise.

### Decision logging must be dead simple
Forced choice from ~5 principles (simplicity, consistency, accessibility, information density, brand alignment) + optional free text. Open-ended "document why" will be skipped by busy designers.

### Codebase mirror = the moat
Knowing actual component patterns (not generic Radix docs) is what separates this from v0.dev/Figma Make. But keeping the mirror fresh and context-window-manageable is the hardest engineering challenge.

### "Production-ready" needs a checklist
Define what it means: a11y? Loading/error states? Responsive breakpoints? Have the agent self-validate before presenting options.

### What's missing
- **Review UX**: How do designers compare 3 options? Side-by-side renders? Code diffs? If review takes 20 min, nobody uses it. 2 min = adoption.
- **Conflict resolution**: 70 designers will have contradicting preferences. Need per-designer profiles or team consensus mechanism.
- **Skill versioning**: Snapshot "the system's taste at point X" to debug regressions when learned preferences shift.

## Bottom Line
The differentiator is the learning loop, not the generation. Get the loop turning with even crude generation — the accumulated decision data is worth more than the architecture doc.

## Related
- Saber's existing Design Skills for Claude Code (Radix + Tailwind tokens)
- TC-EBC prompt framework (see `design/tc-ebc-prompt-framework.md`)
