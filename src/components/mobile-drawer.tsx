"use client";

import { Icons } from "@/components/icons";
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
            title="brand-logo"
            className="relative mr-6 flex items-center space-x-2"
          >
            <Icons.logo className="size-8 text-primary" />
            <span className="font-display text-xl font-semibold">
              {siteConfig.name}
            </span>
          </Link>
        </DrawerHeader>
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
