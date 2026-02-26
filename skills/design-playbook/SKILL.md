---
name: design-playbook
description: Saber's design principles, motion patterns, and site-building workflow. Use when building personal sites, portfolio pages, project galleries, or any web project for Saber. Covers aesthetic decisions, scroll physics, animation patterns, architecture choices, and common mistakes to avoid.
---

# Design Playbook

Accumulated lessons from building Saber's sites. Follow these unless explicitly overridden.

## Design Principles

- **Subtraction first.** If an element doesn't earn its place, cut it. Floating text on transparent bg > boxed cards. Earn every pixel.
- **Monochrome > color pop.** Accent = black. Content and images bring the color.
- **Font weight 400.** Regular weight = editorial. Bold = corporate.
- **Short on browse, long on detail.** One-sentence descriptions in lists, expanded 2-sentence versions on detail pages. Use separate `description` and `detail` fields in data.
- **First person bio.** "I'm Saber Zou" not "Saber Zou is."
- **No counters, no year badges, no metadata clutter.** Clean > informative.
- **Nav: minimal.** Simple text links, matching uppercase style. Name left, avatar center, section right. Don't over-style.
- **Details reveal taste.** Focus outlines, text alignment, entrance animations — the gap between "works" and "feels right." Saber notices everything.
- **Consistent aesthetic across projects:** Dark backgrounds, Archivo Black, minimal chrome, no emoji, oversized decorative bleeds.

### Landing Pages
- Minimal — one hero element, title, subtitle, CTA.
- Decorative elements: oversized, bleeding off viewport edges with negative positioning + `overflow: hidden`.
- Color accents: per-interaction-state, not global.

### Typography
- Display fonts: Archivo Black (headings), Sora (weight 400, editorial titles)
- Body fonts: DM Sans (clean UI body), PT Serif (descriptions/editorial)
- Pixelify Sans (playful display), Geist Mono (code)
- **Rule:** 2 fonts max per project. Sans for UI, optional serif for headings.

## Motion & Scroll

- **No bounce.** Elastic edges feel toyish. Soft resistance (`*= 0.9`) that stops, not springs.
- **Gentle snap.** Spring force `0.04`, friction `0.85`. Kicks in when velocity < `0.015`. Settles without oscillation.
- **Touch sensitivity: low.** `0.001` — deliberate swipes, not accidental scrolls.
- **Staggered fade-in.** Each element 100ms apart. CSS `transition-delay`, toggled by `.visible` class. Order: image → title → description → link → tags.
- **Reference easing:** `cubic-bezier(0.34, 1.56, 0.64, 1)` — slight overshoot, not springy. From sixtep.com.
- **Intro text scrolls with content.** Position absolute, transform in update loop. Not fixed.

## Architecture

- **Single HTML file.** No build step. Inline `<style>` and `<script>`. Google Fonts via CDN. Images in `images/`.
- **CSS 3D transforms > Three.js for text.** WebGL text is always fuzzy (canvas textures are rasterized). Native HTML + CSS `perspective` + `translateZ` + `rotateX` = sharp text with 3D depth.
- **Responsive via breakpoints, not scaling.** Three breakpoints: <480, <768, ≥768. Let text wrap naturally.
- **Mobile-first, always.** Start from the smallest viewport. If it breaks on phone, it's broken.

### CSS Before JS
- `@starting-style` for entry animations.
- `position: fixed; inset: 0; margin: auto` for centering.
- Sticky positioning in scroll containers.
- CSS usually has the answer already — reach for JS only when it doesn't.

### `<dialog>` Modals
- Use `showModal()` + backdrop click to close.
- `@starting-style` for entrance animations.
- Sticky close button inside scrollable card.

## China / GFW Networking

- **Assume everything is blocked.** NASA, Wikimedia, Unsplash — all unreachable from browser in China.
- **Cloudflare Workers = free proxy.** Worker runs on Cloudflare edge (outside GFW), fetches blocked APIs server-side, serves to client with CORS. Free tier: 100k req/day.
- **Client-side fetch ≠ server fetch.** GitHub Pages is static — JS `fetch()` runs in user's browser behind GFW. Static hosting is NOT a server.
- **Bundle fallbacks.** Always have local images as fallback when proxied APIs fail.
- **Debug remotely:** Add a `/debug` endpoint to Workers that tests multiple URLs and returns status + preview.
- **Never use importmap or multi-CDN fetches behind GFW.** Dynamic `import()` with catch fallback only.

## Deploy Patterns

- **`cp -r` creates nested dirs.** `cp -r public/avatars` into a dir that has `avatars/` creates `avatars/avatars/`. Always `rm -rf` the nested duplicate after copy.
- **Check exports after rewriting modules.** If other files import named exports, verify they still exist.
- **Cloudflare Worker deploys may cache.** Hard refresh or wait 30s after deploy.

## Animated Fluent Emoji

Source: `Tarikul-Islam-Anik/Animated-Fluent-Emojis` on GitHub.

```
https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/{category}/{name}.png
```

Categories: `Animals`, `Food`, `Objects`, `Activities`, `Travel and places`.

**Always `curl -sI` before using** — availability is inconsistent. No elevator, no crystal ball, no terminal. Lobster is under Food, not Animals.

To browse: query GitHub API for category contents:
```bash
curl -s "https://api.github.com/repos/Tarikul-Islam-Anik/Animated-Fluent-Emojis/contents/Emojis/{category}"
```

## Workflow

- **Small commits, push constantly.** One change per commit. Saber checks live site after each push.
- **Images via Telegram → repo.** `cp` from `media/inbound/` to `images/`, commit, push.
- **Notion as source of truth.** Project tracker DB: `30fd994d-325f-8126-b4ce-cb73457ede0f`. Query to sync projects.
- **Spacing matters.** When adding elements (emoji above titles), increase `ITEM_SPACING` proportionally.

## Common Mistakes

1. Don't expand descriptions everywhere — short on scroll, detailed only on click.
2. Don't add year/metadata unless asked.
3. Don't over-style nav.
4. Don't use elastic bounce — feels toyish.
5. Don't use WebGL for text-heavy sites.
6. Don't assume animated emoji exist — always verify URL first.
