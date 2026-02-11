# Knowledge Base

Your personal knowledge base. Drop URLs or ideas here — I'll organize them.

## How It Works

**Save something:**
- Send me a URL with "save this" or "add to KB" — I'll fetch, summarize, and file it
- Or just say "remember that X does Y" — I'll create a note

**Find something:**
- Ask naturally: "What did I save about CSS animations?"
- I search semantically across all files using local embeddings

**Browse:**
- `knowledge/` — all saved items as markdown files
- Each file has frontmatter: title, source URL, date, tags

## Folder Structure

```
knowledge/
├── README.md          ← this file
├── design/            ← design, UI, color, typography
├── tech/              ← programming, tools, frameworks
├── ai/                ← AI, LLMs, agents
├── ideas/             ← personal ideas, inspiration
└── misc/              ← everything else
```

## File Format

Each saved item looks like:

```markdown
---
title: Article Title
url: https://example.com/article
saved: 2026-02-11
tags: [css, animation, web]
---

## Summary
2-3 sentence summary of the key insight.

## Notes
- Bullet points of what matters
- Key takeaways
- Things to remember

## Quotes (optional)
> Notable excerpts from the source
```
