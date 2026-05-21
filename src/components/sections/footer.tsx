import { Icons } from "@/components/icons";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/config";

const social = [
  { label: "GitHub", url: siteConfig.links.repo, icon: <Icons.github className="size-5" /> },
  { label: "X", url: siteConfig.links.twitter, icon: <Icons.twitter className="size-4" /> },
  { label: "Nostr", url: siteConfig.links.nostr, icon: <Icons.nostr className="size-5" /> },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="container mx-auto flex max-w-[var(--max-container-width)] flex-col gap-10 px-6 py-12 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-2.5">
            <Logo className="size-7" />
            <span className="font-display text-base font-semibold uppercase tracking-[0.14em]">
              {siteConfig.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.label}
                className="flex size-9 items-center justify-center rounded-none border border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 text-base text-muted-foreground md:flex-row md:items-end">
          <p className="max-w-md">{siteConfig.footer.tagline}</p>
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.1em]">
            {siteConfig.footer.attribution}
          </p>
        </div>
      </div>
    </footer>
  );
}
