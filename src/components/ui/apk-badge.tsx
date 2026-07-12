import { Icons } from "@/components/icons";
import { storeBadgeClass } from "@/components/ui/store-badge";
import { cn } from "@/lib/utils";

interface ApkBadgeProps {
  href: string;
  className?: string;
}

// The Android native build ships as a direct APK while it's in closed beta,
// ahead of a Play Store listing.
export function ApkBadge({ href, className }: ApkBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Download the cashu.me Android APK"
      className={cn(storeBadgeClass, className)}
    >
      <Icons.android
        className="size-8 flex-shrink-0 fill-current"
        aria-hidden="true"
      />
      <span className="flex flex-col items-start leading-none">
        <span className="type-button text-[11px] text-muted-foreground">
          Download Beta
        </span>
        <span className="mt-1 type-button text-[18px]">APK</span>
      </span>
    </a>
  );
}
