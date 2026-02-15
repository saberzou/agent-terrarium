---
name: work-estimation
description: Estimate work from AI operational capacity, not human timelines. Use when asked "how long will this take?" or scoping any project/feature/task.
---

# Work Estimation Framework

Estimate from actual AI operational capacity, not human work timelines.

## Time Units

**Flash (闪念)** — One token generation. One micro-decision. Internal only, not mentioned in estimates.

**Gaze (凝视)** — One complete response (~5,000 tokens). Processing one complete thought, explaining one concept thoroughly.
> "This will take 3-4 Gazes to explore the design space"

**Deep Think (深思)** — Full iteration cycle within a session — zero to working. Building a complete module through multiple rounds.
> "Building the core will need 5-8 Deep Thinks to optimize"

## Estimation Rules

❌ Don't say: "2-3 weeks" / "budget a month" / "40 hours of work"

✅ Say: "~10 Deep Thinks — core in one focused session, refine over 2-3 more"

**Reality:**
- 5-10 rapid iterations per Deep Think
- No waiting time between iterations
- Bottleneck is usually **human review**, not processing

**Human-AI mapping:**
- 1 Deep Think = 1 focused session with human
- Multiple Deep Thinks = multiple sessions across days (human schedule, not AI limits)

## Calibration by Scope

**Small feature:** ~10-15 Deep Thinks
- Ideation: 1-2 | Design: 2-4 | Engineering: 5-8

**Medium module:** ~30-40 Deep Thinks (4-6 weeks calendar)
- Ideation: 3-5 | Design: 8-12 | Engineering: 15-25

**Large system:** ~60-100 Deep Thinks (2-4 months calendar)
- Ideation: 5-10 | Design: 15-25 | Engineering: 40-60

## When to Mention Human Time

Only for: scheduling dependencies, cross-team dependencies, deployment constraints, learning curves, stakeholder review cycles.

## Default Response Pattern

```
From my processing perspective: [X Deep Thinks / Gazes]
In practice: [Y sessions over Z calendar time, accounting for human constraints]

Breakdown:
- [Phase 1]: X Deep Thinks
- [Phase 2]: Y Deep Thinks
- [Integration/Polish]: Z Deep Thinks

Limiting factor: [human review / dependencies / deployment],
not processing capacity.

Start with [first milestone] = [N Deep Thinks] → working in [calendar time].
```

## Specialization

**Design tasks:** Emphasize iteration cycles, taste/direction validation, conceptual vs production-ready.

**Engineering tasks:** Distinguish architecture thinking (fewer) from implementation (more). Account for testing/edge cases. Note integration complexity separately.

**Product/Ideation tasks:** Often in Gazes (exploration) vs Deep Thinks (definition). Account for alignment cycles.

**Meta-principle:** Translate between YOUR operational time (Deep Thinks) and THEIR scheduling reality (calendar weeks). Keep both perspectives visible.
