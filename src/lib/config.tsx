import type { ReactNode } from "react";

export const siteConfig = {
  name: "cashu.me",
  description: "Bearer cash for the web.",
  tagline:
    "Open-source ecash on the Cashu protocol. Mints custody the bitcoin. You hold blinded bearer tokens, redeemable to any Lightning address, anytime, without permission.",
  url: "https://cashu.me",
  cta: "Open wallet",
  keywords: [
    "Cashu",
    "ecash",
    "bitcoin",
    "lightning",
    "privacy",
    "wallet",
    "open source",
  ],
  links: {
    wallet: "https://wallet.cashu.me",
    spec: "https://github.com/cashubtc/nuts",
    repo: "https://github.com/cashubtc/cashu.me",
    docs: "https://docs.cashu.space",
    nostr: "https://primal.net/cashubtc",
    twitter: "https://x.com/CashuBTC",
    appStore: "https://apps.apple.com/app/idTODO",
    playStore: "https://play.google.com/store/apps/details?id=meTODO",
  },
  featureHighlight: [
    {
      title: "Bearer ecash, in your pocket.",
      description:
        "Tokens live on your device. No account, no login, no balance tied to your name. Lose the device, lose the cash — like the physical version.",
      imageSrc: "/images/iphone-placeholder.png",
      direction: "ltr" as const,
    },
    {
      title: "Pay anyone, with a tap.",
      description:
        "Generate a Cashu Request, share the QR, get paid. Payments arrive over Nostr in seconds. No invoice expiry, no settlement window.",
      imageSrc: "/images/iphone-placeholder.png",
      direction: "rtl" as const,
    },
    {
      title: "Your mints, your rules.",
      description:
        "Pick the mints you trust. Hold tokens from many at once. Swap between operators in a single Lightning hop, without asking.",
      imageSrc: "/images/iphone-placeholder.png",
      direction: "ltr" as const,
    },
  ],
  bento: [
    {
      title: "Custodial wallets see everything.",
      content:
        "Every send, every receive, every contact — tied to a single account in someone else's database. A change of policy is a change of access.",
      imageSrc: "/images/iphone-placeholder.png",
      imageAlt: "Cluttered wallet UI showing transaction history",
      fullWidth: true,
    },
    {
      title: "Cashu mints can't link your transactions.",
      content:
        "Blinded signatures mean the mint signs tokens it cannot tie to a holder. Bearer cash, restored on the internet.",
      imageSrc: "/images/iphone-placeholder.png",
      imageAlt: "Cashu wallet showing blinded token",
      fullWidth: false,
    },
    {
      title: "Open the wallet. Send. Done.",
      content:
        "No KYC. No account. No confirmation step. The whole experience is the four taps it takes to spend.",
      imageSrc: "/images/iphone-placeholder.png",
      imageAlt: "Cashu send flow",
      fullWidth: false,
    },
  ],
  faqs: [
    {
      question: "Is this custodial?",
      answer:
        "Yes. The mint holds the underlying bitcoin. What you hold is bearer tokens redeemable to any Lightning address at any time. The mint cannot freeze your withdrawal address, but it can go offline. Treat every mint the way you would treat a custodian.",
    },
    {
      question: "What if a mint disappears?",
      answer:
        "You lose the tokens minted there. The protocol does not solve this. Mitigate by choosing mints with known operators, holding small amounts per mint, and redeeming regularly to a Lightning wallet you control.",
    },
    {
      question: "How is this different from Wallet of Satoshi?",
      answer:
        "Wallet of Satoshi holds a balance in a database tied to your account and can rate-limit, suspend, or geofence you. A Cashu mint holds bitcoin but issues you blinded bearer tokens. You can swap to another mint, send tokens peer-to-peer, or withdraw to any Lightning address, without permission.",
    },
    {
      question: "Can I back it up?",
      answer:
        "Yes. cashu.me exports your tokens and mint settings as an encrypted backup. Restore by importing on any device. Tokens are bearer instruments: possession of the backup means possession of the funds. Store accordingly.",
    },
    {
      question: "Where can I read the protocol?",
      answer:
        "The spec lives at github.com/cashubtc/nuts. It is a set of NUTs (Notation, Usage, Terminology) that any mint or wallet implements. cashu.me is one wallet among many possible.",
    },
  ] as { question: string; answer: ReactNode }[],
  footer: {
    tagline: "Bearer cash for the web.",
    attribution: "Open source under MIT. Long live free money.",
  },
};

export type SiteConfig = typeof siteConfig;
