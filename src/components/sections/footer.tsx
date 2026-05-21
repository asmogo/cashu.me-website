import { Icons } from "@/components/icons";
import { siteConfig } from "@/lib/config";

const social = [
  { label: "GitHub", url: siteConfig.links.repo, icon: <Icons.github className="size-5" /> },
  { label: "X", url: siteConfig.links.twitter, icon: <Icons.twitter className="size-4" /> },
  { label: "Nostr", url: siteConfig.links.nostr, icon: <Icons.nostr className="size-5" /> },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="container mx-auto flex max-w-[var(--max-container-width)] flex-col px-6 pt-16 pb-10 lg:px-10 lg:pt-20">
        {/* Utility columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {siteConfig.footer.columns.map((col) => (
            <div key={col.label} className="flex flex-col gap-4">
              <span className="type-label text-muted-foreground">
                {col.label}
              </span>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-base text-foreground/85 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* The brand sign-off */}
        <div className="py-12 md:py-20">
          <div className="type-wordmark uppercase text-foreground select-none">
            {siteConfig.name}
          </div>
        </div>

        {/* Bottom row — socials + copyright */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-5">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.label}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-1 type-label text-muted-foreground sm:items-end sm:text-right">
            <span>{siteConfig.footer.copyright}</span>
            <span>{siteConfig.footer.attribution}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
