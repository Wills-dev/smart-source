import type { Metadata } from "next";
import { PolicyLayout } from "@/components/sections/PolicyLayout";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsOfUsePage() {
  return (
    <PolicyLayout
      title="Terms of Use"
      updatedAt="September 2026"
      sections={[
        {
          heading: "Acceptance of Terms",
          body: [
            `By accessing and using this website, you agree to these Terms of Use. If you do not agree, please discontinue use of the site.`,
          ],
        },
        {
          heading: "Use of Content",
          body: [
            "Product information, pricing and content on this website are provided for general reference. Prices are indicative and subject to confirmation before an order is placed.",
          ],
        },
        {
          heading: "Quote Requests",
          body: [
            "Submitting a quote request does not constitute a binding order. Orders are confirmed only after pricing, quantities and delivery terms are agreed with our team.",
          ],
        },
        {
          heading: "Limitation of Liability",
          body: [
            `${siteConfig.name} is not liable for indirect or consequential loss arising from use of this website, to the extent permitted by applicable law.`,
          ],
        },
        {
          heading: "Changes to These Terms",
          body: [
            "These Terms of Use may be updated from time to time. Continued use of the website after changes constitutes acceptance of the revised terms.",
          ],
        },
      ]}
    />
  );
}
