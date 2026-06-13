# Nocturnal

A portable, framework-agnostic design kit — the visual language extracted for
reuse across projects. **Dark-first, light mode always shipped.**

> A quiet, lamplit room: near-black indigo surfaces, soft lavender light,
> old-style serif names, monospace machinery, hard-edged chrome, soft
> floating content.

## What's here

```
nocturnal/
├─ design.md              The full spec — read this first
├─ theme.js               Light/dark switch (OS-aware, persists choice)
├─ README.md
├─ fonts/                 Iosevka superfamily, bundled (woff2): Aile (sans),
│                         Etoile (serif), Iosevka (mono)
└─ css/
   ├─ index.css           Single entry point (@imports the four below)
   ├─ fonts.css           @font-face for the bundled Iosevka superfamily
   ├─ tokens.css          CSS variables — both themes (the contract)
   ├─ base.css            Reset + body defaults
   └─ components.css      Generic recipes: buttons, inputs, modal, toast,
                          segmented, menus, pills, cards, list rows, avatars,
                          empty states, status dots, message bubbles
```

This is the **curated** kit: only the generic, reusable recipes. Project-
specific component CSS (budget grids, registers, etc.) was intentionally left
out so this drops cleanly into any new project.

The Iosevka superfamily (Aile = sans, Etoile = serif, Iosevka = mono) ships
bundled in `fonts/` and is wired up by `css/fonts.css`, so the type voices
render as designed — no font install, no CDN.

## Use it

**1. Pull in the CSS** — one import:

```css
@import "nocturnal/css/index.css";
```

or link the entry point directly:

```html
<link rel="stylesheet" href="nocturnal/css/index.css" />
```

(Or import `tokens.css`, `base.css`, `components.css` individually if you want
control over bundling/ordering.)

**2. Wire up theming** — load `theme.js` in `<head>` *before* your CSS so there's
no flash of the wrong theme:

```html
<script src="nocturnal/theme.js"></script>
```

On first load it picks the OS preference (`prefers-color-scheme`) and follows
it until the user makes an explicit choice. Then control it from anywhere:

```js
Nocturnal.toggle();      // flip light ⇄ dark
Nocturnal.set("light");  // force a theme (persisted)
Nocturnal.get();         // "light" | "dark"
```

If you don't want JS, you can set the theme yourself — dark is the default,
light is opt-in:

```html
<html data-theme="light"> ... </html>
```

## The rules in 30 seconds

- **One accent.** Soft Lavender is the only brand color. Green/red are
  semantic signals only — tint them, don't fill with them (except the single
  confirmed destructive button).
- **Three voices.** Serif = names/identity, mono = machine output (IDs,
  numbers, timestamps), sans = everything else. System messages are tiny
  UPPERCASE letterspaced caps (`.micro-label`).
- **Sharp chrome, soft content.** Buttons/inputs/toggles are radius 0; menus,
  modals, cards, bubbles, and pills are rounded; avatars and dots are circles.
- **Motion settles.** 150ms fades, scale-down presses, easeOutQuint settles.
  No springs. `prefers-reduced-motion` is honored.

Full detail — color tables, type scale, every component recipe, and an
Android/Compose mapping — lives in [`design.md`](./design.md).

## Android

`design.md` includes the Compose mapping (§2): mirror the token table into a
`Palette` via `staticCompositionLocalOf`, zero all five Material shapes, and
disable the global ripple. Light mode is the same inversion table.
