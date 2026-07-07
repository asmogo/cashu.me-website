"use client";

import { Icons } from "@/components/icons";
import { Logo } from "@/components/logo";
import { MobileDrawer } from "@/components/mobile-drawer";
import { easeInOutCubic } from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useAnimation, useReducedMotion } from "framer-motion";
import { Globe } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "GitHub", href: siteConfig.links.repo, external: true },
  { label: "Spec", href: siteConfig.links.spec, external: true },
  { label: "Docs", href: siteConfig.links.docs, external: true },
];

const NAV_ICONS = [
  { label: "View source on GitHub", href: siteConfig.links.repo, icon: Icons.github },
  { label: "Get the iOS app", href: "#", icon: Icons.apple },
  { label: "Get the Android app", href: "#", icon: Icons.android },
  { label: "Open in browser", href: siteConfig.links.wallet, icon: Globe },
];

const navLinkClass = cn(
  "relative inline-block pb-1 font-sans text-base text-muted-foreground transition-colors hover:text-foreground",
  "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0",
  "after:bg-primary after:transition-transform after:duration-300 after:ease-out",
  "hover:after:scale-x-100"
);

export function Header() {
  const reduceMotion = useReducedMotion() ?? false;
  const [isVisible, setIsVisible] = useState(true);
  const [addBorder, setAddBorder] = useState(false);
  // A ref, not state: the first-reveal flag is read inside the controls effect
  // (never during render) to pick the slower opening timing, then flipped —
  // without triggering a re-render.
  const isInitialLoad = useRef(true);
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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const transition = reduceMotion
      ? { duration: 0 }
      : {
          duration: isInitialLoad.current ? 0.8 : 0.3,
          delay: isInitialLoad.current ? 0.3 : 0,
          ease: easeInOutCubic,
        };
    controls.start(isVisible ? "visible" : "hidden", transition);
    isInitialLoad.current = false;
  }, [isVisible, controls, reduceMotion]);

  const headerVariants = reduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: "-100%" },
        visible: { opacity: 1, y: 0 },
      };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={reduceMotion ? "visible" : "hidden"}
          animate={controls}
          exit="hidden"
          variants={headerVariants}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.3, ease: easeInOutCubic }
          }
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

            <div className="hidden items-center gap-5 lg:flex">
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
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>

            <div className="block lg:hidden">
              <MobileDrawer />
            </div>
          </div>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: addBorder ? 1 : 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}
            className="absolute inset-x-0 bottom-0 h-px bg-border"
          />
        </motion.header>
      )}
    </AnimatePresence>
  );
}
