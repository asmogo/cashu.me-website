---
name: cashu.me
description: Bearer cash for the web — an open-source ecash wallet marketing site.
colors:
  inkwell: "#0a0a0a"
  specimen-cream: "#ffffff"
  paper: "#fafafa"
  ash-light: "#8a8a93"
  ash-dark: "#6b6b73"
  rule-dark: "#1f1f22"
  rule-light: "#e5e5e5"
  cashu-lilac: "#b4a7f5"
  cashu-lilac-deep: "#7a66e8"
typography:
  display-1:
    fontFamily: "Articulat CF, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 10vw, 10.5rem)"
    fontWeight: 500
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  display-2:
    fontFamily: "Articulat CF, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6.2vw, 6.25rem)"
    fontWeight: 500
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  display-3:
    fontFamily: "Articulat CF, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 3rem)"
    fontWeight: 500
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  lead:
    fontFamily: "Articulat CF, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.1vw + 0.6rem, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "Articulat CF, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "JetBrains Mono, ui-monospace, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.1em"
rounded:
  none: "0"
  pill: "9999px"
spacing:
  gutter-sm: "1.5rem"
  gutter-md: "2.5rem"
  section-y-sm: "6rem"
  section-y-md: "8rem"
  section-y-lg: "10rem"
  section-y-xl: "13rem"
  container-max: "1400px"
components:
  pill-cta:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.inkwell}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1rem"
    typography: "{typography.body}"
  pill-cta-hover:
    backgroundColor: "{colors.cashu-lilac}"
    textColor: "{colors.inkwell}"
  pill-outline:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1rem"
  pill-tag:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.375rem 0.75rem"
    typography: "{typography.label}"
  section-dark:
    backgroundColor: "{colors.inkwell}"
    textColor: "{colors.paper}"
  section-light:
    backgroundColor: "{colors.specimen-cream}"
    textColor: "{colors.inkwell}"
---

# Design System: cashu.me

## 1. Overview

**Creative North Star: "The Bearer Specimen"**

cashu.me is a specimen page for a piece of digital cash. Type is the artifact. The page reads like a museum caption: dispassionate, precise, large, asking the viewer to look without selling them anything. Sections alternate between a black inkwell and a white specimen cream, the way a printed monograph alternates between facing plates and explanatory text. The visitor moves down the page the way you move down a printed broadsheet, not the way you scroll a feed.

The aesthetic is editorial and committed, not enterprise. Restraint is the voice — generous whitespace, oversize display, mono labels and bracketed `[N]` marks that read as protocol citations rather than UI noise. The single chromatic note is a soft lilac that sits between purple and periwinkle, reserved for emphasis. The page rejects every dominant crypto-site reflex: it is not neon, not glassmorphic, not chart-heavy, not pastel, not navy-and-gold.

**Key Characteristics:**

- Editorial scale (hero up to ~10rem at large viewports), tight tracking (`-0.035em`), short leading (0.94).
- Section-scoped dark/light theming via `[data-theme]` — themes alternate, not chosen.
- Lilac accent used sparingly: `[N]` marks, CTA hover, `::selection`. Never large fields.
- Native `<details>` accordion, native `<a>` pill buttons. No bespoke widgets where the platform suffices.
- Phone placeholders maintain device proportions (9:19.5); no skeuomorphic chrome.

## 2. Colors

A two-surface monochrome system anchored by a single chromatic accent. The palette is dispassionate, the lilac is the one place voice enters.

### Primary

- **Cashu Lilac** (`#b4a7f5`): The single chromatic voice. Reserved for `[N]` index marks, link underlines, CTA hover, and `::selection`. Never used as a large color field. Permitted on dark surfaces where it passes WCAG AA against `#0a0a0a`.
- **Cashu Lilac Deep** (`#7a66e8`): The light-surface variant. The lighter shade fails WCAG AA against `#ffffff` for text, so the deeper variant takes over on white. Same role: emphasis, not surface.

### Neutral

- **Inkwell** (`#0a0a0a`): The dark surface. Background of the hero, wallet showcase, final CTA, and footer. Reads as printed matte ink, not as "dark mode."
- **Specimen Cream** (`#ffffff`): The light surface. Background of the middle sections. *Note: this is currently pure white; the system's intended posture is a barely-tinted off-white (chroma 0.005 toward lilac). Migrate when typesetting tonal ramps.*
- **Paper** (`#fafafa`): Foreground text on Inkwell. The same off-white principle applies — favor `oklch(98% 0.003 280)` over pure `#fafafa` on next pass.
- **Ash Light** (`#8a8a93`): Muted text on Inkwell. Tag chips, captions, and supporting prose.
- **Ash Dark** (`#6b6b73`): Muted text on Specimen Cream.
- **Rule Dark** (`#1f1f22`): Hairline rules and section dividers on Inkwell. Always 1px.
- **Rule Light** (`#e5e5e5`): Hairlines on Specimen Cream.

### Named Rules

**The One Voice Rule.** Cashu Lilac is the sole chromatic note in the system. It appears on no more than ~5% of any given screen. Its rarity is the point. If a section reads "colorful," the rule is broken.

**The No-Pure-Black, No-Pure-White Rule.** Every surface tints toward the brand hue at chroma 0.005–0.01. Today's `#0a0a0a` and `#ffffff` are temporary — the next color pass replaces them with `oklch(13% 0.003 280)` and `oklch(99% 0.003 280)` (a near-imperceptible lilac warmth that prevents the surfaces from reading as raw RGB).

## 3. Typography

**Display Font:** Articulat CF (self-hosted from `/public/fonts`, weights 400/500/600/700/800/900). Fallback: `ui-sans-serif, system-ui, -apple-system`.
**Body Font:** Articulat CF. Same family carries display and body; weight and size do the hierarchy work.
**Label/Mono Font:** JetBrains Mono (loaded via `next/font/google`). Fallback: `ui-monospace, Menlo, monospace`.

**Character:** Articulat CF is a refined modern grotesque with a slight humanist warmth in the lowercase. It carries an editorial / specimen voice at large sizes (display) and stays readable at small sizes (body) without feeling sterile. Chosen over Satoshi, Geist, and Inter because those have become training-data defaults; Articulat CF is the deliberate detour. JetBrains Mono carries the protocol register without competing with Articulat CF.

### Hierarchy

- **Display 1** (Articulat CF 500, `clamp(3.5rem, 10vw, 10.5rem)`, line-height 0.94, tracking -0.035em): Hero statements and the final CTA. One per section, at most.
- **Display 2** (Articulat CF 500, `clamp(2.5rem, 6.2vw, 6.25rem)`, line-height 0.94, tracking -0.035em): Section headings ("What's different.", "Who holds the bitcoin.").
- **Display 3** (Articulat CF 500, `clamp(1.75rem, 3vw, 3rem)`, line-height 0.94, tracking -0.035em): Sub-section / smaller display moments.
- **Lead** (Articulat CF 400, `clamp(1.125rem, 1.1vw + 0.6rem, 1.375rem)`, line-height 1.4): Standalone introductory paragraphs after a Display heading. Capped at 48-55ch.
- **Body** (Articulat CF 400, 1.0625rem, line-height 1.55 on light / 1.6 on dark): Pillar / column / accordion prose. Capped at 65ch.
- **Label** (JetBrains Mono 400, 0.75rem, letter-spacing 0.1em, uppercase): Eyebrows like `[001] CASHU PROTOCOL`, pill-tag chips, and the lower rail of the hero.

### Named Rules

**The Specimen Scale Rule.** Display 1 is reserved for the page's two apex moments: the opening hero ("Bearer cash for the web.") and the closing CTA ("Take it with you."). Together they bookend the page. No element in the body of the page ever reaches that size.

**The Balanced Wrap Rule.** All headings carry `text-wrap: balance`. All long-form prose carries `text-wrap: pretty`. The page never ships a heading with an orphaned single word on the last line if the browser can prevent it.

**The Mono-as-Structure Rule.** Mono is structural, not decorative. It appears on `[N]` index marks, pill-tag chips, eyebrow labels, and the version stamp in the footer. It does NOT appear on body prose, headings, or button labels. Decorative mono is costume.

## 4. Elevation

Flat by default. The system does not use ambient shadows on surfaces, cards, or buttons. Depth is communicated by surface inversion (dark vs light section) and by 1px hairline rules — never by elevation.

No exceptions. Earlier drafts allowed a single deep drop shadow on the `<PhonePlaceholder>`; that component has been retired in favor of `<BrowserChrome>`, which is also flat (no shadow, hairline border).

### Named Rules

**The Flat-by-Default Rule.** Buttons, cards, inputs, sections, and chips are flat at rest. Shadows are reserved for objects depicting physical things (phones, banknote-style mockups). Never decorative.

## 5. Components

### Buttons (Pills)

Pill-shaped (`border-radius: 9999px`), no border-radius variants. Three roles, distinguished by surface treatment, not shape.

- **CTA (`pill-cta`)**: Inverse-surface fill. On dark sections: paper background, inkwell text. On light sections: inkwell background, paper text. Hover swaps fill to Cashu Lilac with inkwell text. Used at most once per section for the primary action.
- **Outline (`pill-outline`)**: Transparent fill, foreground/30% border, hover lifts border opacity to 100%. Used adjacent to CTAs for secondary actions ("Read the docs").
- **Tag (`pill-tag`)**: Static label chip, border in current `--border` token, JetBrains Mono. Never clickable; used to enumerate audience archetypes inside columns.

### Chips

Tag chips and CTA pills share the same pill primitive. Tag chips are not state-bearing; they are always cosmetic enumerations.

### Cards / Containers

The system avoids cards. Section bodies are not cards. Pillar items are not cards. They are vertical compositions separated by 1px hairline rules and the `[N]` index mark in the top-left.

If a card-like container ever becomes necessary, it MUST be flat, hairline-bordered, and never nested.

### Inputs

No input components exist yet. When they arrive: stroke-only (hairline border), no fill, focus state inverts the stroke to Cashu Lilac.

### Navigation

Fixed header, 64px tall, transparent at top of page. Past 20px of scroll, gains a translucent backdrop-blur surface that adapts to the section currently sitting behind it (via `IntersectionObserver` watching `[data-theme]` sections). The brand lockup is a 24px monogram square next to the wordmark "cashu.me" in Satoshi 500. Links are foreground/70%, hover full foreground. The right-aligned CTA pill is always present.

### Browser Chrome (signature component)

The wallet ships natively on iOS and Android, and also runs in any modern browser without install. The signature visual is a stylized desktop-browser chrome (`<BrowserChrome>`): three small dot controls on the left, a transparent URL bar reading `cashu.me`, and a hairline-bordered content area below. It represents the browser path honestly: the path that needs no app-store install, the path most visitors discovering the page from a desktop link will take first. Scoped to the wallet-showcase section; the hero is permitted to use platform-store badges for native install.

Used at most once on the page, with a single composed mock interior. Never repeated within a section.

### Store Badges

Official Apple "Download on the App Store" SVG and Google "Get it on Google Play" artwork, used verbatim from each platform's marketing-resources kit. Reserved for the hero, where they signal native install. Sized so both share a 48px (mobile) / 56px (desktop) baseline height, anchored on a shared baseline grid so the artwork inside each badge aligns optically. These are the one place where third-party brand assets are allowed to override the Bearer Specimen aesthetic: recognition is the conversion driver, the aesthetic concession is one-time and confined to the hero.

Do not recolor, restyle, or stretch the artwork. Do not place on top of imagery. Do not rotate.

### Specimen Blocks

Each pillar in the "What's different" section is paired with a specimen: a small typographic exhibit that demonstrates the property rather than illustrating it. Examples: a wrapped serialization of a blinded token, a stylized Lightning invoice fragment, a redemption arrow to a Lightning address. Mono, hairline-bordered, flat, with a `[N]` index mark in the top-left corner.

Specimen blocks are not cards. They are exhibits.

### Accordion

Native `<details>` / `<summary>`. Each item is separated by a 1px top hairline. A `+` icon on the right rotates 90° and collapses vertically into a `−` on open. No animated height; the open/close transition is purely the icon rotation. Body text appears below the summary at body size, capped at 65ch.

## 6. Do's and Don'ts

### Do

- **Do** keep Cashu Lilac at ≤5% of any screen. Its rarity is the point.
- **Do** invert surfaces between sections (dark → light → dark) the way a printed monograph alternates plates and text.
- **Do** carry `[N]` index marks in JetBrains Mono on every section that enumerates (pillars, built-for columns, footer rail).
- **Do** use native `<details>` for accordions, `<a>` for buttons, `<section data-theme>` for theme scope. Lean on the platform.
- **Do** cap body lines at 65ch using `max-w-[65ch]`. Cap lead lines at 48–55ch.
- **Do** use `text-wrap: balance` on headings and `text-wrap: pretty` on prose.
- **Do** keep the navbar at exactly 64px and adapt its theme via `IntersectionObserver` on `[data-theme]` sections.

### Don't

- **Don't** use neon-on-black crypto colors. No electric green/blue/orange neon, no 3D rendered logos, no futurist UI. This is the dominant crypto-site reflex and the brand explicitly rejects it.
- **Don't** use consumer-fintech pastels, friendly mascots, or gradient illustrations à la Cash App / Venmo / Revolut. Reads as custodial app and undermines bearer positioning.
- **Don't** lean on bank navy + gold institutional gravitas. Wrong register entirely.
- **Don't** use Web3 / DeFi maximalism — glassmorphism, rainbow accents, dashboard-heavy charts, chart-driven hero treatments.
- **Don't** use card grids with icon + heading + subtitle templates. Sections are typographic compositions, not cards.
- **Don't** use em dashes (`—` or `--`) in user-facing copy. Use commas, colons, semicolons, periods, or parentheses.
- **Don't** use `background-clip: text` gradient text, decorative glassmorphism, or border-left side stripes.
- **Don't** use display fonts other than Articulat CF or mono fonts other than JetBrains Mono. Two families is the cap. No Switzer, no Satoshi, no Inter, no Geist.
- **Don't** use Cashu Lilac (`#b4a7f5`) for text on white. Switch to Cashu Lilac Deep (`#7a66e8`) when on Specimen Cream.
- **Don't** apply ambient shadows to flat surfaces. The Phone Placeholder shadow is the only exception, scoped to that component.
- **Don't** ship a heading without `text-wrap: balance` or prose without `text-wrap: pretty`.
- **Don't** redefine tokens at the call site. New utilities go through the `@theme inline` block in `globals.css`.
- **Don't** claim "self-custodial" or "no custodian." Cashu is custodial: mints hold the underlying Bitcoin. The accurate framing is bearer tokens plus unconditional withdrawal to any Lightning address. Candor is the brand; overclaiming corrodes it.
