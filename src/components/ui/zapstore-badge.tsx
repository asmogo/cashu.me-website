import { Icons } from "@/components/icons";
import { storeBadgeClass } from "@/components/ui/store-badge";
import { cn } from "@/lib/utils";

interface ZapstoreBadgeProps {
  href: string;
  className?: string;
}

// The Android build ships via Zapstore (public beta), not Google Play yet — the
// badge keeps the Android mark but points at the Zapstore listing, mirroring the
// Apple mark / TestFlight pairing.
export function ZapstoreBadge({ href, className }: ZapstoreBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Download the cashu.me beta on Zapstore"
      className={cn(storeBadgeClass, className)}
    >
      <Icons.android
        className="size-8 flex-shrink-0 fill-current"
        aria-hidden="true"
      />
      <span className="flex flex-col items-start leading-none">
        <span className="type-button text-[11px] text-muted-foreground">
          Download Beta on
        </span>
        <span className="mt-1 type-button text-[18px]">Zapstore</span>
      </span>
    </a>
  );
}
