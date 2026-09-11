export interface QuoteRequest {
  fullName: string;
  email: string;
  phone: string;
  location: string;

  productId?: string;
  productName?: string;

  quantity?: number;
  expectedPrice?: number;

  description: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export type FormSubmissionResult =
  | { success: true }
  | { success: false; error: string };
