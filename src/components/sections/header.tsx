"use client";

import { Icons } from "@/components/icons";
import { Logo } from "@/components/logo";
import { MobileDrawer } from "@/components/mobile-drawer";
import { buttonVariants } from "@/components/ui/button";
import { easeInOutCubic } from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

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
          <div className="container mx-auto flex max-w-[var(--max-container-width)] items-center justify-between px-6 py-4 lg:px-10">
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

            <div className="hidden items-center gap-1 lg:flex">
              <a
                href={siteConfig.links.repo}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="inline-flex size-9 items-center justify-center rounded-none text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                <Icons.github className="size-[18px]" />
              </a>
              <a
                href={siteConfig.links.spec}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-none px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                Spec
              </a>
              <Link
                href={siteConfig.links.docs}
                className="rounded-none px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                Docs
              </Link>
              <Link
                href={siteConfig.links.wallet}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "ml-2"
                )}
              >
                {siteConfig.cta}
              </Link>
            </div>

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
