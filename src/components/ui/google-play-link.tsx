import { siteConfig } from "@/lib/config";
import type { ComponentPropsWithoutRef } from "react";

type GooglePlayLinkProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "href" | "target" | "rel"
>;

export function GooglePlayLink(props: GooglePlayLinkProps) {
  return (
    <a
      {...props}
      href={siteConfig.links.googlePlay}
      target="_blank"
      rel="noreferrer noopener"
    />
  );
}
