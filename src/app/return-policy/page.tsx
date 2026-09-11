import type { Metadata } from "next";
import { PolicyLayout } from "@/components/sections/PolicyLayout";

export const metadata: Metadata = { title: "Return Policy" };

export default function ReturnPolicyPage() {
  return (
    <PolicyLayout
      title="Return Policy"
      updatedAt="September 2026"
      sections={[
        {
          heading: "Eligibility for Returns",
          body: [
            "Returns are considered on a case-by-case basis and generally apply to unused, undamaged materials in their original condition and packaging.",
            "Custom-cut, made-to-order, or bulk-procured materials may not be eligible for return once an order has been processed.",
          ],
        },
        {
          heading: "Requesting a Return",
          body: [
            "To request a return, contact our support team with your order details and reason for the return. Our team will confirm eligibility and next steps.",
          ],
        },
        {
          heading: "Damaged or Incorrect Items",
          body: [
            "If materials arrive damaged or do not match your order, report this to our team as soon as possible so we can arrange a replacement or resolution.",
          ],
        },
        {
          heading: "Refunds",
          body: [
            "Approved refunds are processed to the original payment method where applicable. Timelines may vary depending on payment provider processing times.",
          ],
        },
      ]}
    />
  );
}
