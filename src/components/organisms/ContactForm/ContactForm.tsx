"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/molecules/FormField";
import { contactSchema, type ContactFormValues } from "@/lib/schemas";
import { submitContactRequest } from "@/lib/forms";

function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    const result = await submitContactRequest(values);
    if (result.success) {
      toast.success("Message sent — we'll get back to you shortly.");
      reset();
    } else {
      toast.error(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Name" htmlFor="name" required error={errors.name?.message}>
          <Input id="name" placeholder="Your name" {...register("name")} />
        </FormField>
        <FormField label="Email" htmlFor="email" required error={errors.email?.message}>
          <Input id="email" type="email" placeholder="you@email.com" {...register("email")} />
        </FormField>
      </div>

      <FormField label="Phone" htmlFor="phone" required error={errors.phone?.message}>
        <Input id="phone" type="tel" placeholder="080X XXX XXXX" {...register("phone")} />
      </FormField>

      <FormField label="Subject" htmlFor="subject" required error={errors.subject?.message}>
        <Input id="subject" placeholder="What's this about?" {...register("subject")} />
      </FormField>

      <FormField label="Message" htmlFor="message" required error={errors.message?.message}>
        <Textarea id="message" rows={5} placeholder="How can we help?" {...register("message")} />
      </FormField>

      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-2 w-full sm:w-fit">
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}

export { ContactForm };
