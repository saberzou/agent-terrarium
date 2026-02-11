# Modern CSS Reference

Curated techniques from CSS-Tricks, MDN, and hands-on projects. Focus on features that shipped 2024-2026.

## Layout

### `sibling-index()` — Auto-assign grid positions
Chrome 131+, Safari 18.4+. Returns 1-based position among siblings.
```css
.chart-bar {
  grid-column: sibling-index();
  grid-row: span attr(data-value number);
}
```
Eliminates manual `nth-child` or CSS variable assignment for grids.

### `sibling-count()` — Total sibling count
```css
.item { flex-basis: calc(100% / sibling-count()); }
```

### Container Queries
Style based on parent size, not viewport.
```css
.card-container { container-type: inline-size; }
@container (min-width: 400px) {
  .card { flex-direction: row; }
}
```

### Anchor Positioning
Position elements relative to other elements without JS.
```css
.tooltip {
  position: absolute;
  position-anchor: --trigger;
  top: anchor(bottom);
  left: anchor(center);
}
```

### Subgrid
Child grids align to parent grid tracks.
```css
.parent { display: grid; grid-template-columns: 1fr 2fr 1fr; }
.child  { display: grid; grid-template-columns: subgrid; grid-column: span 3; }
```

## Typography

### `text-wrap: balance` / `text-wrap: pretty`
```css
h1 { text-wrap: balance; }  /* Balances line lengths for headings */
p  { text-wrap: pretty; }   /* Avoids orphans in paragraphs */
```

### `@font-face` with `size-adjust`
Match fallback font metrics to web font to reduce layout shift.
```css
@font-face {
  font-family: 'Fallback';
  src: local('Georgia');
  size-adjust: 105%;
  ascent-override: 95%;
}
```

## Color

### Relative Color Syntax
Transform colors without manual calculation.
```css
/* Lighten */
background: hsl(from var(--accent) h s calc(l + 20));

/* Invert for accessible highlights */
background: rgb(from var(--bg) calc(255 - r) calc(255 - g) calc(255 - b));

/* Add alpha */
border-color: rgb(from white r g b / 10%);
```

### `color-mix()`
```css
background: color-mix(in oklch, var(--accent), white 30%);
```

### `light-dark()`
```css
:root { color-scheme: light dark; }
body { background: light-dark(#FDF8F3, #1a1a1a); }
```

## Selectors & Pseudo-elements

### `::search-text` (Chrome 144+)
Style Ctrl+F find-in-page highlights.
```css
::search-text { background: var(--accent); color: var(--bg); }
::search-text:current { background: var(--accent-dark); }
```

### `:has()` — Parent selector
```css
.card:has(.badge)   { border: 2px solid var(--accent); }
form:has(:invalid)  { opacity: 0.7; }
nav:has(> .active)  { background: var(--bg-alt); }
```

### `@starting-style` — Entry animations
```css
dialog[open] {
  opacity: 1;
  @starting-style { opacity: 0; }
}
```

## Animations & Transitions

### View Transitions API
Page-level morphing transitions.
```css
::view-transition-old(root) { animation: fade-out 0.3s; }
::view-transition-new(root) { animation: fade-in 0.3s; }
```
Trigger with `document.startViewTransition(() => updateDOM())`.

### Scroll-Driven Animations
Animate based on scroll position, no JS needed.
```css
@keyframes reveal { from { opacity: 0; } to { opacity: 1; } }
.card {
  animation: reveal linear;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}
```

### `@media (prefers-reduced-motion: reduce)`
Always respect user preference.
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Upgraded `attr()`
Now accepts type parameters — read data attributes as numbers, colors, etc.
```css
.bar { height: calc(attr(data-value number) * 1%); }
.tag { background: attr(data-color color, gray); }
```

## Nesting (native)
No preprocessor needed.
```css
.card {
  background: white;
  & h3 { color: var(--accent); }
  &:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
  @media (max-width: 768px) { padding: 16px; }
}
```

## Logical Properties
Write direction-agnostic CSS for i18n.
```css
.card {
  margin-inline: auto;      /* left/right */
  padding-block: 24px;      /* top/bottom */
  border-inline-start: 3px solid var(--accent);
}
```
