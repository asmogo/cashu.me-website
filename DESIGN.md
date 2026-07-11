---
name: cashu.me
description: Bearer cash for the web — an open-source ecash wallet marketing site.
colors:
  sky-top: "#c9e2f5"
  sky-bottom: "#dcedf9"
  sky-mid: "#cfe5f7"
  ink: "#14181f"
  cashu-lilac-cta: "#5b46d4"
  scan: "#16a34a"
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
    letterSpacing: "-0.03em"
  lead:
    fontFamily: "Geist Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.3vw + 0.7rem, 1.625rem)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.008em"
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
  button:
    fontFamily: "Azeret Mono, ui-monospace, Menlo, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    letterSpacing: "0.06em"
rounded:
  none: "0"
  md: "8px"
  pill: "9999px"
spacing:
  gutter-sm: "1.5rem"
  gutter-md: "2.5rem"
  section-y-tight: "clamp(4rem, 8vw, 6rem)"
  section-y-base: "clamp(6rem, 12vw, 10rem)"
  section-y-wide: "clamp(8rem, 16vw, 14rem)"
  container-max: "1200px"
components:
  button-primary:
    backgroundColor: "{colors.sky-mid}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    typography: "{typography.button}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    typography: "{typography.button}"
  nav-pill:
    backgroundColor: "{colors.sky-mid}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  bento-card:
    backgroundColor: "{colors.sky-mid}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "32px 32px 0"
  chip:
    backgroundColor: "{colors.sky-mid}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "4px 8px"
    typography: "{typography.label}"
---

# Design System: cashu.me

## 1. Overview

**Creative North Star: "The Bearer Specimen"**

cashu.me is a specimen page for a piece of digital cash. Type is the artifact. The page reads like a museum caption: dispassionate, precise, large, asking the viewer to look without selling them anything. The visitor moves down the page the way you move down a printed broadsheet, not the way you scroll a feed.

The surface is a single continuous daylight sky: a near-flat blue gradient (`sky-top` → `sky-bottom`, deeper at the top of the page, palest behind the FAQ/footer) with a small library of photographic cloud cutouts instanced at small sizes as ambient decoration. Interactive surfaces — buttons, the nav, a handful of named illustration and card elements — carry a soft frosted-glass material: translucent, blurred, hairline-bordered. Everything else stays flat: type on sky, hairline rules, no ambient shadows. The specimen posture holds throughout: ink on sky, glass reserved for things you touch.

The aesthetic is editorial and committed, not enterprise. Restraint is the voice: generous whitespace, oversize display, mono labels for structural chrome. The single chromatic note is a soft lilac reserved for emphasis. The page rejects the dominant crypto-site reflexes: no neon-on-black, no chart-heavy dashboards, no consumer-fintech pastels, no bank navy-and-gold. Its one material departure from a flat, glassmorphism-free web is the frosted-glass recipe below, which is scoped to four named surfaces, not applied ambiently.

**Key Characteristics:**

- Editorial scale (hero up to ~10.5rem at large viewports), tight tracking (`-0.035em` in mixed case), short leading (1 on Display 1).
- One continuous daylight-sky surface page-wide; clouds are photographic cutouts, small, ambient, never the subject.
- Lilac accent used sparingly: CTA hover, link underlines, `::selection`. Never large fields.
- One shared frosted-glass recipe (§5 Buttons), reused verbatim on buttons, the nav pill, custody-comparison's checkpoint/chips, and the bento cards — four named surfaces, one recipe, not four inventions.
- Native `<details>` accordion, native `<a>` rectangular buttons. No bespoke widgets where the platform suffices.
- Phone placeholders maintain device proportions (9:19.5); no skeuomorphic chrome.

**Retired ideas, not gaps to fill:** an earlier draft called for `[N]` bracketed index marks as protocol-citation eyebrows on every enumerating section, and a separate single glass-pill badge above the hero headline carrying the wordmark as an eyebrow. Neither shipped, and neither should be resurrected — see The No-Eyebrows Rule (§3) and Navigation (§5) for what actually ships in their place.

## 2. Colors

A single sky surface anchored by ink type and one chromatic accent. The palette is dispassionate; the lilac and the frosted-glass fills are the only places voice enters.

### The Sky Surface

- **Sky Top** (`#c9e2f5`) → **Sky Bottom** (`#dcedf9`): the page background is one near-flat vertical gradient across the whole document, deeper at the top (zenith) and palest at the bottom (horizon, behind the dense FAQ/footer). No photographic backdrop, no tiling imagery: the sky surface is a flat color field; the photography lives only in the small cloud cutouts.
- **Sky Mid** (`#cfe5f7`): the `--background` token — the fill color inside every frosted-glass surface (at partial opacity plus blur), and anywhere a single solid surface color is needed.
- **Ink** (`oklch(16% 0.015 260)` ≈ `#14181f`): foreground type on sky. 15.9:1 on Sky Bottom, 14.8:1 on Sky Top (AAA).
- Muted text: `oklch(42% 0.03 255)` ≥6.5:1 on sky (AA+). Hairlines/borders: `oklch(78% 0.035 240)`.

**The Ambient Sky Rule.** The sky is ambient, not the subject. Clouds are photographic cutouts (never cartoon/illustrated shapes) — a 7-shape library sourced *only* from Resource Boy's cloud textures (`/public/images/clouds`, placements in `src/lib/clouds.ts`; served `unoptimized` — next/image's AVIF/WebP re-encoding visibly destroys soft alpha edges at these sizes, the same reason the logo is served `unoptimized` too, see §5 Navigation). Sized larger on desktop (~80–380px) than on the small mobile subset (~50–200px, via each placement's `mobileWidth`). At most ~3 clouds visible per viewport-height; they live in gutters, beside headings, and at section seams — never behind running text or interactive targets; always `aria-hidden` + `pointer-events: none`. Motion is a single global scroll-progress value driving transform-only X drift and Y parallax; reduced-motion renders them static at their resting position (never removes them); below `md` only a small flagged subset renders, without drift. If a section reads "cloudy," the rule is broken.

### Primary

- **Cashu Lilac CTA** (`#5b46d4`): the accent for small text and interactive emphasis on the sky surface — ≥4.5:1 (AA) against both gradient ends.
- **Cashu Lilac Deep** (`#7a66e8`): 3.45:1 on sky — display-scale/graphic use only (≥24px), never small text on sky.
- **Cashu Lilac** (`#b4a7f5`): the dark-surface voice; dormant with the inkwell set. Reserved for link underlines, CTA hover, and `::selection` on dark. Never used as a large color field.

### Neutral

- **Inkwell** (`#0a0a0a`): dormant dark-theme background, kept for a future toggle.
- **Specimen Cream** (`#ffffff`) / **Paper** (`#fafafa`) / **Ash Light** (`#8a8a93`) / **Ash Dark** (`#6b6b73`) / **Rule Dark** (`#1f1f22`) / **Rule Light** (`#e5e5e5`): dormant dark-theme neutrals, kept for documentation reference alongside the token architecture.

### Named Rules

**The One Voice Rule.** Cashu Lilac is the sole chromatic note in the system. It appears on no more than ~5% of any given screen. Its rarity is the point.

**The Scan Color Exemption.** The `--scan` token (`#16a34a` on light / `#86efac` on dark) is the sole sanctioned non-lilac chromatic, scoped to `custody-comparison.tsx` where it carries the surveillance metaphor (the custodian lane "sees" a green packet; the mint lane blurs it). It must not appear elsewhere on the page.

**The No-Pure-Black, No-Pure-White Rule.** Every surface and neutral tints toward a hue. The reference hue for neutrals is the sky's (~240–260): ink is `oklch(16% 0.015 260)`, muted/borders sit at hue 240–255. The dormant dark set keeps its lilac-tinted values (`oklch(13% 0.003 280)` etc.).

## 3. Typography

**Display Font:** Manrope (Google Fonts, self-hosted at build time via `next/font/google`, weights 500/600). Fallback: `ui-sans-serif, system-ui, -apple-system`.
**Body Font:** Geist Sans (loaded via `geist/font/sans`). Distinct from the display face; weight and size still do the hierarchy work within it.
**Label/Mono Font:** Azeret Mono (loaded via `next/font/google`). Fallback: `ui-monospace, Menlo, monospace`.

**Character:** Manrope is a geometric sans with a clean, slightly rounded grotesque structure — legible and current without tipping into a technical or novelty register. It carries the editorial / specimen voice at large sizes through scale and tight tracking rather than an unusual letterform. Geist Sans carries body copy for its neutrality and readability at small sizes. Azeret Mono carries the protocol register without competing with either.

### Hierarchy

- **Display 1** (Manrope 500, `clamp(3.5rem, 10vw, 10.5rem)`, line-height 1, tracking -0.035em): Hero statements. One per page. The hero `<h1>` runs uppercase with loosened tracking (`-0.01em`) — a one-off override at that call site, not a change to the shared tier; if Display 1 is ever used elsewhere it stays mixed-case at the tighter tracking.
- **Display 2** (Manrope 500, `clamp(2.5rem, 6.2vw, 6.25rem)`, line-height 1, tracking -0.035em): Section headings ("What's different.", "Who holds the bitcoin.").
- **Display 3** (Manrope 500, `clamp(1.75rem, 3vw, 3rem)`, line-height 1, tracking -0.03em): Sub-section / smaller display moments, including bento card titles.
- **Lead** (Geist Sans 400, `clamp(1.25rem, 1.3vw + 0.7rem, 1.625rem)`, line-height 1.5, tracking -0.008em): Standalone introductory paragraphs after a Display heading. Capped at 48-55ch.
- **Body** (Geist Sans 400, 1.0625rem, line-height 1.55 on light / 1.6 on dark): Pillar / column / accordion prose. Capped at 65ch.
- **Label** (Azeret Mono 400, 0.75rem, letter-spacing 0.1em, uppercase): Structural labels — footer column headers (WALLET / PROTOCOL / COMMUNITY), the footer copyright line, and chip/badge text.
- **Button** (Azeret Mono 500, letter-spacing 0.06em, uppercase): The label face for every CTA, outline button, and the two label rows inside the App Store / Play Store / Browser badges. Sized by the consuming component, not by the utility.

### Named Rules

**The Specimen Scale Rule.** Display 1 is reserved for the page's apex moment: the opening hero (currently "A Cashu Wallet.", `siteConfig.description`). No element in the body of the page ever reaches that size.

**The Wordmark Tier.** A single scale step exists above Display 1 — `type-wordmark` (`clamp(4rem, 18vw, 14rem)`, weight 600, tracking -0.05em). It is reserved for the footer brand sign-off (a viewport-spanning `CASHU.ME`) and never appears elsewhere; it's a brand mark, not a heading, and operates outside the Display hierarchy.

**The Balanced Wrap Rule.** All headings carry `text-wrap: balance`. All long-form prose carries `text-wrap: pretty`. The page never ships a heading with an orphaned single word on the last line if the browser can prevent it.

**The Mono-as-Structure Rule.** Mono is structural, not decorative. It appears on chip labels, eyebrow labels, button labels, and the version stamp in the footer. It does NOT appear on body prose or headings. Decorative mono is costume.

**The Button-Label Rule.** Azeret Mono carries every button label on the page: the header CTA, the mobile-drawer wallet link, and the App Store / Play Store / Browser badges. Tracking is `0.06em` (looser than `type-label`'s `0.1em` so labels feel tappable rather than read as eyebrows), at weight 500 versus the label rule's 400.

**The No-Eyebrows Rule.** No `[N]` bracketed index marks, and no tiny uppercase tracked kicker above every section. `Section.tsx` supports an `index` prop for exactly this pattern; no live section passes one. This is a settled preference, not an oversight — do not add index marks or eyebrows to "finish" a section that doesn't have one.

## 4. Elevation

Two elevation languages coexist deliberately: flat-by-default for structural surfaces, and one shared frosted-glass recipe for interactive/illustrative ones.

**Flat surfaces**: sections, prose, hairline rules — no shadow, no blur. Depth comes from surface inversion (dark vs light section, where used) and 1px hairline rules, never from ambient shadow.

**Glass surfaces**: buttons, the nav pill, custody-comparison's checkpoint band and chips, and the bento cards. See §5 Buttons for the exact recipe. This is the one sanctioned elevation exception beyond physical-object mockups.

**Physical-object surfaces**: the hero photograph (a hand holding the phone) carries a deep ambient shadow because it depicts a physical object, not a UI surface. Used at most once per section.

### Named Rules

**The Flat-by-Default Rule.** Sections, prose, and hairline rules are flat at rest. Shadows are reserved for the frosted-glass recipe (interactive/illustrative surfaces) and for physical-object depictions (phones, banknote-style mockups). Never decorative elsewhere.

## 5. Components

### Buttons

Buttons carry a soft, slightly-rounded (`rounded-lg`, 8px) frosted-glass surface: translucent `background/55` fill, `backdrop-blur-lg` (16px), a soft white hairline border (`border-white/50`), an inset top highlight plus a diffuse sky-blue-tinted drop shadow (`shadow-[inset_0_1px_0_0_rgba(255,255,255,0.55),0_8px_24px_-12px_rgba(30,64,120,0.28)]`), `--foreground` text. Hover deepens the fill (`background/75`) and brightens the border (`white/70`). Three roles, distinguished by surface treatment, not shape:

- **CTA (primary)**: The frosted-glass treatment above. Used at most once per section for the primary action (header nav CTA, mobile drawer CTA).
- **Outline**: Transparent fill, hairline border in `--border`, hover lifts border to `foreground/40` and tints background to `foreground/5`. Used adjacent to CTAs for secondary actions ("View source").
- **Ghost / Link**: Text-only affordances. Ghost picks up a subtle background tint on hover; Link underlines.

Touch target: 44px minimum height on every button (`h-11`); the App Store / APK / Browser badges run taller at `h-16` since they carry a two-line label. Padding varies by size.

This is the site's one shared glass recipe — reused verbatim, not reinvented per surface, by:
- The header nav pill (see Navigation).
- Custody-comparison's checkpoint band and chips (see Chips).
- The three bento cards (see Cards / Containers).

### Chips

Tag chips are cosmetic enumerations, never state-bearing. The custody-comparison checkpoint band and its field chips (`ID 0x…`, `TO @alice`, amount, timestamp, and the `VALID` chip) carry the full button frosted-glass recipe (`rounded-lg`, `border-white/50`, `bg-background/55`, `backdrop-blur-lg`, inset+drop shadow) rather than a flat hairline box — the illustration's "boxes" read as the same physical material as the rest of the UI's glass surfaces. The `--scan` green tint (Scan Color Exemption) layers on top of this recipe on the `VALID` chip only; the glass treatment is container styling, not a color-system change. This chip-glass treatment is scoped to custody-comparison — it is not a general chip pattern.

### Cards / Containers

The system otherwise avoids cards: section bodies are not cards, pillar items are not cards, they're vertical compositions separated by 1px hairline rules. The one card-like container the system does use is the bento grid's three cards (`bento.tsx`), which carry the same frosted-glass recipe as buttons/nav/chips (`rounded-lg`, `border-white/50`, `bg-background/55`, `backdrop-blur-lg`, inset+drop shadow). Any new card-like container beyond the bento grid must be flat, hairline-bordered, and never nested — the glass treatment does not extend past this one named exception.

### Inputs

No input components exist yet. When they arrive: stroke-only (hairline border), no fill, focus state inverts the stroke to Cashu Lilac.

### Navigation

The header is a floating, `rounded-full` glass capsule, not an edge-to-edge bar: inset from the top and sides (`top-4`, capped at `max-w-5xl`, centered), carrying the frosted-glass recipe from Buttons above. It's present from first paint — not scroll-gated — and past 20px of scroll it intensifies slightly (`background/55`→`/75`, border `white/50`→`/70`), reusing the button's own hover tokens rather than inventing new ones. The brand lockup is a 28px monogram square (the transparent pixel-art Cashu mark, served `unoptimized` via next/image — see The Ambient Sky Rule) next to the wordmark "cashu.me" in Manrope 500, uppercase, tracking `0.14em`. Links are foreground/70%, hover full foreground. The right-aligned CTA sits inside the nav pill at all times; below `lg` it collapses to a `MobileDrawer` trigger.

### Browser Chrome (signature component)

The wallet ships natively on iOS and Android, and also runs in any modern browser without install. The signature visual is a stylized desktop-browser chrome (`<BrowserChrome>`): three small dot controls on the left, a transparent URL bar reading `cashu.me`, and a hairline-bordered content area below. It represents the browser path honestly: the path that needs no app-store install, the path most visitors discovering the page from a desktop link will take first. Scoped to the wallet-showcase section; the hero is permitted to use platform-store badges for native install.

Used at most once on the page, with a single composed mock interior. Never repeated within a section.

### Store Badges

Custom icon + two-line-label chips (`<AppStoreBadge>`, `<ApkBadge>`, `<BrowserBadge>`) rather than official platform artwork. Reserved for the hero, where they signal native install (plus the in-browser path). Same frosted-glass recipe as the button system (see Buttons above), sized at `h-16` with a `size-8` icon and an 18px label for a bigger, easier tap target than a standard button. Hover brightens the border, deepens the fill, and nudges the badge up (`-translate-y-0.5`).

### Accordion

Native `<details>` / `<summary>`. Each item is separated by a 1px top hairline. A `+` icon on the right rotates 90° and collapses vertically into a `−` on open. No animated height; the open/close transition is purely the icon rotation. Body text appears below the summary at body size, capped at 65ch.

## 6. Do's and Don'ts

### Do

- **Do** keep Cashu Lilac at ≤5% of any screen. Its rarity is the point.
- **Do** keep the frosted-glass recipe to its four named surfaces (buttons, nav pill, custody-comparison chips, bento cards) — one recipe, reused verbatim, not reinvented per component.
- **Do** use native `<details>` for accordions, `<a>` for buttons, `<section data-theme>` for theme scope. Lean on the platform.
- **Do** cap body lines at 65ch using `max-w-[65ch]`. Cap lead lines at 48–55ch.
- **Do** use `text-wrap: balance` on headings and `text-wrap: pretty` on prose.
- **Do** keep the navbar a floating glass pill (see §5 Navigation) inset from the viewport edges, not an edge-to-edge bar.
- **Do** serve any transparent pixel-art or soft-alpha PNG (logo, clouds) via next/image with `unoptimized` — its optimizer flattens alpha to black otherwise.

### Don't

- **Don't** use neon-on-black crypto colors. No electric green/blue/orange neon, no 3D rendered logos, no futurist UI.
- **Don't** use consumer-fintech pastels, friendly mascots, or gradient illustrations à la Cash App / Venmo / Revolut. The single page-wide sky gradient and its photographic cloud cutouts are the one sanctioned pastel-field exception — no additional pastel fields, no illustrated/cartoon clouds, no further gradients.
- **Don't** lean on bank navy + gold institutional gravitas. Wrong register entirely.
- **Don't** use Web3 / DeFi maximalism: rainbow accents, dashboard-heavy charts, chart-driven hero treatments, or glass used decoratively/everywhere. The one shared frosted-glass recipe on its four named surfaces is the scoped exception, not license for ambient glass.
- **Don't** use card grids with icon + heading + subtitle templates. Sections are typographic compositions, not cards; the bento grid is the one named exception.
- **Don't** use em dashes (`—` or `--`) in user-facing copy. Use commas, colons, semicolons, periods, or parentheses.
- **Don't** use `background-clip: text` gradient text or border-left side stripes.
- **Don't** use display fonts other than Manrope. No Switzer, no Satoshi, no Inter for display. Geist Sans is the body face; it does not appear on display or label runs. Azeret Mono is permitted only on labels and button labels, never on display or body.
- **Don't** use Cashu Lilac (`#b4a7f5`) for text on white. Switch to Cashu Lilac Deep (`#7a66e8`) when on Specimen Cream.
- **Don't** apply ambient shadows to flat surfaces. The only sanctioned exceptions are the frosted-glass recipe and physical-object mockups (phones, banknote-style), used at most once per section for the latter.
- **Don't** ship a heading without `text-wrap: balance` or prose without `text-wrap: pretty`.
- **Don't** redefine tokens at the call site. New utilities go through the `@theme inline` block in `globals.css`.
- **Don't** add `[N]` index marks or a tiny uppercase kicker above a section to "finish" it. See The No-Eyebrows Rule (§3) — their absence is deliberate.
- **Don't** claim "self-custodial" or "no custodian." Cashu is custodial: mints hold the underlying bitcoin. The accurate framing is bearer ecash plus unconditional withdrawal to any Lightning address. Candor is the brand; overclaiming corrodes it.
