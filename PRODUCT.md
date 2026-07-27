# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary**: Bitcoiners discovering ecash. They already use Bitcoin and Lightning. They know what custody means, what a Lightning channel is, what a bearer instrument is. They've used a custodial Lightning wallet (Wallet of Satoshi, Strike) and felt the lock-in tradeoff: you can deposit easily but the operator can freeze your account or rate-limit your withdrawal. They've heard of Cashu from a podcast, a Bitcoin meetup, or Nostr.

**Context on arrival**: Referral click from a friend, a tweet, or a podcast show-notes link. They're evaluating whether to spend 15 minutes installing and trying the wallet.

**Job to be done**: Get the right mental model (custodial backing, bearer ecash, mint-agnostic, Lightning-native, no accounts, withdraw anytime) fast enough to decide *yes, I'll try this* before the tab gets closed.

## Product Purpose

cashu.me is the first Cashu ecash wallet, now native on iPhone and Android and also running in any browser with no install. The site exists to promote the app: give a Bitcoin-literate visitor a credible, fast answer to "what does cashu.me give me, and should I install it?"

Success: a visitor leaves with the right mental model, bearer ecash on their device with unconditional exit to any Lightning address, and installs the wallet. Failure: they leave thinking they're locked in the way Wallet of Satoshi locks them in, or that the mint can freeze them specifically.

## Positioning

**cashu.me shipped first.** It is the original Cashu wallet, and no neighboring wallet can truthfully claim the same chronology. That is the durable claim: not "the best" or "the most private," which any competitor may assert, but "the first," which is a matter of record.

The mechanism sits underneath the chronology as support, not as the lead: blinded bearer ecash that redeems to any Lightning address without permission, across mints, with no account. See Product Principle 2 for how this orders the copy.

## Operating Context

The site is a single-page marketing surface, statically rendered, with no accounts, no data collection, and no backend. It is not the product; the wallet is. Every path off the page is an install or an open: TestFlight (iOS beta), Zapstore (Android beta), or `wallet.cashu.me` (browser, no install).

Visitors arrive cold from a link, usually on a phone, often on a mobile connection, and decide in well under a minute. The page has to carry its whole argument before they leave. Both native builds are in public beta ahead of any App Store or Google Play listing, so the install path is inherently one step stranger than a store link, and the page must not pretend otherwise.

## Capabilities and Constraints

- The wallet is **custodial at the mint**: mints hold the underlying bitcoin. The wallet holds blinded bearer ecash that redeems to any Lightning address at any time without permission. Both halves of that sentence are load-bearing.
- **Mint-agnostic**: balances live across multiple mints, and ecash can be swapped between them.
- **No accounts**: no login, no server-side balance, no identity attached to a holding.
- **Backups**: a 12-word BIP39 seed (the proven path), an encrypted mint/settings export, and an experimental iCloud sync that is explicitly not yet trustworthy on its own.
- **Transports**: ecash is text, so it moves over iMessage, SMS, Bluetooth, any chat, or NFC tap-to-pay. Peer-to-peer sends never touch the mint.
- **Distribution**: iOS via TestFlight, Android via Zapstore, browser at `wallet.cashu.me`. No App Store or Play Store listing yet.
- Open source, MIT licensed, implementing the Cashu NUTs spec.

## Brand Commitments

**Voice: bearer · terminal · assured**

- **bearer** — physical-money instinct. The wallet holds the value. Possession is settlement. Voice favors active verbs (hold, send, redeem) over abstract finance language (balance, transaction, account).
- **terminal** — protocol-first, code-first. Mono is structural, not decorative. No pop-culture references, no marketing humor.
- **assured** — quiet authority. The site doesn't sell, it demonstrates. Short declarative sentences. No "introducing", no "revolutionary".

**Binding anti-references.** What cashu.me must not look or feel like (the visual enforcement of these lives in DESIGN.md §6; they are recorded here because they are brand constraints, not style preferences):

1. **Neon-on-black crypto aesthetic** — electric neon on pitch black, 3D rendered logos, futurist UI. The training-data crypto reflex. Reads as memecoin or DeFi project, not as bearer cash.
2. **Consumer-fintech pastels** — Cash App, Venmo, Revolut. Soft pastels, friendly illustrations, gradient mascots. Reads as custodial app, undermines the bearer positioning.
3. **Bank navy + gold institutional gravitas** — exactly the financial architecture Cashu is designed to route around. Wrong register entirely.
4. **Web3 / DeFi maximalism** — dashboard-heavy charts, rainbow accents, chart-driven hero treatments, or glass used decoratively/everywhere. Reads as speculation platform, not currency. (DESIGN.md's one shared frosted-glass recipe, scoped to four named surfaces — buttons, nav, custody-comparison chips, bento cards — is a deliberate, restrained exception, not a reversal of this.)

## Evidence on Hand

Everything the site may currently claim is in this repository or is a matter of public record:

- **Product demonstrations**: real screen recordings and screenshots of the shipped wallet — tap-to-pay over NFC, seed-phrase backup and restore, an iMessage thread carrying a token, a Lightning-address QR sheet, the balance and activity view. These are the proof; the site's argument rests on showing the thing working.
- **Live install paths**: the TestFlight invite, the Zapstore listing, and `wallet.cashu.me`. All three resolve.
- **Open source**: MIT-licensed, public repository, implementing the public Cashu NUTs specification. Verifiable by anyone.
- **The chronology claim**: cashu.me shipped as the first Cashu wallet. This is checkable against the protocol's public history.

**Absences that must never be filled with invention.** There are no user counts, download figures, retention numbers, mint partnerships, named customers, testimonials, funding claims, press quotes, or third-party endorsements on hand. Future copy must not manufacture any of them, and must not imply scale it cannot source. If real numbers or coverage appear later, add them here first, with a source, before any page cites them.

## Product Principles

1. **Show, don't sell.** No "introducing" language, no "revolutionary" claims, no marketing superlatives. State properties plainly. The reader does the convincing.
2. **Product-first, protocol-second.** "cashu.me" is the wallet; "Cashu" is the protocol it implements. The homepage promotes the wallet. The protocol is named where it adds credibility (FAQ, footer, technical specimen blocks), not as the framing for what the site is about. The chronology claim — the first Cashu wallet shipped — is the wallet's primary authority.
3. **Bitcoin-literacy assumed.** "Lightning Network", "BTC", "bearer instrument", "custodial" are not jargon to define. The audience already knows them. This shortens copy and signals respect.
4. **Honest about custody, free to leave.** Cashu is custodial: mints hold the underlying Bitcoin. The site says so plainly. The value proposition is not "no custodian" (false), it's "you hold bearer ecash that withdraws to any Lightning address whenever you want, no permission, no notice." Candor about backing is more convincing than overclaiming.
5. **Restraint is the voice.** Type and structure carry the page. When imagery enters, prefer one decisive moment over many decorative ones. The absence of imagery is not laziness, it is voice.

## Accessibility & Inclusion

- **WCAG 2.2 AA** for contrast, keyboard navigation, focus indicators.
- **`prefers-reduced-motion`** respected: scroll-driven and entrance animations gracefully degrade to static states.
- **Lilac accent** uses two tokens: `#B4A7F5` on dark surfaces (passes AA against `#0A0A0A`); `#7A66E8` on light surfaces. The lighter shade is reserved for non-text decoration on white because it fails AA against `#FFFFFF` for text use.
- **Custodial-honesty rule**: copy must never claim "self-custodial" or "no custodian." Cashu is custodial; the right framing is bearer ecash plus unconditional exit. See Product Principle 4.
- **Zoom**: layout survives 200% zoom without horizontal scroll.
- **Text-wrap**: `balance` on headings, `pretty` on body for legibility under reflow.
