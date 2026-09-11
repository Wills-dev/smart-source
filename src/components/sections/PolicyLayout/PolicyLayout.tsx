import { Container } from "@/components/atoms/Container";
import { BreadcrumbsNav } from "@/components/molecules/BreadcrumbsNav";

interface PolicySection {
  heading: string;
  body: string[];
}

interface PolicyLayoutProps {
  title: string;
  updatedAt: string;
  sections: PolicySection[];
}

// Placeholder legal copy — have this reviewed by counsel before production launch.
function PolicyLayout({ title, updatedAt, sections }: PolicyLayoutProps) {
  return (
    <Container width="narrow" className="py-16">
      <BreadcrumbsNav items={[{ label: title }]} />
      <h1 className="mt-4 font-heading text-3xl font-semibold text-foreground sm:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {updatedAt}</p>

      <div className="mt-10 flex flex-col gap-8">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-heading text-lg font-semibold text-foreground">{section.heading}</h2>
            <div className="mt-2 flex flex-col gap-3">
              {section.body.map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}

export { PolicyLayout };
