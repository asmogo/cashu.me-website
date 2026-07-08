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
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,backdrop-filter] duration-500 ease-out-quart",
        isScrolled
          ? "bg-background/70 backdrop-blur-xl"
          : "bg-transparent backdrop-blur-none"
      )}
    >
      <div className="container-page relative flex items-center justify-between gap-6 px-6 py-4 lg:px-10">
        <Link
          href="/"
          title="cashu.me"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <Logo className="size-7" />
          <span className="font-display text-sm font-semibold uppercase tracking-[0.14em]">
            {siteConfig.name}
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <div className="flex items-center gap-5">
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
            className={cn(buttonVariants({ variant: "default", size: "sm" }))}
          >
            {siteConfig.cta}
          </a>
        </div>

        <div className="block lg:hidden">
          <MobileDrawer />
        </div>
      </div>
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 bottom-0 h-px bg-border transition-opacity duration-200",
          isScrolled ? "opacity-100" : "opacity-0"
        )}
      />
    </header>
  );
}
