# Accessibility & Performance

## Accessibility Essentials

### Semantic Structure
```html
<header>    <!-- site header, not just a div -->
<nav>       <!-- navigation links -->
<main>      <!-- primary content -->
<section>   <!-- thematic grouping with heading -->
<article>   <!-- self-contained content -->
<footer>    <!-- site footer -->
```

### Interactive Elements
- Buttons that do things: `<button>`, not `<div onclick>`
- Links that go places: `<a href>`
- Cards with swipe: add `role="list"` on wrapper, `role="listitem"` on cards
- Always provide `aria-label` on icon-only buttons:
  ```html
  <button aria-label="Next card">→</button>
  ```

### Focus Management
```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
/* Hide focus ring for mouse clicks */
:focus:not(:focus-visible) { outline: none; }
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

### Color Contrast
- Body text: minimum 4.5:1 ratio against background
- Large text (≥18px bold or ≥24px): minimum 3:1
- Use relative color syntax for auto-adapting highlights

### Skip Links
```html
<a href="#main" class="skip-link">Skip to content</a>
```
```css
.skip-link {
  position: absolute; top: -100%;
  &:focus { top: 0; z-index: 999; }
}
```

## Performance

### Font Loading
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```
Use `font-display: swap` (Google Fonts does this by default).

### Critical CSS
For single-file sites, CSS is already inline — no render-blocking external sheets. This is a natural advantage of the no-build approach.

### Image Optimization
```html
<img src="photo.webp" alt="Description" width="480" height="320" loading="lazy" decoding="async">
```
- Always set `width`/`height` to prevent layout shift
- Use `loading="lazy"` for below-fold images
- Prefer WebP/AVIF formats

### Script Placement
Put `<script>` at end of `<body>`, or use `defer`/`type="module"`.
For inline scripts (our pattern), placement at end of body is sufficient.

### Minimal DOM
Each DOM node costs memory and layout time. Fewer nodes = faster paint.
- Avoid wrapper divs that exist only for styling — use the semantic element itself
- Flatten nesting where possible

### `will-change` Sparingly
```css
.animated-card { will-change: transform; }
```
Only on elements that actually animate. Remove after animation completes if one-shot.

### `content-visibility: auto`
For long pages, skip rendering of off-screen sections:
```css
section { content-visibility: auto; contain-intrinsic-size: auto 500px; }
```
