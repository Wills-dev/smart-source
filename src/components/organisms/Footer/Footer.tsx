import Link from "next/link";
import { cn } from "cn";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { Logo } from "@/components/atoms/Logo";
import { SocialIcon } from "@/components/atoms/SocialIcon";
import { siteConfig } from "@/config/site";
import { footerNav } from "@/config/navigation";
import { socialLinks } from "@/config/social";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-noise bg-brand-charcoal text-brand-warm-grey">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 flex flex-col gap-4 sm:col-span-3 lg:col-span-2">
            <Logo variant="light" />
            <p className="max-w-xs text-sm leading-relaxed text-brand-warm-grey/80">
              {siteConfig.description}
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-2 hover:text-brand-gold-light"
              >
                <Phone className="size-4 shrink-0" />
                {siteConfig.contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 hover:text-brand-gold-light"
              >
                <Mail className="size-4 shrink-0" />
                {siteConfig.contact.email}
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" />
                {siteConfig.contact.address}
              </span>
            </div>
          </div>

          <FooterColumn title="Company" items={footerNav.company} />
          <FooterColumn title="Products" items={footerNav.products} />
          <FooterColumn title="Help" items={footerNav.help} />
          <FooterColumn title="Legal" items={footerNav.legal} />
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-brand-warm-grey/70">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, icon, chipTone }) => (
              <a
                key={label}
                href={href || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={cn(
                  "flex size-8 items-center justify-center rounded-full transition-transform hover:scale-105",
                  chipTone === "dark" ? "bg-white/10" : "bg-white"
                )}
              >
                <SocialIcon src={icon} label={label} />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-semibold tracking-wider text-brand-warm-grey/60 uppercase">
        {title}
      </span>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm text-brand-warm-grey hover:text-brand-gold-light">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Footer };
