---
name: gsap
description: GSAP animation library for web experiences — tweens, timelines, ScrollTrigger, scrub, pin, stagger, parallax, and performance patterns. Use when building animated web pages, scroll-driven effects, or interactive motion design.
---

# GSAP Animation

CDN (latest stable 3.12.5):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Draggable.min.js"></script>
```

Always register plugins: `gsap.registerPlugin(ScrollTrigger)`

## Tweens

```js
gsap.to(".el", { x: 100, opacity: 0.5, scale: 1.2, rotation: 45, duration: 1, ease: "power2.out", delay: 0.5 })
gsap.from(".el", { opacity: 0, y: 50, duration: 0.8 })
gsap.fromTo(".el", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6 })
```

## Timelines

```js
const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power2.out" } })
tl.to(".logo", { opacity: 1, scale: 1 })
  .to(".headline", { y: 0, opacity: 1 }, "-=0.3")   // overlap
  .to(".subtext", { opacity: 1 }, "<")                // start with previous
  .to(".cta", { scale: 1, opacity: 1 }, "+=0.2")      // delay after previous

tl.pause() / tl.play() / tl.reverse() / tl.restart() / tl.timeScale(2)
```

## Stagger

```js
gsap.to(".cards", { y: 0, opacity: 1, stagger: 0.2, duration: 0.6 })

// Advanced: from center, grid-aware
gsap.to(".grid-items", { opacity: 1, scale: 1, stagger: { each: 0.1, from: "center", grid: [4, 3] } })
```

## ScrollTrigger

```js
// Basic reveal
gsap.to(".el", {
  opacity: 1, y: 0,
  scrollTrigger: {
    trigger: ".el",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse"  // onEnter onLeave onEnterBack onLeaveBack
  }
})

// Scrub (scroll-linked) + pin
gsap.to(".parallax-bg", {
  y: 200,
  scrollTrigger: { trigger: ".section", start: "top top", end: "bottom top", scrub: 1, pin: true }
})

// Horizontal scroll
const sections = gsap.utils.toArray(".panel")
gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container", pin: true, scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => "+=" + document.querySelector(".container").offsetWidth
  }
})

// Batch reveal
gsap.utils.toArray(".reveal").forEach(el => {
  gsap.from(el, { opacity: 0, y: 50, scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" } })
})
```

## Performance

**Always use transforms** (GPU-accelerated):
- ✅ `x, y, scale, rotation, opacity`
- ❌ `left, top, width, height, margin`

```js
// High-frequency (cursor, drag)
const quickX = gsap.quickTo(".cursor", "x", { duration: 0.3, ease: "power2" })
const quickY = gsap.quickTo(".cursor", "y", { duration: 0.3, ease: "power2" })
document.addEventListener("mousemove", e => { quickX(e.clientX); quickY(e.clientY) })
```

## Easing Reference

```
// Subtle, professional (preferred)
"power1.out"  "power2.out"  "power1.inOut"

// Playful (sparingly)
"back.out(1.4)"  "elastic.out(1,0.5)"

// Linear (continuous motion)
"none"
```

## Common Patterns

**Hero entrance:**
```js
const tl = gsap.timeline({ defaults: { ease: "power2.out" } })
tl.from(".hero-logo", { opacity: 0, scale: 0.8, duration: 0.8 })
  .from(".hero-title", { opacity: 0, y: 30, duration: 0.6 }, "-=0.4")
  .from(".hero-cta", { opacity: 0, scale: 0.9, duration: 0.5 }, "-=0.2")
```

**Magnetic button:**
```js
btn.addEventListener("mousemove", e => {
  const x = e.clientX - bounds.left - bounds.width / 2
  const y = e.clientY - bounds.top - bounds.height / 2
  gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" })
})
btn.addEventListener("mouseleave", () => {
  gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" })
})
```

**Scroll progress bar:**
```js
gsap.to(".progress-bar", { scaleX: 1, transformOrigin: "left", ease: "none",
  scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: true }
})
```

**Paused menu toggle:**
```js
const menuTl = gsap.timeline({ paused: true })
menuTl.to(".overlay", { opacity: 1, duration: 0.3 })
      .to(".menu", { x: 0, duration: 0.4, ease: "power2.out" }, "<")
      .from(".menu-item", { opacity: 0, x: -30, stagger: 0.08 }, "-=0.2")
// toggle: menuTl.reversed() ? menuTl.play() : menuTl.reverse()
```

**Counter:**
```js
gsap.to(".counter", { innerHTML: 10000, duration: 2, snap: { innerHTML: 1 },
  scrollTrigger: { trigger: ".stats", start: "top 80%", once: true }
})
```

**Infinite loop:** `gsap.to(".el", { rotation: 360, duration: 2, repeat: -1, ease: "linear" })`

**Callbacks:** `onStart, onUpdate, onComplete, onReverseComplete`

## Accessibility

```js
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.globalTimeline.timeScale(100) // instant
}
```

## Cleanup

```js
tl.kill()
ScrollTrigger.getAll().forEach(st => st.kill())
```

## Animation Guidelines

- **Duration:** 0.3-0.5s for UI interactions, 0.8-1.2s for entrances
- **Easing:** `power1.out` or `power2.out` for professional feel
- **Purposeful:** Every animation should have clear purpose
- **Subtle > flashy** — Apple-inspired aesthetic
- **Test on mobile** — reduce complexity on smaller devices
- **`markers: true`** for debug, remove in production
- **Hide before animate:** `.animate-in { opacity: 0; }` in CSS to prevent FOUC
