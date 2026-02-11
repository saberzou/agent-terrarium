# Design System — Saber's Projects

Codified design decisions from axel-art and related projects. Follow these unless explicitly overridden.

## Philosophy
- **Subtraction > Addition** — Remove before adding. Every element must earn its place.
- **No emojis** on the site. Never. Use ASCII art or typography for personality.
- **Warm minimalism** — Not cold/sterile. Cozy, inviting, but uncluttered.
- **Interfacecraft.dev** is the design north star — editorial, restrained, confident.

## Color Palette
```css
:root {
  --coral:        #E8A87C;    /* Primary accent */
  --coral-dark:   #D99A6E;    /* Links, active states */
  --coral-light:  #F4C2A1;    /* Highlights on dark bg */
  --cream:        #FDF8F3;    /* Page background */
  --brown:        #3D3229;    /* Primary text */
  --brown-light:  #6B5E55;    /* Secondary text */
  --warm-gray:    #C4BBB5;    /* Muted UI elements */
  --warm-border:  #E8E3DE;    /* Borders, dividers */
  --warm-bg:      #F5F0EB;    /* Card backgrounds, badges */
}
```

## Typography
- **Headings:** Instrument Serif, weight 400. Sizes: h1 56px, h2 36px, h3 22px
- **Body:** DM Mono, weight 400, 15px, line-height 1.7
- **Chinese:** Noto Serif SC (via Google Fonts). Body 14px.
- **ASCII art:** Always Courier New, regardless of language

### Responsive Sizes
```css
@media (max-width: 768px) { h1: 42px; }
```

## Spacing
- Section margin-bottom: 64px
- Card padding: 32px (24px on mobile)
- Max content width: 480px for cards, 900px for container

## Cards
### White cards (diary, thoughts)
```css
background: white;
border-radius: 20px;
box-shadow: 0 4px 24px rgba(61, 50, 41, 0.1);
```

### Dark cards (ASCII art)
```css
background: var(--brown);
color: var(--cream);
border: 1px solid rgba(255, 255, 255, 0.1);  /* Whisper-thin edge */
border-radius: 20px;
```

### Intro card
Tilted -1.5deg with hover straighten to 0deg. Diary-like feel.

## Buttons
```css
border-radius: 50%;     /* Circle buttons */
border: 2px solid var(--warm-border);
background: white;
/* Hover: border-color → coral, scale 1.1 */
```

## Interactive States
- Hover transitions: 0.2s ease
- Card hover: translateY(-2px), deeper shadow
- Active dots: coral background, pill shape (24px wide, 4px border-radius)
- Inactive dots: 8px circle, warm-border color

## Responsive Breakpoints
- 768px: Mobile adjustments (smaller fonts, full-width cards)
- 380px: Extra small (tighter padding, smaller ASCII art)

## i18n Rules
- Toggle in nav as pill button: `border-radius: 20px; padding: 4px 12px`
- Shows "中文" in EN mode, "EN" in ZH mode
- CSS-only visibility switching via `html[lang]`
- Font family switches to Noto Serif SC for Chinese
- Card stacks re-measure height on language change

## Content Guidelines
- Newest content on top (JS reverses card order)
- Card numbers are chronological (01 = oldest), but display is newest-first
- Dots: leftmost = newest, rightmost = oldest
- ASCII art: no emoji, no decorative text — just the art
