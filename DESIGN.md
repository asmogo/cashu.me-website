---
name: cashu.me
description: Bearer cash for the web — an open-source ecash wallet marketing site.
colors:
  sky-top: "#c9e2f5"
  sky-bottom: "#dcedf9"
  sky-mid: "#cfe5f7"
  ink: "#14181f"
  cashu-lilac-cta: "#5b46d4"
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
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 10vw, 10.5rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.035em"
  display-2:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6.2vw, 6.25rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.035em"
  display-3:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 3rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.035em"
  lead:
    fontFamily: "Geist Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.1vw + 0.6rem, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "Geist Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Azeret Mono, ui-monospace, Menlo, monospace"
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
  section-y-tight: "clamp(4rem, 8vw, 6rem)"
  section-y-base: "clamp(6rem, 12vw, 10rem)"
  section-y-wide: "clamp(8rem, 16vw, 14rem)"
  container-max: "1200px"
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

cashu.me is a specimen page for a piece of digital cash. Type is the artifact. The page reads like a museum caption: dispassionate, precise, large, asking the viewer to look without selling them anything. The visitor moves down the page the way you move down a printed broadsheet, not the way you scroll a feed.

> **Daylight Sky revision (2026-07-11, deliberate).** The page's surface is no longer the alternating inkwell/cream of the original spec: the whole page now sits on a single continuous daylight-sky surface — a near-flat blue gradient (`sky-top` → `sky-bottom`, deeper at the top of the page, palest behind the FAQ/footer) with a small library of photographic cloud cutouts instanced at small sizes as ambient decoration. The specimen posture is unchanged: type is still the artifact, ink on sky. The sky is ambient, not the subject — see The Ambient Sky Rule in §2. The dark inkwell token set remains defined but dormant.

The aesthetic is editorial and committed, not enterprise. Restraint is the voice — generous whitespace, oversize display, mono labels for structural chrome. The single chromatic note is a soft lilac that sits between purple and periwinkle, reserved for emphasis. The page rejects every dominant crypto-site reflex: it is not neon, not glassmorphic, not chart-heavy, not pastel, not navy-and-gold.

**Key Characteristics:**

- Editorial scale (hero up to ~10rem at large viewports), tight tracking (`-0.035em`), short leading (0.94).
- One continuous daylight-sky surface page-wide (since the Daylight Sky revision); the earlier alternating `[data-theme]` plates are retired but the token architecture is kept.
- Lilac accent used sparingly: CTA hover, link underlines, `::selection`. Never large fields.
- Native `<details>` accordion, native `<a>` rectangular buttons. No bespoke widgets where the platform suffices.
- Phone placeholders maintain device proportions (9:19.5); no skeuomorphic chrome.

> **Drift note:** an earlier draft of this system specified bracketed `[N]` index marks as protocol-citation eyebrows on every enumerating section. They were never shipped — `Section.tsx` supports an `index` prop but no live section passes one. Treat their absence as the current, intended state, not a gap to fill; see the retired-devices note in §5 before reintroducing them.

## 2. Colors

A single sky surface anchored by ink type and one chromatic accent. The palette is dispassionate, the lilac is the one place voice enters.

### The Sky Surface (Daylight Sky revision)

- **Sky Top** (`#c9e2f5`) → **Sky Bottom** (`#dcedf9`): the page background is one near-flat vertical gradient across the whole document, deeper at the top (zenith) and palest at the bottom (horizon, behind the dense FAQ/footer). No photographic backdrop, no tiling imagery: the sky surface is a flat color field; the photography lives only in the small cloud cutouts.
- **Sky Mid** (`#cfe5f7`): the `--background` token — used for translucent fills (header glass) and anywhere a single solid surface color is needed.
- **Ink** (`oklch(16% 0.015 260)` ≈ `#14181f`): foreground type on sky. 15.9:1 on Sky Bottom, 14.8:1 on Sky Top (AAA).
- Muted text: `oklch(42% 0.03 255)` ≥6.5:1 on sky (AA+). Hairlines/borders: `oklch(78% 0.035 240)`.

**The Ambient Sky Rule.** The sky is ambient, not the subject. Clouds are photographic cutouts (never cartoon/illustrated shapes) — currently a 7-shape library sourced from Resource Boy's cloud textures (`/public/images/clouds`, placements in `src/lib/clouds.ts`), instanced small (~40–180px; one ~230px signature in the hero). At most ~3 clouds visible per viewport-height; they live in gutters, beside headings, and at section seams — never behind running text or interactive targets; always `aria-hidden` + `pointer-events: none`. Motion is a single global scroll-progress value driving transform-only X drift; reduced-motion renders them static (never removes them); below `md` only a small flagged subset renders, without drift. If a section reads "cloudy," the rule is broken.

### Primary

- **Cashu Lilac CTA** (`#5b46d4`): the accent for small text and interactive emphasis on the sky surface — ≥4.5:1 (AA) against both gradient ends. Takes over the roles Cashu Lilac Deep held on light surfaces.
- **Cashu Lilac Deep** (`#7a66e8`): 3.45:1 on sky — display-scale/graphic use only (≥24px), never small text on sky.
- **Cashu Lilac** (`#b4a7f5`): the dark-surface voice; dormant with the inkwell set. Reserved for link underlines, CTA hover, and `::selection` on dark. Never used as a large color field.

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

**The Scan Color Exemption.** The `--scan` token (green, `#86efac` on dark / `#16a34a` on light) is the sole sanctioned non-lilac chromatic, scoped to `custody-comparison.tsx` where it carries the surveillance metaphor (the bank lane "sees" a green packet; the mint lane blurs it). It must not appear elsewhere on the page.

**The No-Pure-Black, No-Pure-White Rule.** Every surface and neutral tints toward a hue. Since the Daylight Sky revision the reference hue for neutrals is the sky's (~240–260): ink is `oklch(16% 0.015 260)`, muted/borders sit at hue 240–255. The dormant dark set keeps its lilac-tinted values (`oklch(13% 0.003 280)` etc.). Legacy spec values `#0a0a0a` and `#ffffff` are kept above only for documentation reference.

## 3. Typography

**Display Font:** Manrope (Google Fonts, self-hosted at build time via `next/font/google`, weights 500/600). Fallback: `ui-sans-serif, system-ui, -apple-system`.
**Body Font:** Geist Sans (loaded via `geist/font/sans`). Distinct from the display face; weight and size still do the hierarchy work within it.
**Label/Mono Font:** Azeret Mono (loaded via `next/font/google`). Fallback: `ui-monospace, Menlo, monospace`.

**Character:** Manrope is a geometric sans with a clean, slightly rounded grotesque structure — legible and current without tipping into a technical or novelty register. It carries the editorial / specimen voice at large sizes through scale and tight tracking rather than an unusual letterform. Geist Sans carries body copy for its neutrality and readability at small sizes. Azeret Mono carries the protocol register without competing with either.

### Hierarchy

- **Display 1** (Manrope 500, `clamp(3.5rem, 10vw, 10.5rem)`, line-height 0.94, tracking -0.035em): Hero statements and the final CTA. One per section, at most.
- **Display 2** (Manrope 500, `clamp(2.5rem, 6.2vw, 6.25rem)`, line-height 0.94, tracking -0.035em): Section headings ("What's different.", "Who holds the bitcoin.").
- **Display 3** (Manrope 500, `clamp(1.75rem, 3vw, 3rem)`, line-height 0.94, tracking -0.035em): Sub-section / smaller display moments.
- **Lead** (Geist Sans 400, `clamp(1.125rem, 1.1vw + 0.6rem, 1.375rem)`, line-height 1.4): Standalone introductory paragraphs after a Display heading. Capped at 48-55ch.
- **Body** (Geist Sans 400, 1.0625rem, line-height 1.55 on light / 1.6 on dark): Pillar / column / accordion prose. Capped at 65ch.
- **Label** (Azeret Mono 400, 0.75rem, letter-spacing 0.1em, uppercase): Structural labels — footer column headers (WALLET / PROTOCOL / COMMUNITY), the footer copyright line, and pill-tag chips where they appear.
- **Button** (Azeret Mono 500, letter-spacing 0.06em, uppercase): The label face for every CTA, outline button, and the two label rows inside the App Store / Play Store badges. Sized by the consuming component, not by the utility.

### Named Rules

**The Specimen Scale Rule.** Display 1 is reserved for the page's apex moment: the opening hero (currently "A Cashu Wallet.", `siteConfig.description`). No element in the body of the page ever reaches that size. *Drift note: an earlier draft reserved a second Display-1 moment for a closing CTA ("Take it with you.") to bookend the hero. The shipped page has no separate closing-CTA section — the footer goes straight from utility links to the wordmark sign-off. Revisit this rule if a closing CTA section is added; until then, Display 1 is single-use.*

**The Wordmark Tier.** A single scale step exists above Display 1 — `type-wordmark` (`clamp(4rem, 18vw, 14rem)`, weight 600, tracking -0.05em). It is reserved for the footer brand sign-off (a viewport-spanning `CASHU.ME`) and never appears elsewhere. The Specimen Scale Rule is unchanged: Display 1 remains exclusive to the hero and closing CTA; the wordmark is a brand mark, not a heading, and operates outside that hierarchy.

**The Balanced Wrap Rule.** All headings carry `text-wrap: balance`. All long-form prose carries `text-wrap: pretty`. The page never ships a heading with an orphaned single word on the last line if the browser can prevent it.

**The Mono-as-Structure Rule.** Mono is structural, not decorative. It appears on `[N]` index marks, pill-tag chips, eyebrow labels, button labels, and the version stamp in the footer. It does NOT appear on body prose or headings. Decorative mono is costume.

**The Button-Label Rule.** Azeret Mono carries every button label on the page: the header CTA, the closing CTA, the mobile-drawer wallet link, and the App Store / Play Store badges. Tracking is `0.06em` (looser than `type-label`'s `0.1em` so labels feel tappable rather than read as eyebrows), at weight 500 versus the label rule's 400.

## 4. Elevation

Flat by default. The system does not use ambient shadows on surfaces, cards, or buttons. Depth is communicated by surface inversion (dark vs light section) and by 1px hairline rules, never by elevation.

The sole sanctioned exceptions are phones and banknote-style mockups: objects depicting physical things in the world. The hero device carries a deep ambient shadow against the inkwell because it is not a UI surface, it is an object. Used at most once per section.

> **Hero photograph (2026-07-11, deliberate).** The hero's three floating phone-screenshot mockups were replaced with a single photograph: a hand holding the phone, wallet balance on screen. Still inside the phones/objects exception above, just spent on one photographic subject instead of three abstracted screenshots. The signature hero cloud (`src/lib/clouds.ts`, `SECTION_CLOUDS.hero`) now tucks behind this photograph's lower-right edge rather than the old three-wide row.

### Named Rules

**The Flat-by-Default Rule.** Buttons, cards, inputs, sections, and chips are flat at rest. Shadows are reserved for objects depicting physical things (phones, banknote-style mockups). Never decorative, never on UI surfaces.

## 5. Components

### Buttons

Sharp rectangles (`border-radius: 0`). The editorial register prefers severity to softness; the absence of a curve signals broadsheet, not consumer app. Three roles, distinguished by surface treatment, not shape.

- **CTA (default fill)**: Inverse-surface fill. On dark sections: paper background, inkwell text. On light sections: inkwell background, paper text. Hover lightens to `foreground/90`. Used at most once per section for the primary action.
- **Outline**: Transparent fill, hairline border in `--border`, hover lifts border to `foreground/40` and tints background to `foreground/5`. Used adjacent to CTAs for secondary actions ("View source").
- **Ghost / Link**: Text-only affordances. Ghost picks up a subtle background tint on hover; Link underlines.

Touch target: 44px minimum height on every button (`h-11`). Padding varies by size.

**The Hero Badge Exception (retired, not currently shipped).** An earlier draft called for a single glass-pill badge above the hero headline, carrying the wordmark `cashu.me` as an eyebrow — the one sanctioned pill and one sanctioned glassmorphic moment on the page. `hero.tsx` does not implement this badge today. Treat it as retired rather than a gap to fill; if a glass badge is reintroduced later, update this note deliberately instead of resurrecting it to match old documentation.

### Chips

Tag chips are cosmetic enumerations, never state-bearing. They share the rectangular geometry of buttons by default; if a pill chip is needed to echo the hero badge, treat it as a deliberate one-off.

### Cards / Containers

The system avoids cards. Section bodies are not cards. Pillar items are not cards. They are vertical compositions separated by 1px hairline rules.

If a card-like container ever becomes necessary, it MUST be flat, hairline-bordered, and never nested.

### Inputs

No input components exist yet. When they arrive: stroke-only (hairline border), no fill, focus state inverts the stroke to Cashu Lilac.

### Navigation

Fixed header, 64px tall, transparent at top of page. Past 20px of scroll, gains a translucent backdrop-blur surface that adapts to the section currently sitting behind it (via `IntersectionObserver` watching `[data-theme]` sections). The brand lockup is a 24px monogram square next to the wordmark "cashu.me" in Manrope 500. Links are foreground/70%, hover full foreground. The right-aligned CTA pill is always present.

### Browser Chrome (signature component)

The wallet ships natively on iOS and Android, and also runs in any modern browser without install. The signature visual is a stylized desktop-browser chrome (`<BrowserChrome>`): three small dot controls on the left, a transparent URL bar reading `cashu.me`, and a hairline-bordered content area below. It represents the browser path honestly: the path that needs no app-store install, the path most visitors discovering the page from a desktop link will take first. Scoped to the wallet-showcase section; the hero is permitted to use platform-store badges for native install.

Used at most once on the page, with a single composed mock interior. Never repeated within a section.

### Store Badges

Official Apple "Download on the App Store" SVG and Google "Get it on Google Play" artwork, used verbatim from each platform's marketing-resources kit. Reserved for the hero, where they signal native install. Sized so both share a 48px (mobile) / 56px (desktop) baseline height, anchored on a shared baseline grid so the artwork inside each badge aligns optically. These are the one place where third-party brand assets are allowed to override the Bearer Specimen aesthetic: recognition is the conversion driver, the aesthetic concession is one-time and confined to the hero.

Do not recolor, restyle, or stretch the artwork. Do not place on top of imagery. Do not rotate.

### Specimen Blocks (not currently shipped)

An earlier draft called for pairing each "What's different" pillar with a small typographic exhibit (a wrapped serialization of blinded ecash, a stylized Lightning invoice fragment) instead of a photo. The shipped page (`feature-highlight.tsx`) uses real wallet screenshots instead. Treat specimen blocks as a design idea not yet built, not a current convention new work needs to match.

### Accordion

Native `<details>` / `<summary>`. Each item is separated by a 1px top hairline. A `+` icon on the right rotates 90° and collapses vertically into a `−` on open. No animated height; the open/close transition is purely the icon rotation. Body text appears below the summary at body size, capped at 65ch.

## 6. Do's and Don'ts

### Do

- **Do** keep Cashu Lilac at ≤5% of any screen. Its rarity is the point.
- **Do** invert surfaces between sections (dark → light → dark) the way a printed monograph alternates plates and text.
- **Do** use native `<details>` for accordions, `<a>` for buttons, `<section data-theme>` for theme scope. Lean on the platform.
- **Do** cap body lines at 65ch using `max-w-[65ch]`. Cap lead lines at 48–55ch.
- **Do** use `text-wrap: balance` on headings and `text-wrap: pretty` on prose.
- **Do** keep the navbar at exactly 64px and adapt its theme via `IntersectionObserver` on `[data-theme]` sections.

### Don't

- **Don't** use neon-on-black crypto colors. No electric green/blue/orange neon, no 3D rendered logos, no futurist UI. This is the dominant crypto-site reflex and the brand explicitly rejects it.
- **Don't** use consumer-fintech pastels, friendly mascots, or gradient illustrations à la Cash App / Venmo / Revolut. Reads as custodial app and undermines bearer positioning. *Sanctioned exception (Daylight Sky revision): the single page-wide sky gradient and its photographic cloud cutouts. The exception covers exactly that surface — no additional pastel fields, no illustrated/cartoon clouds, no further gradients.*
- **Don't** lean on bank navy + gold institutional gravitas. Wrong register entirely.
- **Don't** use Web3 / DeFi maximalism — glassmorphism, rainbow accents, dashboard-heavy charts, chart-driven hero treatments.
- **Don't** use card grids with icon + heading + subtitle templates. Sections are typographic compositions, not cards.
- **Don't** use em dashes (`—` or `--`) in user-facing copy. Use commas, colons, semicolons, periods, or parentheses.
- **Don't** use `background-clip: text` gradient text, decorative glassmorphism, or border-left side stripes.
- **Don't** use display fonts other than Manrope. No Switzer, no Satoshi, no Inter for display. Geist Sans is the body face; it does not appear on display or label runs. Azeret Mono is permitted only on labels and button labels, never on display or body.
- **Don't** use Cashu Lilac (`#b4a7f5`) for text on white. Switch to Cashu Lilac Deep (`#7a66e8`) when on Specimen Cream.
- **Don't** apply ambient shadows to flat surfaces. The only sanctioned exceptions are phones and banknote-style mockups (objects depicting physical things), used at most once per section.
- **Don't** ship a heading without `text-wrap: balance` or prose without `text-wrap: pretty`.
- **Don't** redefine tokens at the call site. New utilities go through the `@theme inline` block in `globals.css`.
- **Don't** claim "self-custodial" or "no custodian." Cashu is custodial: mints hold the underlying Bitcoin. The accurate framing is bearer ecash plus unconditional withdrawal to any Lightning address. Candor is the brand; overclaiming corrodes it.
