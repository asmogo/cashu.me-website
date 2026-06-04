import { cn } from "@/lib/utils";

interface PlayStoreBadgeProps {
  className?: string;
}

// The Android native build is still in closed beta, so there's no Play Store
// listing. The badge is shown as a non-interactive "coming soon" placeholder:
// the Google Play mark dimmed back, with a diagonal ribbon across the corner.
export function PlayStoreBadge({ className }: PlayStoreBadgeProps) {
  return (
    <div
      role="img"
      aria-label="cashu.me for Android, coming soon to Google Play"
      className={cn(
        "relative inline-flex h-14 cursor-default select-none items-center gap-3 overflow-hidden rounded-none border border-white/15 bg-black px-4 text-white",
        className
      )}
    >
      {/* Dimmed interior — reads inactive while the ribbon stays full-strength. */}
      <span className="flex items-center gap-3 opacity-50">
        <svg
          viewBox="0 0 29 32"
          className="h-7 w-auto flex-shrink-0 text-white"
          aria-hidden="true"
          fill="currentColor"
        >
          {/* Official Google Play geometry, grayscaled via per-face opacity so it
              reads as a folded volume rather than four colored facets. */}
          <path
            opacity="0.7"
            d="M13.5401 15.28L0.120056 29.34C0.270745 29.8741 0.541554 30.3667 0.911782 30.7801C1.28201 31.1934 1.74185 31.5167 2.25616 31.7251C2.77047 31.9335 3.32563 32.0216 3.87919 31.9826C4.43275 31.9436 4.97006 31.7785 5.45006 31.5L20.5501 22.9L13.5401 15.28Z"
          />
          <path
            opacity="1"
            d="M27.11 12.89L20.58 9.15002L13.23 15.6L20.61 22.88L27.09 19.18C27.6641 18.8794 28.145 18.4275 28.4805 17.8731C28.816 17.3187 28.9934 16.683 28.9934 16.035C28.9934 15.387 28.816 14.7514 28.4805 14.197C28.145 13.6426 27.6641 13.1906 27.09 12.89H27.11Z"
          />
          <path
            opacity="0.45"
            d="M0.120039 2.66003C0.0389183 2.95992 -0.00144445 3.26937 3.94718e-05 3.58003V28.42C0.000850852 28.7305 0.0411748 29.0397 0.120039 29.34L14 15.64L0.120039 2.66003Z"
          />
          <path
            opacity="0.6"
            d="M13.6401 16L20.5801 9.15001L5.50006 0.510007C4.93274 0.177748 4.28751 0.00177385 3.63006 7.15214e-06C2.83604 -0.00156636 2.06328 0.256535 1.42958 0.734967C0.795887 1.2134 0.336011 1.88592 0.120056 2.65001L13.6401 16Z"
          />
        </svg>
        <span className="flex flex-col items-start leading-none">
          <span className="type-button text-[10px] text-white/80">
            Get it on
          </span>
          <span className="mt-1 type-button text-[16px]">
            Google Play
          </span>
        </span>
      </span>

      {/* Diagonal ribbon clipped to the top-right corner by overflow-hidden. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 top-3 w-32 rotate-45 bg-primary py-0.5 text-center type-button text-[9px] uppercase tracking-[0.15em] text-primary-foreground"
      >
        Soon
      </span>
    </div>
  );
}
