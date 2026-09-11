import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { Reveal } from "@/components/atoms/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/organisms/ContactForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with SmartSource Nigeria Limited — call, WhatsApp, email or send a message.",
};

export default function ContactPage() {
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappDefaultMessage)}`;

  return (
    <div className="pb-20">
      <PageHero title="Contact Us" description="We're here to help with material sourcing, quotes and project enquiries." breadcrumbs={[{ label: "Contact" }]} />

      <Container className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-5">
        <Reveal className="flex flex-col gap-6 lg:col-span-2">
          <ContactRow icon={Phone} label="Phone" value={siteConfig.contact.phoneDisplay} href={`tel:${siteConfig.contact.phone}`} />
          <ContactRow icon={MessageCircle} label="WhatsApp" value="Chat with us" href={whatsappHref} external />
          <ContactRow icon={Mail} label="Email" value={siteConfig.contact.email} href={`mailto:${siteConfig.contact.email}`} />
          <ContactRow icon={MapPin} label="Address" value={siteConfig.contact.address} />

          <div className="rounded-lg border border-border p-5">
            <h3 className="font-heading text-base font-semibold text-foreground">Business Hours</h3>
            <dl className="mt-3 flex flex-col gap-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <dt>Monday – Friday</dt>
                <dd className="text-foreground">{siteConfig.businessHours.weekdays}</dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>Saturday</dt>
                <dd className="text-foreground">{siteConfig.businessHours.saturday}</dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>Sunday</dt>
                <dd className="text-foreground">{siteConfig.businessHours.sunday}</dd>
              </div>
            </dl>
          </div>

          {/* IMAGE/MAP REQUIRED — embed a real map once an address/API is finalized. */}
          <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted text-center text-sm text-muted-foreground">
            <MapPin className="size-6" />
            {siteConfig.contact.address}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="rounded-lg border border-border p-7 lg:col-span-3">
          <h2 className="font-heading text-xl font-semibold text-foreground">Send a Message</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            We typically respond within one business day.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </Reveal>
      </Container>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <div className="flex items-center gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-brand-gold">
        <Icon className="size-4" />
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
        {content}
      </a>
    );
  }

  return content;
}
