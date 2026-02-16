# Postcards from Mars — Design Brief

## Concept
AI robots on Mars send postcards back to Earth. Each card is a moment — a landscape, a discovery, a feeling. The experience is a 3D interactive card viewer with premium material quality.

## Story
Humanity sent AI robots to Mars ahead of human colonization. They explore, document, and send postcards home. Each robot has a distinct personality and voice. The postcards accumulate over time — a growing archive from another world.

## Visual North Stars
- **BlueYard.com** — Hero 3D object with warm gradient background, particle system, scroll-driven reveals, confident typography
- **Shift5.io** — Monospaced data panels, geometric/line patterns as content, bold color blocking (red/charcoal/gray), typography as architecture

## Card Design

### Material
- Three.js `MeshPhysicalMaterial` with metallic gradients
- `clearcoat: 1.0`, `metalness: 0.3–0.6`, `iridescence` for holographic edge
- Environment map from Mars sky HDR for realistic reflections
- Tilt response: mouse/gyro drives subtle rotation, light shifts across surface
- The metallic feel is the constant across all card types

### Card Types
| Type | Front | Back |
|------|-------|------|
| **Landscape** | NASA Mars photo + dust overlay | Robot message + data panel |
| **Data/Schematic** | Geometric patterns, topo lines, radar sweeps, contour maps | Robot's technical log |
| **Mixed** | Photo blending into geometric elements | Message + coordinates |

### Back Panel (all cards)
Shift5-inspired data texture:
- Robot ID + designation (monospaced)
- Mission coordinates (lat/long on Mars)
- Transmission timestamp + signal strength
- Line separators, grid patterns
- Handwritten-style message from the robot

## Color Palette
- **Mars rust:** #C1440E
- **Dust orange:** #E8763A
- **Warm sand:** #D4A574
- **Deep charcoal:** #1A1A1A
- **Signal gray:** #8B8B8B
- Mars sky gradient: dusty peach → deep rust → dark

## Typography
- Display: bold, confident (Archivo Black or similar)
- Data/UI: monospaced (Space Mono, JetBrains Mono)
- Robot messages: handwritten or warm serif
- Generous whitespace — let cards breathe

## Interaction
- **Tilt:** Mouse/gyro → subtle 3D card rotation with metallic light shift
- **Flip:** Tap/click to flip card (front → back)
- **Scroll:** Navigate through card archive, cards arrive/transition
- **Share:** Per-card URL, one-tap download as image

## Architecture
- Single `index.html`, inline CSS/JS, no build step
- Three.js for 3D card rendering + material
- CSS overlay for crisp typography
- `data.js` for postcard content (grows over time via cron)
- GitHub Pages hosting

## Content Pipeline
- **Phase 1:** 10 hand-crafted postcards (curated NASA images + written messages)
- **Phase 2:** Daily postcards via cron job (AI-generated, character-consistent)
- **Phase 3:** Story arcs, seasonal events, collectible series

## Robot Characters
*(Axel developing — profiles TBD)*
- 3–5 distinct robots with unique voices
- Each has a specialization, personality, and backstory
- Messages reflect their character + real Mars science
- Relationships between robots evolve over time

## What We're NOT Building
- Social platform / user accounts
- Photo upload / user-generated content
- Generic WebGL particle demo
- Corporate portfolio grid

## Team
- **Saber:** Visual direction, character design, craft quality
- **Axel:** Robot characters, writing, personality, story arcs
- **Atticus:** Architecture, engineering, implementation

---

*No slop. Every element earns its place.*
