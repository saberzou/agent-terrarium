# Color Palettes Reference

Source: [Happy Hues](https://www.happyhues.co/) by Mackenzie Child — curated palettes shown in context.
Each palette shows colors with their **intended role** (background, headline, button, etc.), not just swatches.

## How to Use
Pick a palette. Copy the CSS variables. Every color has a purpose.

---

## Palette 3 — Clean Blue (Light)
Professional, trustworthy, calm. Good for tools, docs, dashboards.
```css
:root {
  --bg:           #fffffe;
  --bg-alt:       #d8eefe;
  --headline:     #094067;
  --paragraph:    #5f6c7b;
  --button:       #3da9fc;
  --button-text:  #fffffe;
  --card-bg:      #fffffe;
  --link:         #ef4565;
  --stroke:       #094067;
  --highlight:    #3da9fc;
  --secondary:    #90b4ce;
  --tertiary:     #ef4565;
}
```

## Palette 4 — Dark Void (Dark)
Sleek, modern, dev-focused. Great for code tools, creative portfolios.
```css
:root {
  --bg:           #16161a;
  --bg-alt:       #242629;
  --headline:     #fffffe;
  --paragraph:    #94a1b2;
  --button:       #7f5af0;
  --button-text:  #fffffe;
  --card-bg:      #16161a;
  --link:         #7f5af0;
  --stroke:       #010101;
  --highlight:    #7f5af0;
  --secondary:    #72757e;
  --tertiary:     #2cb67d;
}
```

## Palette 5 — Forest Gold (Dark Green)
Earthy, natural, premium. Nature brands, finance, wellness.
```css
:root {
  --bg:           #004643;
  --bg-alt:       #00332c;
  --headline:     #fffffe;
  --paragraph:    #abd1c6;
  --button:       #f9bc60;
  --button-text:  #001e1d;
  --card-bg:      #004643;
  --link:         #e16162;
  --stroke:       #001e1d;
  --highlight:    #f9bc60;
  --secondary:    #abd1c6;
  --tertiary:     #e16162;
}
```

## Palette 9 — Bold Orange (Light)
Energetic, fun, attention-grabbing. Blogs, portfolios, creative sites.
```css
:root {
  --bg:           #eff0f3;
  --bg-alt:       #fffffe;
  --headline:     #0d0d0d;
  --paragraph:    #2a2a2a;
  --button:       #ff8e3c;
  --button-text:  #0d0d0d;
  --card-bg:      #fffffe;
  --link:         #ff8e3c;
  --stroke:       #0d0d0d;
  --highlight:    #ff8e3c;
  --secondary:    #eff0f3;
  --tertiary:     #d9376e;
}
```

## Palette 12 — Midnight Rose (Dark Blue)
Romantic, editorial, sophisticated. Blogs, magazines, portfolios.
```css
:root {
  --bg:           #232946;
  --bg-alt:       #121629;
  --headline:     #fffffe;
  --paragraph:    #b8c1ec;
  --button:       #eebbc3;
  --button-text:  #232946;
  --card-bg:      #232946;
  --link:         #eebbc3;
  --stroke:       #121629;
  --highlight:    #eebbc3;
  --secondary:    #d4d8f0;
  --tertiary:     #d4939d;
}
```

## Palette 13 — Ember Dark (Dark)
Bold, cinematic, striking. Creative agencies, music, entertainment.
```css
:root {
  --bg:           #0f0e17;
  --bg-alt:       #2e2f3e;
  --headline:     #fffffe;
  --paragraph:    #a7a9be;
  --button:       #ff8906;
  --button-text:  #fffffe;
  --card-bg:      #0f0e17;
  --link:         #ff8906;
  --stroke:       #0f0e17;
  --highlight:    #ff8906;
  --secondary:    #f25f4c;
  --tertiary:     #e53170;
}
```

## Palette 14 — Sunshine Lavender (Light)
Playful, approachable, youthful. Landing pages, apps, SaaS.
```css
:root {
  --bg:           #e3f6f5;
  --bg-alt:       #fffffe;
  --headline:     #272343;
  --paragraph:    #2d334a;
  --button:       #ffd803;
  --button-text:  #272343;
  --card-bg:      #fffffe;
  --link:         #ffd803;
  --stroke:       #272343;
  --highlight:    #ffd803;
  --secondary:    #e3f6f5;
  --tertiary:     #bae8e8;
}
```

## Palette 15 — Blush (Warm Light)
Soft, feminine, gentle. Personal blogs, wellness, lifestyle.
```css
:root {
  --bg:           #faeee7;
  --bg-alt:       #fffffe;
  --headline:     #33272a;
  --paragraph:    #594a4e;
  --button:       #ff8ba7;
  --button-text:  #33272a;
  --card-bg:      #fffffe;
  --link:         #ff8ba7;
  --stroke:       #33272a;
  --highlight:    #ff8ba7;
  --secondary:    #ffc6c7;
  --tertiary:     #c3f0ca;
}
```

## Palette 17 — Retro Cream (Warm Light)
Vintage, cozy, editorial. Our axel-art vibe lives here.
```css
:root {
  --bg:           #fef6e4;
  --bg-alt:       #f3d2c1;
  --headline:     #001858;
  --paragraph:    #172c66;
  --button:       #f582ae;
  --button-text:  #001858;
  --card-bg:      #fef6e4;
  --link:         #f582ae;
  --stroke:       #001858;
  --highlight:    #f582ae;
  --secondary:    #8bd3dd;
  --tertiary:     #f582ae;
}
```

---

## Usage Pattern
```css
/* Apply any palette instantly */
body        { background: var(--bg); color: var(--paragraph); }
h1, h2, h3  { color: var(--headline); }
a           { color: var(--link); }
button      { background: var(--button); color: var(--button-text); }
.card       { background: var(--card-bg); }
.alt-section { background: var(--bg-alt); }
```

## Choosing a Palette
| Mood | Palettes |
|------|----------|
| Professional / Trust | 3 (Clean Blue) |
| Dark / Developer | 4 (Dark Void), 13 (Ember Dark) |
| Nature / Premium | 5 (Forest Gold) |
| Energetic / Fun | 9 (Bold Orange), 14 (Sunshine Lavender) |
| Romantic / Editorial | 12 (Midnight Rose), 15 (Blush) |
| Warm / Cozy | 15 (Blush), 17 (Retro Cream) |

## Tips
- Every palette works because **roles are pre-assigned** — don't just pick random colors
- Use `--bg-alt` for alternating sections to create visual rhythm
- `--tertiary` is your accent for warnings, badges, or highlights
- Test contrast: headline on bg should be 7:1+, paragraph on bg should be 4.5:1+
- Use `color-mix()` to create intermediate shades from any palette color
