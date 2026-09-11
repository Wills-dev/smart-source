import type { Metadata } from "next";
import { PolicyLayout } from "@/components/sections/PolicyLayout";

export const metadata: Metadata = { title: "Delivery Policy" };

export default function DeliveryPolicyPage() {
  return (
    <PolicyLayout
      title="Delivery Policy"
      updatedAt="September 2026"
      sections={[
        {
          heading: "Delivery Coverage",
          body: [
            "SmartSource coordinates delivery within Lagos and to selected locations nationwide. Coverage and lead times vary by product, quantity and destination.",
          ],
        },
        {
          heading: "Delivery Timelines",
          body: [
            "Delivery timelines depend on product availability, order quantity and delivery location. Estimated timelines are confirmed at the point of quotation and may change based on supplier and logistics conditions.",
          ],
        },
        {
          heading: "Delivery Charges",
          body: [
            "Delivery charges, where applicable, are calculated based on distance, order size and product type, and are communicated before an order is confirmed.",
          ],
        },
        {
          heading: "Receiving Your Order",
          body: [
            "A representative should be available to inspect and receive materials at the point of delivery. Please report any discrepancies at the time of delivery where possible.",
          ],
        },
      ]}
    />
  );
}
