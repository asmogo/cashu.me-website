"use client";

import { Icons } from "@/components/icons";
import { Logo } from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "Spec", href: siteConfig.links.spec, external: true },
  { label: "Docs", href: siteConfig.links.docs, external: true },
  { label: "GitHub", href: siteConfig.links.repo, external: true },
];

export function MobileDrawer() {
  return (
    <Drawer>
      <DrawerTrigger aria-label="Open menu">
        <Menu className="size-6" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="px-6">
          <Link
            href="/"
            title="cashu.me"
            className="relative mr-6 flex items-center gap-2.5"
          >
            <Logo className="size-8" />
            <span className="font-display text-base font-semibold uppercase tracking-[0.14em]">
              {siteConfig.name}
            </span>
          </Link>
        </DrawerHeader>
        <nav className="flex flex-col gap-1 px-6 py-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer noopener" : undefined}
              className="flex items-center justify-between rounded-none py-3 text-base text-foreground/90 transition-colors hover:text-foreground"
            >
              <span>{link.label}</span>
              {link.label === "GitHub" && (
                <Icons.github className="size-4 text-muted-foreground" />
              )}
            </a>
          ))}
        </nav>
        <DrawerFooter>
          <Link
            href={siteConfig.links.wallet}
            className={cn(buttonVariants({ variant: "default", size: "lg" }))}
          >
            {siteConfig.cta}
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
