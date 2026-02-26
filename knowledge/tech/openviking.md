---
title: "OpenViking — Context Database for AI Agents"
url: https://github.com/volcengine/OpenViking
source: ByteDance / Volcengine
saved: 2026-02-18
tags: [agents, context-engineering, memory, rag, filesystem, database]
---

## Summary
Open-source "context database" for AI agents from ByteDance/Volcengine. Replaces flat vector RAG with a **filesystem paradigm** — organize agent memory, resources, and skills like directories and files. 2.5k stars, Python + Rust CLI, active development.

## Key Concepts
- **Filesystem management paradigm** — unified context management (memories, resources, skills) as a file tree instead of fragmented vector stores
- **L0/L1/L2 tiered context loading** — load on demand, not all at once. Saves tokens significantly.
- **Directory-recursive retrieval** — combines structural directory navigation with semantic search for more precise context
- **Visualized retrieval trajectories** — debug exactly why/how context was retrieved (solves RAG black-box problem)
- **Auto session management** — compresses conversations, extracts long-term memory automatically

## Supported Providers
Volcengine (Doubao), OpenAI, Anthropic, DeepSeek, Gemini, Moonshot (Kimi), Zhipu, DashScope (Qwen), MiniMax, OpenRouter, vLLM

## Install
```bash
pip install openviking
# Optional Rust CLI
curl -fsSL https://raw.githubusercontent.com/volcengine/OpenViking/main/crates/ov_cli/install.sh | bash
```

## Comparison to OpenClaw Memory
OpenClaw uses flat markdown files (MEMORY.md, memory/*.md) + semantic search. Works well for small-scale personal agents. OpenViking is more structured: proper tiered indexing, VLM image understanding, database-level retrieval. Better suited for agents ingesting massive context at scale.

## Verdict
Worth watching, not switching to yet. If we outgrow flat markdown files, this is a strong option. Retrieval visualization is the standout feature.

## Links
- Repo: https://github.com/volcengine/OpenViking
- Docs: https://www.openviking.ai/docs
- Site: https://www.openviking.ai
- Discord: https://discord.com/invite/eHvx8E9XF3
