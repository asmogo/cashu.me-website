import { FooterWordmark } from "@/components/footer-wordmark";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="container mx-auto flex max-w-[var(--max-container-width)] flex-col px-6 pt-16 pb-10 lg:px-10 lg:pt-20">
        {/* Utility columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-12">
          {siteConfig.footer.columns.map((col) => (
            <div key={col.label} className="flex flex-col gap-4">
              <span className="type-label text-muted-foreground">
                {col.label}
              </span>
              <ul className="flex flex-col gap-1">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="-mx-1 inline-block px-1 py-1.5 text-base text-foreground/85 transition-colors hover:text-primary"
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
          <FooterWordmark text={siteConfig.name} />
        </div>

        {/* Bottom row — copyright */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-end">
          <div className="type-label text-muted-foreground sm:text-right">
            <span>
              {siteConfig.footer.copyright} · {siteConfig.footer.attribution}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
