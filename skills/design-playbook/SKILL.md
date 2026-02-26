---
name: design-playbook
description: Saber's design principles, motion patterns, and site-building workflow. Use when building personal sites, portfolio pages, project galleries, or any web project for Saber. Covers aesthetic decisions, scroll physics, animation patterns, architecture choices, and common mistakes to avoid.
---

# Design Playbook

Accumulated lessons from building Saber's sites. Follow these unless explicitly overridden.

## Design Principles

- **Subtraction first.** If an element doesn't earn its place, cut it. Floating text on transparent bg > boxed cards.
- **Monochrome > color pop.** Accent = black. Content and images bring the color.
- **Font weight 400.** Regular weight = editorial. Bold = corporate.
- **Short on browse, long on detail.** One-sentence descriptions in lists, expanded 2-sentence versions on detail pages. Use separate `description` and `detail` fields in data.
- **First person bio.** "I'm Saber Zou" not "Saber Zou is."
- **No counters, no year badges, no metadata clutter.** Clean > informative.
- **Nav: minimal.** Simple text links, matching uppercase style. Name left, avatar center, section right. Don't over-style.

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
