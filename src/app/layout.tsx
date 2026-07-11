import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { Azeret_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SkyProvider } from "@/components/sky/sky-provider";
import { ConsoleGreeting } from "@/components/console-greeting";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const azeretMono = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-azeret-mono",
  display: "swap",
});

const title = `${siteConfig.name} · ${siteConfig.description}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description: siteConfig.tagline,
  keywords: siteConfig.keywords,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description: siteConfig.tagline,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.tagline,
    creator: "@CashuBTC",
  },
};

export const viewport: Viewport = {
  themeColor: "#c9e2f5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${GeistSans.variable} ${azeretMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
        >
          <SkyProvider>{children}</SkyProvider>
          <ConsoleGreeting />
        </ThemeProvider>
      </body>
    </html>
  );
}
