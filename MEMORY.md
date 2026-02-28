# MEMORY.md — Long-Term Memory

## Working with Saber

### Communication Style
- **"Just use this" means just use this.** Don't over-engineer. Don't solve problems he didn't ask about.
- **He thinks in feel, not specs.** "It's cut off" or "add a nice zoom" = experience gap, not CSS property. Translate feeling into code.
- **Iterate fast, ship constantly.** Small surgical fixes → push → check → adjust. No big bang redesigns.

### Design & Web lessons → see `skills/design-playbook/SKILL.md`

### Platform Notes
- **Telegram sends images as JPG (compressed).** Send as document/file to preserve PNG transparency.
- **Voice transcription:** `whisper-cli` only handles WAV — wrapper script (`whisper-transcribe`) to ffmpeg-convert OGG/Opus first.
- **NASA Mars Rover Photos API is retired.** Use `mars.nasa.gov/api/v1/raw_image_items/` instead.

### ⚠️ RULE: Always Check Docs Before Config Changes
- **NEVER guess config values.** Read official docs first (`/opt/homebrew/lib/node_modules/openclaw/docs/`).
- Learned the hard way: `streamMode: "none"` (invalid) instead of `"off"` — crashed gateway.
- Valid `streamMode` values: `"off" | "partial" | "block"`.

### ⚠️ RULE: Validate JS/HTML/JSON Before Every Commit
- **Run `scripts/validate-js.sh <files>` before EVERY `git commit`** that touches code.
- Cron jobs broke pixel-dailies (stray `}` in data.js) and json-prompts (extra brace in index.html) — Feb 2026.
- Root cause: LLM miscounts braces in surgical edits on long files.
- Prevention: syntax validation script + rule in AGENTS.md.

### Gateway & Recovery
- **config.patch (SIGUSR1)** = hot reload, safe, session survives. Use for all config changes.
- **Full restart** = risky. `openclaw doctor` is recovery path.
- **Rule:** Never full-restart unless absolutely necessary. Saber must be at Mac for recovery.

## Saber Personal Site — saber-site
- **Repo:** https://github.com/saberzou/saber-site
- **Live:** https://saberzou.github.io/saber-site/
- **Workspace:** `/Users/saberzou/.openclaw/workspace/saber-site/`
- **Architecture:** Single `index.html`, CSS 3D cylindrical scroll. Fonts: Sora + PT Serif. Colors: stone palette from sixtep.com.
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
