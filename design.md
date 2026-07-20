# Nocturnal Design System

A portable spec for the Nocturnal visual language. Use this document to build a
new app (web or Android) that looks and feels like Nocturnal without reading any
source code.

> **Lineage & light mode.** Nocturnal is the Burrow visual language extracted as
> a standalone, reusable kit. It is **dark-first**, but **light mode always
> ships** — it is the `[data-theme="light"]` inversion defined in §2, not an
> optional add-on. Every token has both values; `theme.js` switches between them
> and honors the OS `prefers-color-scheme` on first load.

**The vibe in one line:** a quiet, lamplit room — near-black indigo surfaces,
soft lavender light, old-style serif names, monospace machinery, hard-edged
chrome, and soft floating content.

---

## 1. Design principles

1. **Dark-first, light always present.** The dark theme is the brand. Light mode
   is an inversion of the dark theme, not a separate design — but it always
   ships and is a first-class, fully-tokenized theme.
2. **One accent, used sparingly.** Soft Lavender (`#c9b6ff`) is the only brand
   color. Everything else is near-black, lilac-white, or gray. Green and red
   exist only as semantic signals (online/success, danger/recording).
3. **One font, three roles.** JetBrains Mono is the only typeface; the
   `--sans`, `--serif`, and `--mono` tokens all alias to it. Roles still cast
   text apart by weight, tracking, and style:
   - *Sans* — the default UI voice: buttons, body, labels.
   - *Serif* (token name retained) — the *identity* role: people's names,
     handles, avatar letters, empty-state titles. Italic = the app speaking
     warmly ("No conversations yet").
   - *Mono* — the *machine* role: IDs, fingerprints, timestamps, codes.
4. **Sharp chrome, soft content.** Buttons, inputs, tabs, toggles, and
   modals/dialogs are perfect rectangles (radius 0). Things that float or
   that you read — menus, message bubbles, cards — get rounded corners.
   People are circles (avatars).
5. **Small caps as the system voice.** Status text, section headers, and
   toasts are tiny, bold, uppercase, and widely tracked. If the *system* is
   talking (CONNECTED, ONLINE, ID COPIED), it whispers in letterspaced caps.
6. **Motion settles, never snaps.** Fast utilitarian fades (~150ms) for
   hover/press; longer decelerating ease-outs (~420ms easeOutQuint) for
   anything that moves into place. Press feedback is a subtle scale-down.

---

## 2. Color tokens

### Dark theme (primary)

| Token | Hex | Name / role |
|---|---|---|
| `--bg` | `#050505` | Deep Black — page/window background |
| `--surface` | `#0b0a11` | Near-Black Indigo — cards, modals, menus, bars |
| `--surface-alt` | `#15131d` | Charcoal Violet — elevated chips, key surfaces |
| `--border` | `#1c1926` | Dark Slate — hairline borders, dividers, hover fills |
| `--text` | `#e7dfff` | Pale Lilac — primary text |
| `--muted` | `#7b778a` | Muted Gray — secondary text, placeholders, idle icons |
| `--key` | `#a9a6b3` | Key Gray — secondary chrome/glyphs (native UI) |
| `--accent` | `#c9b6ff` | Soft Lavender — THE brand accent |
| `--accent-dim` | `#3d2e7a` | Deep lavender — pressed/disabled accent, quote rails |
| `--green` | `#3ecf8e` | Online, success, accept |
| `--red` | `#f87171` | Danger, destructive, recording |
| `--msg-out` | `#c9b6ff` | Own message bubble (Soft Lavender) |
| `--msg-in` | `#e7dfff` | Other party's bubble (Pale Lilac) |
| `--msg-out-fg` | `#15131d` | Ink on own bubble (Charcoal Violet) |
| `--msg-in-fg` | `#15131d` | Ink on incoming bubble |
| `--ember` | `#c9b6ff` | Alias of accent (historic name — keep for glows/washes) |
| `--ember-soft` | `rgba(201,182,255,0.10)` | Lavender wash — hover fills, icon discs |
| `--ember-line` | `rgba(201,182,255,0.32)` | Lavender hairline — emphasized borders |

### Light theme (inversion, same family — always shipped)

The rule of the inversion: **the accent becomes the ink.** On white, Charcoal
Violet (`#15131d`) takes over every job Soft Lavender did in the dark —
buttons, links, active states — and lavender retreats to fills and the
incoming bubble. Never put pale lavender text on white.

| Token | Hex | Notes |
|---|---|---|
| `--bg` | `#ffffff` | |
| `--surface` | `#f8f4ff` | Imperceptible lilac wash |
| `--surface-alt` | `#c9b6ff` | Lavender as a band/strip color |
| `--border` | `#e0d5f5` | Lilac hairline |
| `--text` | `#15131d` | Charcoal Violet |
| `--muted` | `#5f5a6e` | Darkened — dark-theme gray reads washed-out on white |
| `--key` | `#55515f` | Darkened chrome/glyph gray |
| `--accent` | `#15131d` | **Accent = ink in light mode** |
| `--accent-dim` | `#c9b6ff` | Lavender becomes the dim/secondary accent |
| `--green` | `#2ea76d` | Darkened for contrast on white |
| `--red` | `#d04848` | Darkened for contrast on white |
| `--msg-out` | `#15131d` | Own bubble flips to dark ink |
| `--msg-in` | `#e7dfff` | Incoming stays Pale Lilac |
| `--msg-out-fg` | `#e7dfff` | Pale Lilac glyph on dark bubble |
| `--msg-in-fg` | `#15131d` | |
| `--ember` | `#15131d` | |
| `--ember-soft` | `rgba(21,19,29,0.06)` | |
| `--ember-line` | `rgba(21,19,29,0.28)` | |

### Semantic tint recipe

Never use solid green/red fills for secondary actions. Tint with alpha over
the transparent base:

- Positive chip: `rgba(green, 0.12)` bg, `rgba(green, 0.38)` border, green
  text; hover raises to `0.22` / `0.60`.
- Danger zone: `rgba(red, 0.06–0.10)` bg, `rgba(red, 0.2–0.32)` border, red
  text. Solid red bg + white text is reserved for the single confirmed
  destructive button (AA contrast).

### Drop-in CSS

This is exactly what ships in `css/tokens.css`:

```css
:root {
  --bg:#050505; --surface:#0b0a11; --border:#1c1926;
  --text:#e7dfff; --muted:#7b778a;
  --accent:#c9b6ff; --accent-dim:#3d2e7a;
  --green:#3ecf8e; --red:#f87171;
  --msg-out:#c9b6ff; --msg-in:#e7dfff;
  --msg-out-fg:#15131d; --msg-in-fg:#15131d;
  --ember:#c9b6ff;
  --ember-soft:rgba(201,182,255,0.10);
  --ember-line:rgba(201,182,255,0.32);
  --serif:"JetBrains Mono",ui-monospace,"SF Mono","Cascadia Mono","Menlo",Consolas,monospace;
  --mono:"JetBrains Mono",ui-monospace,"SF Mono","Cascadia Mono","Menlo",Consolas,monospace;
  --sans:"JetBrains Mono",ui-monospace,"SF Mono","Cascadia Mono","Menlo",Consolas,monospace;
  --surface-alt:#15131d;
  --key:#a9a6b3;
}
:root[data-theme="light"] {
  --bg:#ffffff; --surface:#f8f4ff; --border:#e0d5f5;
  --text:#15131d; --muted:#5f5a6e;
  --accent:#15131d; --accent-dim:#c9b6ff;
  --green:#2ea76d; --red:#d04848;
  --msg-out:#15131d; --msg-in:#e7dfff;
  --msg-out-fg:#e7dfff; --msg-in-fg:#15131d;
  --ember:#15131d;
  --ember-soft:rgba(21,19,29,0.06);
  --ember-line:rgba(21,19,29,0.28);
  --surface-alt:#c9b6ff;
  --key:#55515f;
}
body { font-family:var(--sans); background:var(--bg); color:var(--text); }
```

### Compose (Android) mapping

Mirror the table above into a `Palette` data class delivered via a
`staticCompositionLocalOf`, with Material3's `ColorScheme` mapped minimally:
`primary = accent`, `onPrimary = msgOutFg`, `background = bg`,
`surface = surface`, `onSurface = text`, `error = red`, `outline = border`.
Alpha tokens: emberSoft ≈ `0x14` alpha on the accent, emberLine ≈ `0x52`.
Override all five Material shapes to `RoundedCornerShape(0.dp)` and disable
the global ripple (`LocalRippleConfiguration provides null`) — surfaces that
want tap feedback roll their own color fade or scale pulse.

---

## 3. Typography

### Stacks

| Voice | Stack | Android |
|---|---|---|
| Sans (UI default) | `"JetBrains Mono", ui-monospace, "SF Mono", "Cascadia Mono", Menlo, Consolas, monospace` | `FontFamily.Monospace` |
| Serif (identity role) | `"JetBrains Mono", ui-monospace, "SF Mono", "Cascadia Mono", Menlo, Consolas, monospace` | `FontFamily.Monospace` |
| Mono (machine) | `"JetBrains Mono", ui-monospace, "SF Mono", "Cascadia Mono", Menlo, Consolas, monospace` | `FontFamily.Monospace` |

> All three voices are now **JetBrains Mono** (bundled woff2; a local `JetBrainsMono Nerd Font` install with icon glyphs is preferred) — it's the only typeface. The `--serif`/`--sans`/`--mono` tokens are kept as aliases so identity/machine/UI text can still be cast apart by weight and tracking, and so a future swap is one edit. The face is declared in `css/fonts.css`.

### Casting rules

- **Serif** for anything that names a *person or place*: user handles,
  contact names, avatar initials, the room/chat title. Weight 600, slight
  negative tracking (−0.005 to −0.012em). Empty-state titles and welcome
  copy are *italic* serif at ~1.45rem.
- **Mono** for anything *machine-generated*: account IDs, fingerprints,
  list timestamps, invite codes. Positive tracking (0.03–0.15em);
  `tabular-nums` for clocks. ID entry fields: mono, uppercase, 0.15em
  tracking.
- **Sans** everywhere else.
- **Wordmark:** sans, 700, ALL CAPS, letter-spacing 0.14em.

### Scale (web, rem)

| Role | Size | Weight | Notes |
|---|---|---|---|
| Wordmark | 1.9 | 700 | caps + 0.14em tracking |
| Empty-state title | 1.45 | 400 | serif italic |
| Identity handle | 1.2 | 600 | serif |
| List item name | 0.92 | 600 | serif |
| Body / dialog text | 0.92 | 400 | line-height 1.55 |
| Buttons / inputs | 0.875 | 600 / 400 | |
| Secondary body | 0.82 | 400 | muted, line-height 1.55 |
| Caption / sub-line | 0.68–0.78 | 400 | often mono + muted |
| Micro-label (system voice) | 0.58–0.72 | 600–700 | UPPERCASE, tracking 0.12–0.28em |

Rule of thumb for micro-labels: the smaller the text, the wider the tracking
(0.62rem → 0.28em; 0.72rem → 0.12em).

### Scale (Android, sp)

headlineLarge 32/38 serif 600 · headlineMedium 22/28 serif 600 ·
titleLarge 18/24 sans 600 · bodyLarge 15/22 · bodyMedium 14/20 ·
labelLarge 13/18 600 (+0.2sp) · labelSmall 11 600 (+1.5sp, for micro-labels).

---

## 4. Shape language

| Element | Radius |
|---|---|
| Buttons, inputs, search fields, tabs, segmented toggles, QR boxes, modals/dialogs | **0** (sharp) |
| Small interactive insets (icon-button hover, menu items, edit fields) | 4–9px |
| Floating menus / dropdowns | 8–10px |
| Compose textarea, emoji picker, file-icon chips | 10–12px |
| Cards (e.g. request rows), reveal panels | 12–14px |
| Message bubbles | 18px, with the **tail corner at 6px** (bottom-right for own, bottom-left for incoming) |
| Pills (toast, inline accept/decline chips) | 999px |
| Avatars, presence dots, play buttons, record dot | 50% (circle) |

The tension is intentional: the app's *chrome* is sharp and architectural;
the *content and conversation* are soft. Don't round a button; don't sharpen
a bubble.

Borders are 1px hairlines in `--border`; emphasized containers upgrade to
`--ember-line`. Shadows are soft, downward, and dark regardless of theme:
menus `0 12px 28px -10px rgba(0,0,0,0.55)`, modals/popovers
`0 10px 24–28px rgba(0,0,0,0.32–0.40)`.

---

## 5. Spacing & layout

- Rem-based spacing, common steps: 0.25 / 0.4 / 0.5 / 0.6 / 0.75 / 0.85 /
  1 / 1.25 / 1.5 / 1.75 / 2rem. Nothing is on a hard 8px grid; favor these
  slightly-tightened values.
- **Breakpoints:** 720px = mobile/desktop split (sidebar + detail collapse to
  one pane); 540px = icon-only header actions; 400px = small-phone
  compression (shrink avatars 40→36px, icons 36→32px); ≥1201px = roomier
  sidebar.
- Sidebar: fixed 400px (600px on wide desktop), inner column max 520px.
- Modals/dialogs: max-width 420px, padding 1.5rem, content gap 1rem.
- Auth/login column: max-width 380px, centered, gap 2rem.
- Touch targets: 48px field/button height on mobile rows; 32–38px icon
  buttons; 40px avatars (44px in settings).
- Lists: invisible scrollbars (`scrollbar-width: none`), row gap 0.4rem,
  row padding ~0.7rem 0.85rem.

---

## 6. Motion

| Pattern | Spec |
|---|---|
| Hover/press color & border fades | 120–180ms, default ease |
| Press feedback | `transform: scale(0.93–0.97)` over ~100ms |
| Toast / move-into-place | transform 420ms `cubic-bezier(0.22, 1, 0.36, 1)` (easeOutQuint), opacity 280ms ease-out — fade leads the motion in, trails on exit |
| Attention pulse (reconnecting dot, REC dot) | 1.0–1.1s ease-in-out infinite, opacity 0.35↔1 + scale 0.9↔1.15 |
| Ambient pulse (orb/glow) | 2.2s ease-in-out alternate, scale 0.92↔1.08 |

No bounces, no springs, no slide-in pages. Things *settle*. Honor
`prefers-reduced-motion` (the kit's `components.css` already does).

---

## 7. Component recipes

### Buttons
All text buttons are UPPERCASE (tracking 0.08em), weight 600, full-width
(`width: 100%`), transparent — no background fills, ever; hierarchy comes
from the outline. Icon buttons keep their intrinsic 32px size.
- **Primary:** transparent, `--accent` ink, 1px `--accent` outline, radius 0,
  0.7rem × 1.25rem padding. Hover: opacity 0.88. Active: scale(0.97).
- **Secondary (ghost):** transparent, `--accent` ink, 1px `--accent-dim`
  outline. Hover: opacity 0.88.
- **Danger:** transparent, `--red` ink, 1px `--red` outline for the final
  confirm (the one sanctioned non-accent color).
- **Disabled:** opacity 0.35.
- **Icon buttons:** borderless, transparent, `--accent` glyph; hover
  brightens to `--text`; active scale(0.94).
- **Pills:** radius 999px for inline chips; tinted per the semantic recipe.
- **Placement:** in dialogs and under input fields, buttons sit in a flex
  row; being full-width, side-by-side buttons share the row equally.

### Inputs
- `--bg` fill on `--surface` containers (inverted nesting), 1px `--border`,
  radius 0, 0.875rem text. Focus: border-color → `--accent` (no glow, no
  ring). Placeholder: `--muted`. Multi-line/technical inputs may use mono +
  10px radius.

### Segmented toggle
Sharp rectangle, `--surface` bg + `--border` outline. Options are uppercase
micro-labels (0.66rem, 0.14em tracking); active option gets a solid
`--accent` fill with `--msg-out-fg` ink.

### List rows
Transparent at rest (no card chrome). Hover: `--ember-soft` wash. Active
press: scale(0.995). Selected: `rgba(accent, 0.16)` fill. Structure: 40px
circular avatar · serif name over mono sub-line · right-aligned mono
timestamp in caps. Status text (ONLINE / NEW MESSAGE) is a green micro-label,
offline is muted.

### Avatars
Solid `--accent` disc, circular, with a single serif initial in
`--msg-out-fg`. Optically center the cap-height glyph with
`transform: translateY(0.13em)`. Images fill the disc (`object-fit: cover`).

### Modals
Backdrop `rgba(0,0,0,0.6)`. Panel: `--surface`, 1px `--border`, radius 0
(sharp — dialogs are chrome, not floating content), 1.5rem padding, max
420px. Title 1rem/700 sans. Action rows are a 2-column grid with 0.5rem gap.

### Floating menus
`--surface` bg, `--border` outline, 10px radius, 4px inner padding, items
0.82rem with 7px-radius hover (`--ember-soft` or `--border` fill). Danger
items: red text + `rgba(red, 0.10)` hover.

### Toast
Fixed bottom-center pill. Uppercase 0.72rem/600 micro-label in `--accent`,
no background chrome needed. Enters by rising ~140% from below while fading
in (specs in §6); auto-dismiss reverses it.

### Empty states
56px circular disc (`--ember-soft` fill, `--ember-line` border, accent
glyph) · italic serif title (1.45rem) · muted body (0.88rem, line-height
1.65, max-width 320px), all centered.

### Status indicators
8px circular dot: green = connected, muted = waiting/offline, muted +
pulse = reconnecting. Paired label is an uppercase micro-label that matches
the dot's color logic (muted unless connected).

### Message bubbles (if the app chats)
Own = `--msg-out` right-aligned; incoming = `--msg-in` left-aligned; both use
Charcoal Violet ink in dark mode. Max-width 75%, padding 0.35rem 0.7rem,
18px radius with 6px tail. Meta (time + state) rides inline at the end of
the text run at 0.7rem / 72% opacity. Read-state is a single 0.5rem dot:
muted = sent, white = delivered, accent = read.

---

## 8. Voice & microcopy

- System feedback is terse and lowercase-meaning, uppercase-rendered:
  "ID COPIED", "CONNECTED", "ONLINE".
- Empty states are warm, italic, serif, and short: a title like
  *"No conversations yet"* plus one muted sentence of guidance.
- Buttons are verbs: "Accept", "Decline", "Block", "Save".
- Destructive flows always pass through a styled confirm dialog (never the
  native `window.confirm`), with the consequence stated in one plain
  sentence.

## 9. Checklist for a new app

1. Drop in the CSS variable block (or Compose palette) from §2.
2. Set body to the system sans; define `--serif` and `--mono`.
3. Zero out radii on all buttons/inputs/toggles/modals; round only menus
   (10px), cards (12–14px), pills (999px), avatars (50%).
4. Default to dark theme; ship light mode as the §2 inversion (accent ↔ ink
   swap) behind `data-theme="light"` — wire it with `theme.js`.
5. Cast type by voice: serif = names/identity, mono = machine output,
   sans = everything else; system voice = letterspaced caps micro-labels.
6. Use `--ember-soft` for every hover wash and icon disc; `--ember-line`
   for emphasized borders.
7. Keep motion to 150ms fades, scale-down presses, and easeOutQuint
   settles. No springs. (Android: kill the Material ripple.)
8. Reserve green and red strictly for semantics, tinted per §2's recipe.
