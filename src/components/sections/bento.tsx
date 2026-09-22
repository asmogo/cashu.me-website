import { CustodyComparison } from "@/components/illustrations/custody-comparison";
import { BentoMotion } from "./bento-motion";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import Image from "next/image";

const CARD_MIN_HEIGHTS = ["min-h-[460px]", "min-h-[360px]", "min-h-[420px]"];

export function BentoGrid() {
  return (
    <BentoMotion>
      {siteConfig.bento.map((item, index) => {
        const minHeight =
          CARD_MIN_HEIGHTS[index] ??
          CARD_MIN_HEIGHTS[CARD_MIN_HEIGHTS.length - 1];
        return (
          <div
            key={index}
            style={{ opacity: 0, transform: "translateY(80px)" }}
            className={cn(
              "motion-reduce:!opacity-100 motion-reduce:!transform-none group relative grid grid-cols-1 grid-rows-[auto_1fr] overflow-hidden rounded-lg border border-glass-border bg-background/55 p-6 pb-0 shadow-[var(--glass-shadow)] backdrop-blur-lg sm:p-8",
              minHeight,
              item.fullWidth && "md:col-span-2",
            )}
          >
            <div className="flex min-w-0 flex-col">
              <h3 className="type-display-3 text-foreground">{item.title}</h3>
              <p className="mt-4 max-w-[52ch] type-body-lg text-foreground/70">
                {item.content}
              </p>
            </div>
            <div className="mt-6 flex justify-center">
              {item.id === "custody-comparison" ? (
                <CustodyComparison />
              ) : item.id === "imessage-chat" ? (
                <div className="aspect-[585/422] w-full overflow-hidden rounded-[2rem] border border-white/10 [-webkit-mask-image:linear-gradient(to_bottom,black_55%,transparent)] [mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    width={585}
                    height={1266}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className={cn(
                      "h-full w-full select-none object-cover object-top transition-transform duration-500 group-hover:-translate-y-2",
                      "imageSrcDark" in item &&
                        item.imageSrcDark &&
                        "dark:hidden",
                    )}
                    draggable={false}
                  />
                  {"imageSrcDark" in item && item.imageSrcDark && (
                    <Image
                      src={item.imageSrcDark}
                      alt={item.imageAlt}
                      width={585}
                      height={1266}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="hidden h-full w-full select-none object-cover object-top transition-transform duration-500 group-hover:-translate-y-2 dark:block"
                      draggable={false}
                    />
                  )}
                </div>
              ) : item.id === "lightning-address" ? (
                <div className="w-full max-w-[340px] self-end">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    width={585}
                    height={686}
                    sizes="340px"
                    className={cn(
                      "block h-auto w-full select-none rounded-[1.75rem] border border-foreground/10 transition-transform duration-500 group-hover:-translate-y-1",
                      "imageSrcDark" in item &&
                        item.imageSrcDark &&
                        "dark:hidden",
                    )}
                    draggable={false}
                  />
                  {"imageSrcDark" in item && item.imageSrcDark && (
                    <Image
                      src={item.imageSrcDark}
                      alt={item.imageAlt}
                      width={585}
                      height={686}
                      sizes="340px"
                      className="hidden h-auto w-full select-none rounded-[1.75rem] border border-foreground/10 transition-transform duration-500 group-hover:-translate-y-1 dark:block"
                      draggable={false}
                    />
                  )}
                </div>
              ) : (
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  width={900}
                  height={1840}
                  sizes="200px"
                  className={cn(
                    "h-64 w-auto select-none object-contain object-top transition-transform duration-500 group-hover:-translate-y-2 sm:h-80",
                    item.fullWidth && "sm:h-96",
                  )}
                  draggable={false}
                />
              )}
            </div>
          </div>
        );
      })}
    </BentoMotion>
  );
}
