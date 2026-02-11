---
title: "Cooking with Constraints: A Designer's Framework for Better AI Prompts (TC-EBC)"
url: https://www.figma.com/blog/designer-framework-for-better-ai-prompts/
source: Figma Blog — Greg Huntoon
saved: 2026-02-11
tags: [prompting, design, framework, figma, ai, tc-ebc]
---

## Summary
A structured prompt framework called **TC-EBC** (Task, Context, Elements, Behavior, Constraints) from a Figma designer. Uses cooking as metaphor — "mise en place" for prompts. Key insight: models need clarity, not politeness. Structure collapses uncertainty into intent.

## TC-EBC Framework

| Component | Purpose | Example |
|-----------|---------|---------|
| **Task** | What you're building | "Build an AI-powered meal suggestion app" |
| **Context** | Why and for whom — prevents drift | "Home cooking assistant for dietary restrictions" |
| **Elements** | Specific UI/content pieces needed | "Camera input, pantry scanner, recipe cards" |
| **Behavior** | How it should work / respond | "User uploads photos; app filters by diet, suggests recipes" |
| **Constraints** | Guardrails, limits, non-negotiables | "Mobile-first, accessible, under 200 chars" |

## Key Principles

- **Subtraction over addition** — remove everything the model doesn't need. Elegance = paring down.
- **Clarity over politeness** — "please" and "maybe" dilute intent. Models need clean instructions.
- **Structure over vibes** — probabilistic systems need deterministic inputs. Design the prompt like a system.
- **Iteration is calibration** — taste, test, adjust. Each round reveals gaps. Revision prompts should explicitly state what NOT to change.
- **Context is discipline** — curate what the model sees, remembers, and weighs (Anthropic calls this "context engineering").

## Prompting Anti-Patterns
- Burying the task in pleasantries
- Using "maybe," "just," "perhaps" — introduces ambiguity
- Providing screenshots when structured data is available (Figma frames > images)
- Being verbose when tight constraints would work better

## Model Selection (from article's Figma Make context)
- **Claude** — balanced collaborator, follows layered structure well, TC-EBC native
- **Gemini** — fast, sharp on narrow tasks, no patience for vague input
- **GPT** — best generalist, responds well to examples and demonstration

## Revision Prompting Tips
- Use an LLM as a "prompt partner" to refine your prompts before sending
- In Constraints section of revision prompts, explicitly state what should NOT change
- Layer in context progressively: style libraries, APIs, PRDs, task trackers
- Each revision teaches the model your style — process gets faster over time

## Relevance
This maps directly to how Saber and I work:
- When Saber asks me to create something, I should mentally apply TC-EBC before executing
- Ask myself: Do I have clear Task, Context, Elements, Behavior, Constraints?
- If any are missing, ask targeted questions rather than guessing
- Saber's "subtraction > addition" philosophy aligns perfectly with the article's "elegance = subtraction"

## Resources
- TC-EBC framework repo: https://github.com/greghuntoon-figma/tc-ebc
- Make Prompt Assistant GPT: https://chatgpt.com/g/g-6847442f6bec81919bee6655a005d9b2-make-prompt-assistant
