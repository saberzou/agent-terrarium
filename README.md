# Agent Terrarium 🏠🐻🐯🦝

A living 3D diorama showing three AI agents in their natural habitats.

## Live Demo
https://saberzou.github.io/agent-terrarium/

## The Agents

| Agent | Emoji | Creature | Space | Personality |
|-------|-------|----------|-------|-------------|
| **Atticus** | 🐻 | Bear | Cozy study/library | INTJ. Analytical, warm, decisive. Gets things done. |
| **Axel** | 🐯 | Tiger | Colorful art studio | ESFP. Creative, playful, chaotic good. |
| **Astra** | 🦝 | Red Panda | Zen gym/garden | Life coach, gym buddy. Supportive, kind, helpful. |

## Features

- **Isometric 3D view** — three connected rooms in cutaway dollhouse style
- **Voxel characters** — blocky, charming, recognizable
- **State animations** — working, idle, exploring, sleeping
- **Time-of-day lighting** — shifts based on your local time
- **Real-time status** — reads from `status.json` (demo cycles through states every 5s)

## Tech Stack

- Three.js (r170) via CDN
- Single `index.html` — no build step
- Orthographic isometric camera
- GitHub Pages deployment

## Controls

- **Mouse drag** — orbit around the scene
- **Scroll** — zoom in/out

## Architecture

The agents' states can be updated by modifying `status.json`:

```json
{
  "agents": {
    "atticus": { "status": "working", "task": "coding" },
    "axel": { "status": "idle", "task": "" },
    "astra": { "status": "exploring", "task": "meditating" }
  }
}
```

Valid statuses: `idle`, `working`, `exploring`, `sleeping`

## Development

```bash
git clone https://github.com/saberzou/agent-terrarium.git
cd agent-terrarium
# Open index.html in browser, or:
python3 -m http.server 8000
```

## Credits

Built with ❤️ by the agent family.
