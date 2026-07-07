import type { ReactNode } from "react";

const links = {
  wallet: "https://wallet.cashu.me",
  spec: "https://github.com/cashubtc/nuts",
  repo: "https://github.com/cashubtc/cashu.me",
  docs: "https://docs.cashu.space",
  nostr:
    "https://primal.net/p/nprofile1qqs0y3tvskgs9gpgxxu5ahgz3fmms3rzmxt504qceqtz4a6pdgfwlkghwl6j8",
  twitter: "https://x.com/CashuBTC",
  opencash: "http://opencash.dev/",
  // iOS ships via TestFlight (public beta); the Android native build is still in
  // closed beta, so there is no Play Store listing yet. It ships as a direct
  // APK download instead — placeholder link until the build is hosted.
  testflight: "https://testflight.apple.com/join/Wz4jWRxn",
  androidApk: "#",
};

export const siteConfig = {
  name: "cashu.me",
  description: "Hold your ecash.",
  tagline:
    "cashu.me is the first Cashu ecash wallet. The iPhone app is in public beta on TestFlight, the Android app is in closed beta, and the wallet runs in any browser today. Hold bearer ecash on your device, send with a tap, redeem to any Lightning address. No account.",
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
      imageSrc: "/images/screen-receive-ecash.png",
      direction: "ltr" as const,
    },
    {
      title: "Lose the phone, keep the cash.",
      description:
        "Twelve words back up your whole wallet, the same way Bitcoin does. Restore on any device, any time. Your ecash isn't tied to hardware: it's tied to words.",
      imageSrc: "/images/screen-backup.png",
      direction: "ltr" as const,
    },
  ],
  tapToPay: {
    title: "Tap to pay.",
    description:
      "Hold your phone near the receiver. The ecash token transfers over NFC in seconds. No card network, no settlement window.",
    videoSrc: "/videos/tap-to-pay.mp4",
  },
  bento: [
    {
      id: "custody-comparison",
      title: "Account wallets see everything.",
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
        "Ecash is just text. Anywhere you can paste a string (a chat, an SMS, a Bluetooth share), you can send money. No app to install on their end.",
      imageSrc: "/images/screen-imessage.png",
      imageAlt: "iMessage chat where a long Cashu token is sent in reply to '$5 for lunch'",
      fullWidth: false,
    },
    {
      id: "lightning-address",
      title: "On-chain, BOLT12, Lightning address.",
      content:
        "Hand out a Bitcoin address, a BOLT12 offer, or a Lightning address. Sats arrive while you're offline. Open the wallet and they mint into ecash.",
      imageSrc: "/images/screen-lightning-address.png",
      imageAlt: "Bottom sheet showing a Lightning Address QR code with Copy and Share actions",
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
      question: "How is this different from a custodial wallet?",
      answer:
        "Account-based wallets hold a balance in a database tied to your identity and can rate-limit, suspend, or geofence you. A Cashu mint also holds bitcoin, but it issues you blinded bearer ecash instead of an account balance. You can swap to another mint, send ecash peer-to-peer, or withdraw to any Lightning address, without permission.",
    },
    {
      question: "Can I back it up?",
      answer:
        "Two ways. cashu.me derives ecash from a 12-word BIP39 seed, the same kind Bitcoin wallets use. Mint URLs and settings export as an encrypted file. Either restores on any device. Ecash is a bearer instrument: possession of the backup means possession of the funds. Store accordingly.",
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
          { label: "iOS (TestFlight)", href: links.testflight },
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
          { label: "Opencash", href: links.opencash },
        ],
      },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
