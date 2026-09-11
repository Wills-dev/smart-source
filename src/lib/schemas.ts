import { z } from "zod";

const phoneRegex = /^[+]?[\d\s()-]{7,20}$/;

export const quoteSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name."),
  email: z.email("Enter a valid email address."),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number."),
  location: z.string().trim().min(2, "Enter your location."),
  productId: z.string().optional(),
  productName: z.string().optional(),
  quantity: z.number().positive().optional(),
  expectedPrice: z.number().positive().optional(),
  description: z.string().trim().min(10, "Tell us a bit more about what you need."),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z.email("Enter a valid email address."),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number."),
  subject: z.string().trim().min(2, "Enter a subject."),
  message: z.string().trim().min(10, "Your message should be at least 10 characters."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
