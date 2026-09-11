import type { QuoteRequest, ContactRequest, FormSubmissionResult } from "@/types/quote";

/**
 * Submission goes through our own /api/quote and /api/contact route handlers
 * rather than calling the form provider directly from the browser. That
 * keeps the provider swappable (Web3Forms today, Formspree/Basin tomorrow)
 * behind one server-side integration point — see those route files.
 */
async function postJson(endpoint: string, payload: unknown): Promise<FormSubmissionResult> {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      return { success: false, error: data?.error ?? "Something went wrong. Please try again." };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Network error. Please check your connection and try again." };
  }
}

export function submitQuoteRequest(payload: QuoteRequest): Promise<FormSubmissionResult> {
  return postJson("/api/quote", payload);
}

export function submitContactRequest(payload: ContactRequest): Promise<FormSubmissionResult> {
  return postJson("/api/contact", payload);
}
