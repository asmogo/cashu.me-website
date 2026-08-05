import { Icons } from "@/components/icons";
import { GooglePlayLink } from "@/components/ui/google-play-link";
import { storeBadgeClass } from "@/components/ui/store-badge";
import { cn } from "@/lib/utils";

interface GooglePlayBadgeProps {
  className?: string;
}

export function GooglePlayBadge({ className }: GooglePlayBadgeProps) {
  return (
    <GooglePlayLink
      aria-label="Get cashu.me on Google Play"
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
        <span className="mt-1 type-button text-[18px]">Google Play</span>
      </span>
    </GooglePlayLink>
  );
}
