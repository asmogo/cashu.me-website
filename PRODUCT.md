# Product

## Register

brand

## Users

**Primary**: Bitcoiners discovering ecash. They already use Bitcoin and Lightning. They know what custody means, what a Lightning channel is, what a bearer instrument is. They've used a custodial Lightning wallet (Wallet of Satoshi, Strike) and felt the lock-in tradeoff: you can deposit easily but the operator can freeze your account or rate-limit your withdrawal. They've heard of Cashu from a podcast, a Bitcoin meetup, or Nostr.

**Context on arrival**: Referral click from a friend, a tweet, or a podcast show-notes link. They're evaluating whether to spend 15 minutes installing and trying the wallet.

**Job to be done**: Get the right mental model (custodial backing, bearer ecash, mint-agnostic, Lightning-native, no accounts, withdraw anytime) fast enough to decide *yes, I'll try this* before the tab gets closed.

## Product Purpose

cashu.me is the first Cashu ecash wallet, now native on iPhone and Android and also running in any browser with no install. The site exists to promote the app: give a Bitcoin-literate visitor a credible, fast answer to "what does cashu.me give me, and should I install it?"

Success: a visitor leaves with the right mental model, bearer ecash on their device with unconditional exit to any Lightning address, and installs the wallet. Failure: they leave thinking they're locked in the way Wallet of Satoshi locks them in, or that the mint can freeze them specifically.

## Brand Personality

**bearer · terminal · assured**

- **bearer** — physical-money instinct. The wallet holds the value. Possession is settlement. Voice favors active verbs (hold, send, redeem) over abstract finance language (balance, transaction, account).
- **terminal** — protocol-first, code-first. Mono is structural, not decorative. Eyebrows and tags use technical numbering (`[001]`, `[N]`). No pop-culture references, no marketing humor.
- **assured** — quiet authority. The site doesn't sell, it demonstrates. Short declarative sentences. No "introducing", no "revolutionary".

## Anti-references

What cashu.me must NOT look or feel like:

1. **Neon-on-black crypto aesthetic** — electric neon on pitch black, 3D rendered logos, futurist UI. The training-data crypto reflex. Reads as memecoin or DeFi project, not as bearer cash.
2. **Consumer-fintech pastels** — Cash App, Venmo, Revolut. Soft pastels, friendly illustrations, gradient mascots. Reads as custodial app, undermines the bearer positioning.
3. **Bank navy + gold institutional gravitas** — exactly the financial architecture Cashu is designed to route around. Wrong register entirely.
4. **Web3 / DeFi maximalism** — dashboard-heavy charts, rainbow accents, chart-driven hero treatments, or glass used decoratively/everywhere. Reads as speculation platform, not currency. (DESIGN.md's one shared frosted-glass recipe, scoped to four named surfaces — buttons, nav, custody-comparison chips, bento cards — is a deliberate, restrained exception, not a reversal of this.)

## Design Principles

1. **Show, don't sell.** No "introducing" language, no "revolutionary" claims, no marketing superlatives. State properties plainly. The reader does the convincing.
2. **Product-first, protocol-second.** "cashu.me" is the wallet; "Cashu" is the protocol it implements. The homepage promotes the wallet. The protocol is named where it adds credibility (FAQ, footer, technical specimen blocks), not as the framing for what the site is about. The chronology claim — the first Cashu wallet shipped — is the wallet's primary authority.
3. **Restraint is the voice.** Type and structure carry the page. When imagery enters, prefer one decisive moment over many decorative ones. The absence of imagery is not laziness, it is voice.
4. **Editorial, not enterprise.** Section rhythm follows altitude.xyz / Klim-style specimen pages: big display, generous whitespace, asymmetric grids. Never centered card grids with icon-title-subtitle templates.
5. **Bitcoin-literacy assumed.** "Lightning Network", "BTC", "bearer instrument", "custodial" are not jargon to define. The audience already knows them. This shortens copy and signals respect.
6. **Honest about custody, free to leave.** Cashu is custodial: mints hold the underlying Bitcoin. The site says so plainly. The value proposition is not "no custodian" (false), it's "you hold bearer ecash that withdraws to any Lightning address whenever you want, no permission, no notice." Candor about backing is more convincing than overclaiming.

## Accessibility & Inclusion

- **WCAG 2.2 AA** for contrast, keyboard navigation, focus indicators.
- **`prefers-reduced-motion`** respected: scroll-driven and entrance animations gracefully degrade to static states.
- **Lilac accent** uses two tokens: `#B4A7F5` on dark surfaces (passes AA against `#0A0A0A`); `#7A66E8` on light surfaces. The lighter shade is reserved for non-text decoration on white because it fails AA against `#FFFFFF` for text use.
- **Custodial-honesty rule**: copy must never claim "self-custodial" or "no custodian." Cashu is custodial; the right framing is bearer ecash plus unconditional exit. See Design Principle #6.
- **Zoom**: layout survives 200% zoom without horizontal scroll.
- **Text-wrap**: `balance` on headings, `pretty` on body for legibility under reflow.
