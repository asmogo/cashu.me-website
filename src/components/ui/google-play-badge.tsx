import { GooglePlayLink } from "@/components/ui/google-play-link";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface GooglePlayBadgeProps {
  className?: string;
}

export function GooglePlayBadge({ className }: GooglePlayBadgeProps) {
  return (
    <GooglePlayLink
      aria-label="Get cashu.me on Google Play"
      className={cn(
        "inline-flex h-16 items-center rounded-sm transition-transform duration-[250ms] ease-out-quart hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100",
        className
      )}
    >
      <Image
        src="/images/google-play-badge.png"
        width={646}
        height={250}
        alt="Get it on Google Play"
        className="h-16 w-auto"
        unoptimized
      />
    </GooglePlayLink>
  );
}
