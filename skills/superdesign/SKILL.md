---
name: frontend-design
description: Expert frontend design guidelines for creating beautiful, modern UIs. Use when building landing pages, dashboards, or any user interface.
metadata: {"clawdbot":{"emoji":"🎨"}}
---

# Frontend Design Skill

Use this skill when creating UI components, landing pages, dashboards, or any frontend design work.

## Phase 0: Design Thinking (Do This First)

Before writing a single line of code, answer these:

1. **Purpose** — What problem does this solve? Who uses it?
2. **Tone** — Pick a direction and commit. Not "clean and modern" (that's nothing). Choose:
   - Brutally minimal · maximalist chaos · retro-futuristic · organic/natural
   - Luxury/refined · playful/toy-like · editorial/magazine · brutalist/raw
   - Art deco/geometric · soft/pastel · industrial/utilitarian · cyberpunk
   - Or invent your own. The point is: have a point of view.
3. **Differentiation** — What's the one thing someone remembers after closing the tab?
4. **Constraints** — Framework? Performance budget? Accessibility needs?

Then sketch the layout in ASCII before coding:

```
┌─────────────────────────────────────┐
│         HEADER / NAV BAR            │
├─────────────────────────────────────┤
│                                     │
│            HERO SECTION             │
│         (Title + CTA)               │
│                                     │
├─────────────────────────────────────┤
│   FEATURE   │  FEATURE  │  FEATURE  │
│     CARD    │   CARD    │   CARD    │
├─────────────────────────────────────┤
│            FOOTER                   │
└─────────────────────────────────────┘
```

---

## The Anti-Slop Manifesto

AI-generated frontends all look the same. That's the enemy. Avoid these like the plague:

### ❌ Never Do This
- **Inter/Roboto/Arial/system fonts as primary** — these are defaults, not choices
- **Purple-to-blue gradient on white** — the universal AI slop signature
- **#007bff bootstrap blue** — it's 2016 and it looks it
- **Evenly-distributed pastel palettes** — commit to a dominant color with sharp accents
- **Predictable card grids with uniform shadows** — break the grid, vary the rhythm
- **"Clean and modern"** — that phrase means nothing. Every AI says it.
- **Same fonts across projects** — if you used Space Grotesk last time, pick something else
- **Generic hero + 3-column features + testimonials + CTA footer** — the SaaS template graveyard

### ✅ Do This Instead
- **Pick distinctive fonts** that match the tone. Pair a characterful display font with a refined body font.
- **Dominant color + sharp accent** outperforms timid, evenly-balanced palettes
- **Unexpected layouts** — asymmetry, overlap, diagonal flow, grid-breaking elements
- **Generous negative space OR controlled density** — commit to one
- **Atmosphere** — gradient meshes, noise textures, geometric patterns, grain overlays, dramatic shadows. Not flat white.
- **One orchestrated moment** — a well-timed page load with staggered reveals creates more delight than scattered micro-interactions

---

## Phase 1: Typography

Typography is 90% of design. Get this right first.

**Font Selection (Google Fonts):**
```
Display/Headline:
  Clash Display · Satoshi · Cabinet Grotesk · Instrument Serif
  Bricolage Grotesque · Playfair Display · Syne · Unbounded
  Archivo Black · Pixelify Sans · Oxanium

Body:
  DM Sans · Plus Jakarta Sans · Outfit · Source Serif Pro
  Libre Baskerville · Lora · PT Serif · Sora

Monospace:
  JetBrains Mono · Fira Code · IBM Plex Mono · Space Mono · Geist Mono
```

**Rules:**
- Display font ≠ body font. Contrast creates hierarchy.
- Weight 400 for editorial feel. Bold (700+) for impact. Pick one direction.
- Line height: 1.4–1.6 for body, 1.0–1.2 for display/headlines.
- Letter-spacing: slight negative for large display text, slight positive for small caps/labels.

---

## Phase 2: Color & Theme

**Modern approach — use oklch():**
```css
:root {
  --bg: oklch(0.15 0.01 260);
  --fg: oklch(0.95 0 0);
  --primary: oklch(0.65 0.25 30);
  --muted: oklch(0.4 0.02 260);
  --accent: oklch(0.75 0.18 150);
}
```

**Theme patterns worth stealing:**

Dark Editorial (Vercel/Linear):
```css
:root {
  --bg: oklch(0.13 0.005 260);
  --fg: oklch(0.93 0 0);
  --primary: oklch(0.99 0 0);
  --muted: oklch(0.55 0 0);
  --border: oklch(0.25 0.005 260);
}
```

Neo-Brutalism:
```css
:root {
  --bg: oklch(0.98 0 0);
  --fg: oklch(0 0 0);
  --primary: oklch(0.65 0.24 27);
  --accent: oklch(0.97 0.21 110);
  --shadow: 4px 4px 0px 0px oklch(0 0 0);
  --radius: 0px;
}
```

Glassmorphism:
```css
.glass {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 1rem;
}
```

Warm Organic:
```css
:root {
  --bg: oklch(0.96 0.02 80);
  --fg: oklch(0.25 0.03 50);
  --primary: oklch(0.55 0.15 30);
  --accent: oklch(0.70 0.12 150);
  --border: oklch(0.85 0.03 70);
}
```

**Key rules:**
- Design both light and dark from the start if appropriate.
- Use CSS custom properties for everything. No hardcoded colors in components.
- Shadows should use color, not gray: `box-shadow: 0 4px 20px oklch(0.3 0.05 260 / 0.3)`.

---

## Phase 3: Animation & Motion

**Planning micro-syntax (think before animating):**
```
button-press:  150ms [scale 1→0.96→1]
hover-lift:    200ms [translateY 0→-3, shadow↗]
fade-enter:    400ms ease-out [translateY +20→0, opacity 0→1]
slide-in:      350ms ease-out [translateX -100%→0, opacity 0→1]
stagger-cards: 80ms delay between items
page-load:     600ms orchestrated [hero→nav→content→footer]
```

**Timing guidelines:**
- Micro-interactions (hover, press): 100–200ms
- Entry animations: 300–500ms, ease-out
- Page transitions: 300–500ms
- Stagger delay between items: 50–100ms

**High-impact patterns:**
- **Staggered page load** — items animate in sequence with `animation-delay`. One orchestrated entrance > scattered effects.
- **Scroll-triggered reveals** — use `IntersectionObserver` or CSS `scroll-driven animations`.
- **Hover states that surprise** — not just color change. Scale, rotate, reveal hidden content.
- **Spring physics** — `cubic-bezier(0.34, 1.56, 0.64, 1)` for playful overshoot.

**CSS-first animation:**
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-in {
  animation: fadeUp 0.5s ease-out both;
}
.stagger > :nth-child(1) { animation-delay: 0ms; }
.stagger > :nth-child(2) { animation-delay: 80ms; }
.stagger > :nth-child(3) { animation-delay: 160ms; }
```

---

## Phase 4: Layout & Composition

**Break the expected:**
- Asymmetric grids — not everything needs equal columns
- Overlapping elements — z-index layering, negative margins
- Full-bleed sections alternating with contained sections
- Viewport-height hero sections with scroll cues
- Mixed content rhythms — wide image → narrow text → full-bleed quote

**Responsive (mobile-first):**
```css
.container { padding: 1rem; }

@media (min-width: 768px) {
  .container { padding: 2rem; }
}

@media (min-width: 1024px) {
  .container { max-width: 1200px; margin: 0 auto; }
}
```

**Spatial tricks:**
- Generous padding (3rem–6rem between sections) creates luxury feel
- Tight, controlled density creates editorial/news feel
- Pick one. Don't mix both unless intentional.

---

## Phase 5: Implementation

**Tooling (CDN imports for prototypes):**

```html
<!-- Tailwind -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Icons: Lucide -->
<script src="https://cdn.jsdelivr.net/npm/lucide@latest/dist/umd/lucide.min.js"></script>
<script>lucide.createIcons();</script>

<!-- Flowbite (component library) -->
<link href="https://cdn.jsdelivr.net/npm/flowbite@2.0.0/dist/flowbite.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/flowbite@2.0.0/dist/flowbite.min.js"></script>
```

**Images:**
- Use real placeholder services: Unsplash, placehold.co
- Never invent image URLs
- Example: `https://images.unsplash.com/photo-xxx?w=800&h=600`

**Backgrounds & Atmosphere:**
```css
/* Noise texture overlay */
.grain::after {
  content: '';
  position: fixed; inset: 0;
  background: url("data:image/svg+xml,...") repeat; /* or CSS noise */
  opacity: 0.03;
  pointer-events: none;
  z-index: 9999;
}

/* Gradient mesh */
.mesh-bg {
  background:
    radial-gradient(ellipse at 20% 50%, oklch(0.5 0.2 280 / 0.3), transparent 50%),
    radial-gradient(ellipse at 80% 20%, oklch(0.6 0.15 30 / 0.2), transparent 50%),
    oklch(0.12 0.01 260);
}
```

---

## Accessibility (Non-Negotiable)

- Semantic HTML: `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`
- Heading hierarchy: h1 → h2 → h3 (no skipping)
- `aria-label` on icon-only buttons and interactive elements
- Color contrast: 4.5:1 minimum (WCAG AA)
- Keyboard navigation: visible focus states, logical tab order
- `prefers-reduced-motion`: disable animations for users who request it
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```

---

## Component Patterns

**Cards:**
- Subtle shadows that deepen on hover, not heavy drop shadows
- Consistent padding (1rem–1.5rem)
- Hover: slight lift + shadow increase + optional content reveal

**Buttons:**
- Clear hierarchy: primary (filled), secondary (outlined), ghost (text-only)
- Min touch target: 44×44px
- Press state: slight scale-down (0.96–0.98)
- Loading state with spinner or shimmer

**Forms:**
- Labels above inputs, always visible
- Visible focus rings (not just outline: none)
- Inline validation with color + icon
- Generous spacing between fields (1.5rem+)

**Navigation:**
- Sticky headers: add `backdrop-filter: blur()` for glass effect
- Clear active state (underline, color, weight — pick one)
- Mobile: full-screen overlay or slide-in drawer > hamburger dropdown

---

## The Final Check

Before shipping, ask:
1. Would I remember this design tomorrow? If not, it needs more character.
2. Does it look like every other AI-generated page? If yes, start over.
3. Is the typography doing work, or just filling space?
4. Is there one moment of delight (animation, interaction, visual surprise)?
5. Does it work on mobile without looking like an afterthought?
