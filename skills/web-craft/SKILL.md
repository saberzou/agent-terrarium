---
name: web-craft
description: Modern web development reference for building static sites, single-page apps, and GitHub Pages projects. Use when creating or editing HTML/CSS/JS files, building UI components, styling layouts, adding animations, implementing responsive design, or working with modern CSS/JS features. Covers modern CSS (container queries, view transitions, relative color syntax, scroll-driven animations, anchor positioning, sibling-index, attr()), vanilla JS patterns, accessibility, performance, and i18n. Focused on no-build, single-file sites with inline CSS/JS.
---

# Web Craft

Modern web development notes — opinionated, practical, kept lean.

## When to Load References

- **Building or editing a static site** → read `references/modern-css.md`
- **Adding interactivity (card stacks, drag, animations)** → read `references/vanilla-js-patterns.md`
- **Accessibility or performance concerns** → read `references/a11y-perf.md`
- **Applying Saber's design system** → read `references/design-system.md`

Only load what you need. Don't read all references for a simple CSS tweak.

## Core Principles

1. **No build step.** Single HTML file, inline `<style>` and `<script>`. Google Fonts via CDN. No bundlers, no npm, no frameworks.
2. **Progressive enhancement.** Works without JS. CSS does the heavy lifting.
3. **Subtraction > Addition.** Remove before adding. Every element must earn its place.
4. **Semantic HTML first.** Use proper elements (`<nav>`, `<section>`, `<footer>`). Accessible by default.
5. **Modern CSS over JS.** If CSS can do it, don't write JS for it. `scroll-behavior: smooth` over JS scroll libraries.
6. **Mobile-first responsive.** Base styles for mobile, `@media` for wider screens.

## Quick Patterns

### CSS-only i18n (no JS framework needed)
```css
[data-i18n-zh] { display: none; }
html[lang="zh"] [data-i18n-en] { display: none; }
html[lang="zh"] [data-i18n-zh] { display: revert; }
```
Toggle with `html.setAttribute('lang', 'zh')`. Pair with `localStorage` for persistence.

### CSS custom properties for theming
```css
:root {
  --bg: #FDF8F3;
  --text: #3D3229;
  --accent: #E8A87C;
}
```
Override in `@media (prefers-color-scheme: dark)` or via JS class toggle.

### Card stack layout
Absolute-positioned cards in a relative wrapper. Use `transform: translateY() scale() rotate()` for depth. JS handles drag/swipe and reordering. See `references/vanilla-js-patterns.md`.

### Smooth scroll
```css
html { scroll-behavior: smooth; }
```
That's it. No JS library needed.

## File Structure for GitHub Pages
```
repo/
├── index.html          (single file, inline CSS/JS)
├── CNAME               (optional custom domain)
└── .nojekyll           (skip Jekyll processing)
```

## Deployment
Push to `main`. GitHub Pages builds automatically. Verify with:
```bash
gh api repos/{owner}/{repo}/pages/builds --jq '.[0].status'
```
