# Vanilla JS Patterns

No frameworks. No build step. Patterns proven on real projects.

## Card Stack Component

Stacked cards with swipe/drag, arrow buttons, and dot navigation.

### HTML Structure
```html
<div class="card-stack-wrapper" data-stack="name">
  <div class="stack-card" data-index="0">...</div>
  <div class="stack-card" data-index="1">...</div>
</div>
<div class="stack-controls" data-controls="name">
  <button class="prev-btn">←</button>
  <div class="stack-dots">
    <span class="stack-dot" data-index="0"></span>
    <span class="stack-dot" data-index="1"></span>
  </div>
  <button class="next-btn">→</button>
</div>
```

### Key Implementation Details
- Cards are `position: absolute` in a relative wrapper
- Maintain an `order[]` array — index 0 = top card
- **Newest first:** Initialize with `.reverse()` so highest data-index is on top
- Dot mapping for reversed order: `dotIndex = (n - 1) - cardIndex`
- Use `will-change: transform` on cards
- Swipe: `pointerdown/move/up` with capture. Threshold ~60px.
- Animate out: `translateX(±110%) rotate(±15deg)` then reorder array
- Depth effect per card: `translateY(depth * 14px) scale(1 - depth * 0.04) rotate(angle)`
- `touch-action: pan-y` on cards to allow vertical scroll

### Dynamic Height
Measure all cards (set `position: relative` temporarily), find max height, apply as `min-height` to all, then restore absolute positioning.

### Re-measure on Content Change
Call `measureHeight()` + `layout(false)` after any content change (e.g. language switch).

## Pointer Event Drag Pattern
```js
el.addEventListener('pointerdown', e => {
  state = { startX: e.clientX, id: e.pointerId };
  el.setPointerCapture(e.pointerId);
});
el.addEventListener('pointermove', e => {
  if (!state || state.id !== e.pointerId) return;
  const dx = e.clientX - state.startX;
  // Apply transform
});
el.addEventListener('pointerup', e => {
  if (!state) return;
  el.releasePointerCapture(state.id);
  // Snap back or complete gesture
  state = null;
});
```
Always use `setPointerCapture` — works for mouse and touch.

## CSS-only Language Toggle
```js
const LANG_KEY = 'site-lang';
function setLang(lang) {
  document.documentElement.setAttribute('lang', lang);
  localStorage.setItem(LANG_KEY, lang);
  // Re-measure dynamic components
}
// Restore on load
const saved = localStorage.getItem(LANG_KEY);
if (saved) setLang(saved);
```
Pair with CSS `[data-i18n-en]`/`[data-i18n-zh]` visibility rules. Zero DOM manipulation for text — CSS handles show/hide.

## Keyboard Navigation
```js
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') getVisibleStack().cycleNext();
  if (e.key === 'ArrowLeft')  getVisibleStack().cyclePrev();
});
```
Determine "visible stack" by comparing each wrapper's center to viewport center.

## Easing Functions
```js
const SPRING   = 'cubic-bezier(0.34, 1.56, 0.64, 1)';  // Bouncy overshoot
const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';      // Smooth decel
```

## IntersectionObserver for Lazy Effects
```js
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.2 });
document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
```

## Debounce / Throttle (no lodash)
```js
function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}
window.addEventListener('resize', debounce(() => recalculate(), 200));
```
