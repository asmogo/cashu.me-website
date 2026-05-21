import type { ReactNode } from "react";

const links = {
  wallet: "https://wallet.cashu.me",
  spec: "https://github.com/cashubtc/nuts",
  repo: "https://github.com/cashubtc/cashu.me",
  docs: "https://docs.cashu.space",
  nostr: "https://primal.net/cashubtc",
  twitter: "https://x.com/CashuBTC",
  appStore: "https://apps.apple.com/app/idTODO",
  playStore: "https://play.google.com/store/apps/details?id=meTODO",
};

export const siteConfig = {
  name: "cashu.me",
  description: "The native Cashu wallet.",
  tagline:
    "cashu.me is the first ecash wallet, now native on iPhone and Android and runs in any browser. Hold bearer ecash on your device, send with a tap, redeem to any Lightning address. No account.",
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
  links,
  featureHighlight: [
    {
      title: "Bearer ecash, in your pocket.",
      description:
        "Your ecash lives on your device. No account, no login, no balance tied to your name.",
      imageSrc: "/images/iphone-placeholder.png",
      direction: "ltr" as const,
    },
    {
      title: "Tap to pay.",
      description:
        "Hold your phone near the terminal. Payment clears over Nostr in seconds. No card network, no settlement window.",
      imageSrc: "/images/screen-tap-to-pay.png",
      direction: "rtl" as const,
    },
    {
      title: "Lose the phone, keep the cash.",
      description:
        "Twelve words back up your whole wallet, the same way Bitcoin does. Restore on any device, any time. Your ecash isn't tied to hardware — it's tied to words.",
      imageSrc: "/images/iphone-placeholder.png",
      direction: "ltr" as const,
    },
  ],
  bento: [
    {
      id: "custody-comparison",
      title: "Custodial wallets see everything.",
      content:
        "Every send, every receive, every contact, tied to a single account in someone else's database. A change of policy is a change of access.",
      imageSrc: "/images/iphone-placeholder.png",
      imageAlt: "Cluttered wallet UI showing transaction history",
      fullWidth: true,
    },
    {
      id: "imessage-chat",
      title: "iMessage, SMS, Bluetooth, your group chat.",
      content:
        "Ecash is just text. Anywhere you can paste a string — a chat, an SMS, a Bluetooth share — you can send money. No app to install on their end.",
      imageSrc: "/images/screen-imessage.png",
      imageAlt: "iMessage chat where a long cashu token is sent in reply to '$5 for lunch'",
      fullWidth: false,
    },
    {
      title: "On-chain, BOLT12, lightning address.",
      content:
        "Hand out a Bitcoin address, a BOLT12 offer, or a lightning address — receive sats from anywhere. Payments pile up while the wallet's closed. Open it, and they're yours.",
      imageSrc: "/images/iphone-placeholder.png",
      imageAlt: "Phone showing payments received in the Cashu wallet",
      fullWidth: false,
    },
  ],
  faqs: [
    {
      question: "Is this custodial?",
      answer:
        "Yes. The mint holds the underlying bitcoin. What you hold is bearer ecash redeemable to any Lightning address at any time. The mint cannot freeze your withdrawal address, but it can go offline. Treat every mint the way you would treat a custodian.",
    },
    {
      question: "What if a mint disappears?",
      answer:
        "You lose the ecash minted there. The protocol does not solve this. Mitigate by choosing mints with known operators, holding small amounts per mint, and redeeming regularly to a Lightning wallet you control.",
    },
    {
      question: "How is this different from Wallet of Satoshi?",
      answer:
        "Wallet of Satoshi holds a balance in a database tied to your account and can rate-limit, suspend, or geofence you. A Cashu mint holds bitcoin but issues you blinded bearer ecash. You can swap to another mint, send ecash peer-to-peer, or withdraw to any Lightning address, without permission.",
    },
    {
      question: "Can I back it up?",
      answer:
        "Yes. cashu.me exports your ecash and mint settings as an encrypted backup. Restore by importing on any device. ecash is a bearer instrument: possession of the backup means possession of the funds. Store accordingly.",
    },
    {
      question: "Where can I read the protocol?",
      answer:
        "The spec lives at github.com/cashubtc/nuts. It is a set of NUTs (Notation, Usage, Terminology) that any mint or wallet implements. cashu.me is one wallet among many possible.",
    },
  ] as { question: string; answer: ReactNode }[],
  footer: {
    tagline: "Bearer cash for the web.",
    attribution: "Open source under MIT.",
    copyright: "© 2026 cashu.me",
    columns: [
      {
        label: "Wallet",
        links: [
          { label: "Open cashu.me", href: links.wallet },
          { label: "App Store", href: links.appStore },
          { label: "Play Store", href: links.playStore },
        ],
      },
      {
        label: "Protocol",
        links: [
          { label: "Spec (NUTs)", href: links.spec },
          { label: "Source", href: links.repo },
          { label: "Docs", href: links.docs },
        ],
      },
      {
        label: "Community",
        links: [
          { label: "Nostr", href: links.nostr },
          { label: "X", href: links.twitter },
        ],
      },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
