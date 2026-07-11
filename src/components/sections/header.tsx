"use client";

import { Icons } from "@/components/icons";
import { Logo } from "@/components/logo";
import { MobileDrawer } from "@/components/mobile-drawer";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_ICONS = [
  { label: "View source on GitHub", href: siteConfig.links.repo, icon: Icons.github },
  { label: "Get the iOS app", href: siteConfig.links.testflight, icon: Icons.apple },
  { label: "Get the Android app", href: siteConfig.links.androidApk, icon: Icons.android },
  { label: "Open in browser", href: siteConfig.links.wallet, icon: Globe },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="sticky top-4 z-50 flex justify-center px-4 lg:px-6">
      <div
        className={cn(
          "flex w-full max-w-5xl flex-nowrap items-center justify-between gap-6 rounded-full border border-white/50 bg-background/55 px-6 py-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.55),0_8px_24px_-12px_rgba(30,64,120,0.28)] backdrop-blur-lg transition-[background-color,border-color] duration-500 ease-out-quart lg:px-8",
          isScrolled && "border-white/70 bg-background/75"
        )}
      >
        <Link
          href="/"
          title="cashu.me"
          className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <Logo className="size-7 shrink-0" />
          <span className="whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.14em]">
            {siteConfig.name}
          </span>
        </Link>

        <div className="hidden shrink-0 items-center gap-6 lg:flex">
          <div className="flex shrink-0 items-center gap-5">
            {NAV_ICONS.map(({ label, href, icon: Icon }) => {
              const isPlaceholder = href === "#";
              return (
                <a
                  key={label}
                  href={href}
                  target={isPlaceholder ? undefined : "_blank"}
                  rel={isPlaceholder ? undefined : "noreferrer noopener"}
                  aria-label={label}
                  title={label}
                  className="text-foreground/70 transition-colors hover:text-foreground"
                >
                  <Icon className="size-6" aria-hidden="true" />
                </a>
              );
            })}
          </div>
          <a
            href={siteConfig.links.wallet}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonVariants({ variant: "primary", size: "sm" }))}
          >
            {siteConfig.cta}
          </a>
        </div>

        <div className="block lg:hidden">
          <MobileDrawer />
        </div>
      </div>
    </header>
  );
}
