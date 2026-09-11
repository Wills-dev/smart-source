import type { Metadata } from "next";
import { PolicyLayout } from "@/components/sections/PolicyLayout";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      updatedAt="September 2026"
      sections={[
        {
          heading: "Overview",
          body: [
            `This Privacy Policy explains how ${siteConfig.name} ("SmartSource", "we", "us") collects, uses and protects information you provide when using this website, requesting a quote, or contacting our team.`,
          ],
        },
        {
          heading: "Information We Collect",
          body: [
            "We collect information you voluntarily submit through our quote request and contact forms, including your name, phone number, email address, location and project details.",
            "We may also collect basic technical information such as browser type and device information to help us maintain and improve the website.",
          ],
        },
        {
          heading: "How We Use Your Information",
          body: [
            "Information submitted through quote and contact forms is used to respond to your enquiry, prepare quotations, and coordinate material sourcing and delivery.",
            "We do not sell your personal information to third parties.",
          ],
        },
        {
          heading: "Data Sharing",
          body: [
            "Your enquiry details may be shared with our internal team and, where necessary, with suppliers or delivery partners solely to fulfil your request.",
          ],
        },
        {
          heading: "Contact",
          body: [`Questions about this policy can be directed to ${siteConfig.contact.email}.`],
        },
      ]}
    />
  );
}
