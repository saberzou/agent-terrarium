# Agent Terrarium — Pixel Office Dashboard

## What
A pixel-art office dashboard showing three AI agents in a shared office. Agents move to different areas based on their status. Pure HTML/CSS/JS, no backend, no build step. GitHub Pages deployment.

**Inspired by:** [Star Office UI](https://github.com/ringhyacinth/Star-Office-UI) — a Phaser-based pixel office. We're rebuilding the concept from scratch with no Phaser, no Python backend, just vanilla web tech.

## Tech
- Single `index.html` with inline CSS + JS
- HTML5 Canvas for the office scene + character rendering
- No Phaser, no Three.js, no frameworks, no build tools
- Reads `status.json` for agent states (fetch every 30s)
- GitHub Pages compatible (static files only)

## The Office Scene
Top-down/isometric pixel art office with distinct areas:

### Areas
1. **Desk Area** (left side) — Where agents work. 2-3 desks with monitors.
2. **Break Room** (center) — Couch/sofa area, coffee machine. Where idle agents hang out.
3. **Server Room** (right side) — Racks with blinking lights. Where error/debug happens.
4. **Meeting Spot** (top center) — Small table. Where "exploring" agents go.

### Visual Style
- Pixel art aesthetic — chunky pixels, limited palette
- Dark background (#1a1a2e), warm office interior
- Pixel-perfect rendering (image-rendering: pixelated on canvas)
- Resolution: 640x360 logical, scaled up 2x for display (1280x720)
- Color palette: warm wood tones, with colored accents per agent

## Characters (Pixel Sprites)
Each character is a small pixel sprite (16x16 or 20x20), drawn directly on canvas. Simple but recognizable.

### Atticus 🐻 (Bear)
- Brown body, round ears, lighter belly
- Colors: #8B6914 body, #D2B48C belly, #000 eyes
- Walks with a steady, thoughtful gait

### Axel 🐯 (Tiger)
- Orange body with black stripes, white belly
- Colors: #FF8C00 body, #000 stripes, #FFF belly
- Bouncy walk, slightly faster than others

### Astra 🦝 (Red Panda)
- Reddish-brown body, white face markings, striped tail
- Colors: #B7410E body, #FFF face, #8B4513 tail stripes
- Calm walk, smooth movement

## Agent States & Behavior
Each agent reads from `status.json` and moves to the corresponding area:

| Status | Area | Animation |
|--------|------|-----------|
| working | Desk Area | Sitting at desk, subtle typing motion |
| idle | Break Room | On the couch, gentle breathing/bobbing |
| exploring | Meeting Spot | Walking around, looking at things |
| error | Server Room | Standing near servers, looking concerned |
| sleeping | Break Room | On couch, "zzz" floating above |

### Movement
- Agents walk between areas with simple 2-frame walk animation
- Slight bobbing motion while walking
- When idle in an area, gentle breathing/bobbing animation
- Each agent has a slightly different position in each area (don't stack on top of each other)

## Speech Bubbles
Random speech bubbles appear above agents every 8-15 seconds:

### Atticus (thoughtful, analytical)
- "Optimizing the pipeline..."
- "This needs more tests."
- "Coffee break? No, one more commit."
- "Interesting pattern here..."

### Axel (playful, creative)
- "Let's try something wild!"
- "Colors need more contrast..."
- "Ship it! 🚀"
- "What if we flip the whole thing?"

### Astra (supportive, calm)
- "Remember to stretch!"
- "Good progress today."
- "Deep breath, then debug."
- "Stay hydrated! 💧"

Bubbles: white rounded rect with black text, small pointer triangle, fades in/out over ~3 seconds.

## Status Data
Reads `status.json`:

```json
{
  "agents": {
    "atticus": { "status": "idle", "lastActivity": "2026-02-28T10:00:00Z", "task": "" },
    "axel": { "status": "working", "lastActivity": "2026-02-28T10:05:00Z", "task": "painting" },
    "astra": { "status": "exploring", "lastActivity": "2026-02-28T09:30:00Z", "task": "meditating" }
  },
  "updatedAt": "2026-02-28T10:05:00Z"
}
```

If fetch fails, use embedded defaults and cycle through states every 15 seconds for demo.

## Time of Day Lighting
Shift the overall color overlay based on real clock (user's local time):
- Morning (6-12): Warm golden tint
- Afternoon (12-18): Bright, neutral
- Evening (18-22): Orange/amber tint, desk lamps glow
- Night (22-6): Dark blue tint, only desk lamps and server LEDs provide light

## Bottom Panel
Below the canvas, show:
- **Agent Status Cards** — Three cards in a row, one per agent:
  - Agent emoji + name
  - Current status (working/idle/exploring/error)
  - Current task (if any)
  - Last activity time (relative: "5m ago")
- **Yesterday's Notes** — A small "memo" section that shows a snippet (hardcode sample text for now; later will read from memory files)

### Panel Style
- Dark background matching the canvas surround
- Cards with subtle borders, matching each agent's color accent
- Pixel font (use Google Fonts: "Press Start 2P" or "Pixelify Sans")

## Office Decorations (drawn on canvas)
- Potted plants (2-3 around the office)
- Coffee machine in break room (small animation: steam rising)
- Posters on walls (simple colored rectangles)
- Clock on wall showing real time
- Server rack lights that blink
- A cat sleeping somewhere (small pixel cat, occasionally opens eyes)

## Title Plaque
Bottom center of canvas: "ATTICUS × AXEL × ASTRA" in pixel font, subtle gold color on dark wood rectangle.

## UI
- Title "Agent Terrarium 🏢" top-left of page, small
- Canvas centered on page
- Status panel below canvas, same width
- Mobile responsive: canvas scales down, panel stacks vertically on small screens

## Interaction
- Hovering over an agent in the canvas shows their name + status as tooltip
- Clicking an agent card scrolls the canvas to center on that agent (nice to have)

## Files
- `index.html` — everything (HTML + CSS + JS inline)
- `status.json` — agent status data
- Update `README.md` with new project description

## DO NOT
- Use Phaser, Three.js, or any game engine
- Use npm, webpack, vite, or any build tools
- Use React, Vue, or any framework
- Create multiple files (keep single `index.html`)
- Use external sprite sheets or images — draw everything with canvas primitives
- Make it dependent on a backend server
- Over-engineer — charm > complexity
