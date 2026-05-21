import { cn } from "@/lib/utils";

interface PlayStoreBadgeProps {
  href: string;
  className?: string;
}

export function PlayStoreBadge({ href, className }: PlayStoreBadgeProps) {
  return (
    <a
      href={href}
      aria-label="Get cashu.me on Google Play"
      className={cn(
        "group inline-flex h-14 items-center gap-3 rounded-none border border-white/15 bg-black px-4 text-white transition-colors hover:border-white/30",
        className
      )}
    >
      <svg
        viewBox="0 0 512 512"
        className="size-7 flex-shrink-0 fill-current"
        aria-hidden="true"
      >
        <path d="M325.3 234.3 104.9 51l268.5 156.5-48.1 26.8zM69 32c-12.4 6.4-20.7 18.4-20.7 33.9v380.2c0 15.5 8.3 27.5 20.7 33.9l243.5-227-243.5-221zm393.6 199.5-72.2-41.7-54.1 49.7L390.4 290l72.6-41.7c21.7-17.1 21.7-29.5 0-46.8h-.4zM104.9 461 325.3 277.7l-48.1-26.8L104.9 461z" />
      </svg>
      <span className="flex flex-col items-start leading-none">
        <span className="font-sans text-[10px] tracking-tight text-white/80">
          Get it on
        </span>
        <span className="mt-1 font-sans text-[19px] font-semibold tracking-tight">
          Google Play
        </span>
      </span>
    </a>
  );
}
