---
title: "一万字提示词+10个文件，给你的AI造一个'数字灵魂' — Personal AI Infrastructure (TELOS)"
url: https://x.com/vista8/status/2021240338908876854
source: 向阳乔木 (@vista8) via Notion clip
saved: 2026-02-11
tags: [ai, personal-ai, infrastructure, memory, telos, claude-code, obsidian]
---

## Summary
A deep dive into Daniel Miessler's "Personal AI Infrastructure" (PAI) system — a framework for turning AI from a stateless tool into persistent personal infrastructure. Uses 10 TELOS files (markdown in Obsidian) to create a "digital soul" that knows who you are, plus a 3-layer memory system. Open source at github.com/danielmiessler/Personal_AI_Infrastructure.

## Core Insight
The problem isn't AI's memory — it's that we treat AI as "tools" instead of "infrastructure." Like going from a vending machine to an operating system.

## TELOS System — 10 Files That Define You
0. **Core Identity** (00-core-identity.md) — basics, background, roles
1. **Values** (01-values.md) — what matters most
2. **Background** (02-background.md) — experiences that shaped you
3. **Skills** (03-skills.md) — what you're good at, what you're learning
4. **Communication Style** (04-communication-style.md) — how you like to talk
5. **Goals** (05-goals.md) — short and long term
6. **Knowledge Domains** (06-knowledge-domains.md) — expertise and interests
7. **Work Approach** (07-work-approach.md) — workflows and preferences
8. **Relationships & Context** (08-relationships-context.md) — social/professional network
9. **Interests** (09-interests.md) — what excites you

Key: these are living documents, not one-time questionnaires. They evolve with every conversation and project.

## 3-Layer Memory Architecture
1. **Working Memory** — current conversation context (real-time, dynamic)
2. **Episodic Memory** — specific conversation logs and project history ("last week we discussed that API design...")
3. **Semantic Memory** — distilled knowledge and patterns ("you prefer functional programming", "you care about performance")

Mirrors how human brains work: we don't remember every detail, but we remember important events and form concepts/intuition from experience.

## Tool Stack
- **Claude Code** (or any AI coding tool with good context management)
- **Obsidian** (free, local-first notes app)
- Markdown files, version-controllable with Git
- Data stays local — full data sovereignty

## Infrastructure vs Tool Thinking
| Aspect | Tool (current) | Infrastructure (TELOS) |
|--------|---------------|----------------------|
| Memory | Stateless | Persistent |
| Personalization | Generic | Deep understanding |
| Customization | Black box | Programmable |
| History | Random | Versioned, traceable |

## Relevance to Our Setup
This is essentially what we already have with OpenClaw:
- SOUL.md ≈ core identity + communication style
- USER.md ≈ relationship context
- MEMORY.md + memory/*.md ≈ episodic + semantic memory
- AGENTS.md ≈ work approach
- knowledge/ ≈ knowledge domains

We're already living the PAI philosophy — just with different file names. Could consider adopting the TELOS numbering for more structured personal context.

## Source
Open source repo: https://github.com/danielmiessler/Personal_AI_Infrastructure
