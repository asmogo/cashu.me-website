"use client";

import { Logo } from "@/components/logo";
import { MobileDrawer } from "@/components/mobile-drawer";
import { buttonVariants } from "@/components/ui/button";
import { easeInOutCubic } from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "GitHub", href: siteConfig.links.repo, external: true },
  { label: "Spec", href: siteConfig.links.spec, external: true },
  { label: "Docs", href: siteConfig.links.docs, external: true },
];

const navLinkClass = cn(
  "relative inline-block pb-1 type-label text-muted-foreground transition-colors hover:text-foreground",
  "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0",
  "after:bg-primary after:transition-transform after:duration-300 after:ease-out",
  "hover:after:scale-x-100"
);

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [addBorder, setAddBorder] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    let lastScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY < 80);
      setAddBorder(currentScrollY > 20);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    setIsInitialLoad(false);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    controls.start(isVisible ? "visible" : "hidden");
  }, [isVisible, controls]);

  const headerVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial="hidden"
          animate={controls}
          exit="hidden"
          variants={headerVariants}
          transition={{
            duration: isInitialLoad ? 0.8 : 0.3,
            delay: isInitialLoad ? 0.3 : 0,
            ease: easeInOutCubic,
          }}
          className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl"
        >
          <div className="container relative mx-auto flex max-w-[var(--max-container-width)] items-center justify-between gap-6 px-6 py-4 lg:px-10">
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

            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
              {NAV_LINKS.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={navLinkClass}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={navLinkClass}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <Link
              href={siteConfig.links.wallet}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "hidden lg:inline-flex"
              )}
            >
              {siteConfig.cta}
            </Link>

            <div className="block lg:hidden">
              <MobileDrawer />
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: addBorder ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 bottom-0 h-px bg-border"
          />
        </motion.header>
      )}
    </AnimatePresence>
  );
}
