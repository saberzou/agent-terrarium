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

### Gateway & Recovery
- **config.patch (SIGUSR1)** = hot reload, safe, session survives. Use for all config changes.
- **Full restart** = risky. `openclaw gateway restart` may not work; `openclaw doctor` is the recovery path but feels like it does nothing (may just take time to reconnect).
- **Rule:** Never full-restart unless absolutely necessary (new Telegram bots). Saber must be at Mac for recovery.

### Saber's Patterns
- Landing pages: minimal — one hero element, title, subtitle, CTA
- Decorative elements: oversized, bleeding off viewport edges with negative positioning + `overflow: hidden`
- Color accents: per-interaction-state, not global
- Typography: bold display fonts (Archivo Black) for headings, clean sans (DM Sans) for body

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
