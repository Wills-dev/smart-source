import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/schemas";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Submission provider lives only here — swap Web3Forms for Formspree/Basin
 * by changing this one file. QUOTE_FORM_ACCESS_KEY stays server-only
 * (no NEXT_PUBLIC_ prefix) since the browser never needs it.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = quoteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const accessKey = process.env.QUOTE_FORM_ACCESS_KEY;

  if (!accessKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[quote] No QUOTE_FORM_ACCESS_KEY set — logging submission instead of sending:", parsed.data);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Quote form is not configured." }, { status: 500 });
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `New Quote Request — SmartSource${parsed.data.productName ? `: ${parsed.data.productName}` : ""}`,
      from_name: "SmartSource Website",
      ...parsed.data,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Unable to submit your quote request right now." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
