import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const accessKey = process.env.CONTACT_FORM_ACCESS_KEY;

  if (!accessKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] No CONTACT_FORM_ACCESS_KEY set — logging submission instead of sending:", parsed.data);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Contact form is not configured." }, { status: 500 });
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      from_name: "SmartSource Website",
      ...parsed.data,
      subject: `New Contact Message — SmartSource: ${parsed.data.subject}`,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Unable to send your message right now." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
