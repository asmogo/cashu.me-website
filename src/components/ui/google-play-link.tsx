"use client";

import { siteConfig } from "@/lib/config";
import type { ComponentPropsWithoutRef } from "react";
import { useSyncExternalStore } from "react";

const MOBILE_USER_AGENT =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

const subscribe = () => () => {};
const getServerSnapshot = () => false;
const getMobileSnapshot = () => MOBILE_USER_AGENT.test(navigator.userAgent);

type GooglePlayLinkProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "href" | "target" | "rel"
> & {
  mobileHref?: string;
  webHref?: string;
};

export function GooglePlayLink({
  mobileHref = siteConfig.links.googlePlayMobile,
  webHref = siteConfig.links.googlePlayWeb,
  ...props
}: GooglePlayLinkProps) {
  const isMobile = useSyncExternalStore(
    subscribe,
    getMobileSnapshot,
    getServerSnapshot
  );
  const href = isMobile ? mobileHref : webHref;

  return (
    <a
      {...props}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
    />
  );
}
