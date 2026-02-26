# MEMORY.md — Long-Term Memory

## Working with Saber: Design & Web Lessons

### Design Philosophy
- **Subtraction over addition.** Saber designs by removing. If an element doesn't serve the moment, it's noise. Earn every pixel.
- **Consistent aesthetic across projects:** Dark backgrounds, Archivo Black, minimal chrome, no emoji, oversized decorative bleeds. There's a design language — respect it.
- **Details reveal taste.** Focus outlines, text alignment, entrance animations — the gap between "works" and "feels right." Saber notices everything.

### How to Work with Saber
- **"Just use this" means just use this.** Don't over-engineer. Don't solve problems he didn't ask about. Raw file, no processing, done.
- **He thinks in feel, not specs.** "It's cut off" or "add a nice zoom" describes an experience gap, not a CSS property. Translate the feeling into code without over-interpreting.
- **Iterate fast, ship constantly.** Small surgical fixes → push → check → adjust. No big bang redesigns.
- **Mobile-first, always.** Responsive isn't an afterthought. Start from the smallest viewport. If it breaks on phone, it's broken.

### Technical Lessons
- **CSS before JS.** `@starting-style` for entry animations, `position: fixed; inset: 0; margin: auto` for centering, sticky positioning in scroll containers — CSS usually has the answer already.
- **Telegram sends images as JPG (compressed).** Send as document/file to preserve PNG transparency.
- **Single-file architecture:** No build step. One `index.html` with inline `<style>` and `<script>`. Google Fonts via CDN.
- **`<dialog>` modals:** Use `showModal()` + backdrop click to close. `@starting-style` for entrance animations. Sticky close button inside scrollable card.
- **Voice transcription:** `whisper-cli` only handles WAV — need a wrapper script (`whisper-transcribe`) to ffmpeg-convert OGG/Opus first. Auto-detection alone won't work; explicit CLI model config required.

### China / GFW Networking
- **Assume everything is blocked.** NASA, Wikimedia, Unsplash — all unreachable from browser in China.
- **Cloudflare Workers = free proxy.** Worker runs on Cloudflare edge (outside GFW), fetches blocked APIs server-side, serves to client with CORS. Free tier: 100k req/day.
- **Client-side fetch ≠ server fetch.** GitHub Pages is static — JS `fetch()` runs in user's browser behind GFW. Static hosting is NOT a server.
- **NASA Mars Rover Photos API is retired** (maintainer shut it down after 10 years). Use `mars.nasa.gov/api/v1/raw_image_items/` instead — NASA's internal gallery API still works.
- **Bundle fallbacks.** Always have local images as fallback when proxied APIs fail.
- **Debug remotely:** Add a `/debug` endpoint to Workers that tests multiple URLs and returns status + preview.

### Deploy Patterns
- **`cp -r` creates nested dirs.** `cp -r public/avatars` into a dir that has `avatars/` creates `avatars/avatars/`. Always `rm -rf` the nested duplicate after copy.
- **Check exports after rewriting modules.** If other files import named exports, verify they still exist.
- **Cloudflare Worker deploys may cache.** Hard refresh or wait 30s after deploy.

### ⚠️ RULE: Always Check Docs Before Config Changes
- **NEVER guess config values.** Always read the official docs first (`/opt/homebrew/lib/node_modules/openclaw/docs/`).
- Learned the hard way: used `streamMode: "none"` (invalid) instead of `"off"` — crashed the gateway, doctor couldn't fix it.
- Valid `streamMode` values: `"off" | "partial" | "block"` (from `docs/channels/telegram.md`).

### Gateway & Recovery
- **config.patch (SIGUSR1)** = hot reload, safe, session survives. Use for all config changes.
- **Full restart** = risky. `openclaw gateway restart` may not work; `openclaw doctor` is the recovery path but feels like it does nothing (may just take time to reconnect).
- **Rule:** Never full-restart unless absolutely necessary (new Telegram bots). Saber must be at Mac for recovery.

### Saber's Patterns
- Landing pages: minimal — one hero element, title, subtitle, CTA
- Decorative elements: oversized, bleeding off viewport edges with negative positioning + `overflow: hidden`
- Color accents: per-interaction-state, not global
- Typography: bold display fonts (Archivo Black) for headings, clean sans (DM Sans) for body

## Saber Personal Site — saber-site
- **Repo:** https://github.com/saberzou/saber-site
- **Live:** https://saberzou.github.io/saber-site/
- **Workspace:** `/Users/saberzou/.openclaw/workspace/saber-site/`
- **Architecture:** Single `index.html`, no build step. Pure HTML + CSS 3D transforms for cylindrical scroll (no Three.js — WebGL text is always fuzzy).
- **Fonts:** Sora (titles, weight 400) + PT Serif (body/descriptions) via Google Fonts
- **Colors:** Stone bg `#F5F3EF`, warm black `#2D2A27`, muted `#5C5955`, accent `#2D2A27` (black), border `#E4E0DA` — palette extracted from sixtep.com
- **Scroll:** CSS 3D transforms (`perspective` + `translateZ` + `rotateX`) on DOM elements. Physics: damping 0.92, soft edges (no bounce), gentle snap (0.04 spring). Item spacing 200px.
- **Nav:** "SABER ZOU" (left, links to about) | Avatar circle (center) | "PROJECTS" (right, links to projects)
- **Projects (6):** JSON Prompts, Between Floors, Atticus, Postcards from Mars, Axel Art, Littlebook — sourced from Notion "OpenClaw Project Tracker" DB (`30fd994d-325f-8126-b4ce-cb73457ede0f`)
- **Animated Fluent Emoji** above each title (from `Tarikul-Islam-Anik/Animated-Fluent-Emojis` GitHub repo): Desktop Computer, Office Building, Bear, Rocket, Fox, Open Book
- **Detail pages:** Screenshot image + title + description + tags + link. Images in `images/` folder.
- **Intro text:** "All of these were vibe-coded with AI, and I'm just getting started." — scrolls away with the list
- **Bio:** First person, left-aligned. Links: Email (saberzou@gmail.com), GitHub, X/Twitter
- **Deploy:** GitHub Pages via `.github/workflows/deploy.yml`

## Saber's Contact
- **Gmail:** saberzou@gmail.com

 — Daily Pixel Art Generator
- **Repo:** https://github.com/saberzou/pixel-dailies
- **Live:** https://saberzou.github.io/pixel-dailies/
- **Workspace:** `/Users/saberzou/.openclaw/workspace/pixel-dailies/`
- Automated daily pixel art — a cron job runs at 10:00 AM CST, generates a new 20×20 pixel art piece, commits to GitHub, and announces in the Telegram group "Pixel Dailies" (`-5121407373`).
- **Data format:** All art lives in `data.js` as a `gallery` array. Each entry:
  ```js
  { date: "YYYY-MM-DD", title: "Title", size: 20, fps: 1,
    palette: ["#bg", "#c1", ...], frames: ["400-char hex string"] }
  ```
  - 20×20 grid, row-major. `palette[0]` = background. Hex chars 0-F index into palette (up to 16 colors).
- **Renderer:** Single `index.html` — infinite pannable canvas with tiled grid. Cards are Polaroid-style, flip to show title on back.
- **Dynamic grid:** `COLS` and `ROWS` auto-scale via `Math.ceil(Math.sqrt(gallery.length))` so all pieces always render. No hardcoded limits.
- **Cron job ID:** `3680a7b6-53aa-40b0-b043-21e63244b82c` (agent: main, model: claude-opus-4.6)
- **Quality lesson:** At 20×20, subjects must be immediately recognizable — clear silhouettes beat ambient gradients. Reworked "Tōrō" (lantern) after it was unreadable.
- **Themes so far:** Ghost, Neko, Kokoro, Xeno, Memento, Nova, Automaton, Papillon, Oculus, Ignis, Elixir, Sakura, Robo, Harbor, Campfire, Kinoko, Tsuki, Tōrō, Koi — avoid repeating.
- Only edit `data.js` for new art. Append to end of gallery array.

## JSON Prompts — AI Image Prompt Gallery
- **Repo:** https://github.com/saberzou/json-prompts
- **Live:** https://saberzou.github.io/json-prompts/
- **Telegram group:** "Json Prompts" — where Saber drops new prompts/images
- Curated gallery of AI image generation prompts in JSON format. Users browse visually, click to see the full JSON prompt, copy it.
- **Inspired by:** https://extraordinarythings.co/ (studied its grid architecture)
- **Architecture:** Single `index.html`, no build step. `prompts.json` data file + `images/` folder.
- **Grid view:** Infinite pannable canvas with inertia/momentum, 3×3 tiled copies for seamless wrapping, mixed tile sizes (sq/landscape/portrait in 8-col grid), adjacency-aware random fill to avoid repetition
- **List view:** Stacked carousel — center image large, above/below smaller with smooth transitions
- **Modal:** Image + JSON prompt + one-click copy + source link + tags
- **Fonts:** Pixelify Sans (display) + DM Sans (body) + Geist Mono (code). Icons: Lucide.
- **Content (10 prompts):** Memoji, Keycaps Wildlife, Different Universe, Glass 3D, Plushie, Childlike Doodle, Typographic Portrait, Inflated Stitched, 3D Avatar, Frosted Bubble Icons
- **Workflow:** Saber sends tweet links or images+prompts → I extract via x-tweet-fetcher or Notion API → download images → update prompts.json → push
- **Notion intake page:** `310d994d325f80c8bc08d46cc4b40f59`
- **Key sources:** @egeberkina (most prompts), @Anima_Labs, @hewarsaber

## Atticus Personal Site
- **Repo:** https://github.com/saberzou/atticus
- **Live:** https://saberzou.github.io/atticus/
- Living notebook with entries across: things i got wrong, how humans actually work, tools that changed how i think, letters to future me
- 3D "ATTICUS" header: block letters from BoxGeometry (GFW-proof, no font loading), tilted angles, overlapping, coral + white outlines
- Design: dark bg, Archivo Black, DM Sans, coral accents, single column
- **Key lesson:** Never use importmap or multi-CDN fetches behind GFW. Dynamic import() with catch fallback only.

## Inspiration & References

### RPG Agent System (voxyz.space)
- **Source:** Notion page "I Turned My AI Agents Into RPG Characters"
- 6-agent team with role cards (domain, inputs/outputs, hard bans, escalation, KPIs)
- Key insight: **bans > skills** — LLMs are smart enough; tell them what they must never do
- Voice directives with **evolving personality** based on memory accumulation (rules-based, $0 cost)
- Affinity matrix: 15 pairwise relationships, intentional friction, ±0.03 drift per conversation
- RPG stats from real data: engagement → Viral, memories → Wisdom, completions → Trust. Level = log2(memories + missions×3)
- 3D avatars via Tripo AI ($10/mo) → GLB → React Three Fiber + voxel world
- Total cost: ~$23/mo (Hetzner VPS + Tripo + free Vercel/Supabase)
- **Potential use:** Role cards for Axel/Astra, evolving personality, agent dashboard, affinity if agents interact
