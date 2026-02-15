---
name: web-typography
description: Typography rules for readable web layouts — font size, line height, line length, spacing, hierarchy, and font choices. Based on Butterick's Practical Typography + web-specific best practices.
---

# Web Typography for Readability

Reference: [Butterick's Practical Typography](https://practicaltypography.com)

## The Big Four (set these first)

Every layout decision starts with body text. Get these four right and everything else follows.

### 1. Font Size
- **Web body text: 16–21px** (Butterick says 15–25px; 16–21 is the sweet spot)
- Smaller text (captions, labels): 12–14px
- Don't go below 14px for any readable content on mobile
- Different fonts at the same px size look different — **let your eyes judge**, not the number
- Half-pixel differences matter at body scale: try 16, 17, 18 before committing

### 2. Line Height (line-spacing)
- **120–145% of font size** — this is the golden range
- For 16px body: `line-height: 1.4` to `1.55` (22–25px)
- For 18px body: `line-height: 1.35` to `1.5` (24–27px)
- **Tighter for headings** (1.1–1.25) — large text needs less breathing room
- **Looser for small text** (1.5–1.6) — small text needs more
- Single-spaced (1.0) is too tight. Double-spaced (2.0) is too loose. Always.

### 3. Line Length
- **45–90 characters per line** (including spaces)
- **Ideal: 55–75 characters** — the comfort zone
- Quick test: 2–3 lowercase alphabets should fit on one line
- In CSS: `max-width: 65ch` on text containers is a reliable shortcut
- On mobile, full-width is fine — the screen naturally constrains line length

### 4. Font Choice
- **Serif or sans-serif both work on modern screens** — the old "sans for screen" rule is dead
- Use a professional font, not system defaults (not Arial, not Times New Roman)
- **Good free web fonts (Google Fonts):**
  - Serif: Source Serif 4, Lora, Merriweather, Playfair Display (display only), Noto Serif
  - Sans: Inter, DM Sans, Source Sans 3, Work Sans, IBM Plex Sans
  - Mono: JetBrains Mono, Fira Code, DM Mono, IBM Plex Mono
- Limit to 2 fonts max (one for headings, one for body). One font with weight variation is even better.
- For Chinese: Noto Serif SC, Noto Sans SC, LXGW WenKai (open source, beautiful)

## Spacing System

### Paragraph Spacing
- Space between paragraphs: **50–100% of body font size**
- For 16px body → `margin-bottom: 0.75em` to `1em`
- **Either** indent first line **or** add paragraph spacing — never both
- On web, paragraph spacing (margin) is almost always the right choice over indents

### Section Spacing
- Space above headings: **1.5–2.5× body font size**
- Space below headings: **0.5–1× body font size** (less than above — heading belongs to what follows)
- Sections need clear vertical rhythm — consistent spacing builds trust

### The 8px Grid
- Align all spacing to multiples of 4 or 8px for visual consistency
- Common scale: 4, 8, 12, 16, 24, 32, 48, 64, 96

## Heading Hierarchy

### Fewer Levels, Subtler Emphasis
- **Max 3 levels of headings.** Two is better. More than 3 = confusing.
- Differentiate with: size, weight, spacing — not gimmicks
- Don't combine bold + italic + underline + caps. Pick one treatment per level.

### Recommended Scale (body = 16px)
```
H1: 36–48px  · weight 700 · line-height 1.1–1.15 · margin-top 0 · margin-bottom 16–24px
H2: 24–32px  · weight 600 · line-height 1.15–1.2 · margin-top 48px · margin-bottom 12–16px
H3: 18–22px  · weight 600 · line-height 1.2–1.3  · margin-top 32px · margin-bottom 8–12px
Body: 16–18px · weight 400 · line-height 1.4–1.55 · margin-bottom 12–16px
Small: 13–14px · weight 400 · line-height 1.45–1.55
```

### Scale Ratios
- **1.25 (Major Third):** Calm, professional — good for body-heavy content
- **1.333 (Perfect Fourth):** Balanced — good general purpose
- **1.5 (Perfect Fifth):** Dramatic — good for landing pages, hero sections
- Pick one ratio and derive all sizes from it: `base × ratio^n`

## Text Formatting Rules

- **Bold or italic — not both.** And use sparingly.
- **Never underline** except for links
- **All caps:** fine for short labels (<1 line). Add 5–12% letter-spacing with caps.
- **Centered text:** sparingly. Left-aligned is almost always more readable.
- Use real curly quotes (" ") not straight quotes (" ")
- Use proper dashes: en-dash (–) for ranges, em-dash (—) for breaks
- One space between sentences, not two

## Web-Specific Rules

### Responsive Typography
```css
/* Fluid type: scales smoothly between viewport sizes */
html { font-size: clamp(16px, 1vw + 14px, 20px); }
```
- Or use 16px mobile, 18px tablet, 20px desktop with media queries
- Headings can scale more aggressively than body

### Contrast & Color
- Body text: minimum 4.5:1 contrast ratio (WCAG AA)
- Large text (24px+): minimum 3:1
- **Don't use pure black (#000) on pure white (#fff)** — too harsh
- Soften: dark gray (#1a1a1a – #333) on off-white (#fafafa – #f5f5f5)
- Accent colors for links and interactive elements only

### Vertical Rhythm
- All spacing (margins, padding, gaps) should feel related
- Use `em` for type-relative spacing, `rem` for page-level consistency
- Test by squinting — spacing should create clear "blocks" of content

### Performance
- Subset fonts to needed characters (especially for CJK)
- Use `font-display: swap` to prevent invisible text during load
- Preconnect to font CDN: `<link rel="preconnect" href="https://fonts.googleapis.com">`

## Quick Audit Checklist

1. ☐ Body text 16–21px?
2. ☐ Line height 1.3–1.55?
3. ☐ Line length 45–90 characters?
4. ☐ Professional font (not system default)?
5. ☐ Max 2 fonts?
6. ☐ Max 3 heading levels?
7. ☐ Heading spacing: more above, less below?
8. ☐ Paragraph spacing OR first-line indent (not both)?
9. ☐ Contrast ratio ≥ 4.5:1?
10. ☐ Consistent spacing rhythm?
