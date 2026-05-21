/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <img
      src="/images/cashu-logo.png"
      alt="cashu.me"
      width={512}
      height={512}
      className={cn(
        "size-8 select-none rounded-none object-cover",
        "[image-rendering:pixelated]",
        className
      )}
      draggable={false}
    />
  );
}
