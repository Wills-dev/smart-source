"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/molecules/FormField";
import { quoteSchema, type QuoteFormValues } from "@/lib/schemas";
import { submitQuoteRequest } from "@/lib/forms";
import type { QuoteContextProduct } from "./QuoteDialogContext";

interface QuoteFormProps {
  product?: QuoteContextProduct;
  onSuccess: () => void;
}

function QuoteForm({ product, onSuccess }: QuoteFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      productId: product?.id,
      productName: product?.name,
      fullName: "",
      email: "",
      phone: "",
      location: "",
      description: "",
    },
  });

  async function onSubmit(values: QuoteFormValues) {
    const result = await submitQuoteRequest(values);
    if (result.success) {
      toast.success("Quote request sent — we'll be in touch shortly.");
      reset();
      onSuccess();
    } else {
      toast.error(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {product && (
        <div className="rounded-md border border-border bg-muted/50 px-3 py-2 text-sm">
          Requesting a quote for <span className="font-medium">{product.name}</span>
        </div>
      )}

      <FormField label="Full Name" htmlFor="fullName" required error={errors.fullName?.message}>
        <Input id="fullName" placeholder="Your full name" {...register("fullName")} />
      </FormField>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Phone Number" htmlFor="phone" required error={errors.phone?.message}>
          <Input id="phone" type="tel" placeholder="080X XXX XXXX" {...register("phone")} />
        </FormField>
        <FormField label="Email Address" htmlFor="email" required error={errors.email?.message}>
          <Input id="email" type="email" placeholder="you@email.com" {...register("email")} />
        </FormField>
      </div>

      <FormField label="Location" htmlFor="location" required error={errors.location?.message}>
        <Input id="location" placeholder="e.g. Lekki, Lagos" {...register("location")} />
      </FormField>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Quantity" htmlFor="quantity" error={errors.quantity?.message}>
          <Input
            id="quantity"
            type="number"
            min={1}
            placeholder="e.g. 50"
            {...register("quantity", { setValueAs: (v) => (v === "" ? undefined : Number(v)) })}
          />
        </FormField>
        <FormField
          label="Expected Price / Budget"
          htmlFor="expectedPrice"
          error={errors.expectedPrice?.message}
        >
          <Input
            id="expectedPrice"
            type="number"
            min={0}
            placeholder="₦ (optional)"
            {...register("expectedPrice", { setValueAs: (v) => (v === "" ? undefined : Number(v)) })}
          />
        </FormField>
      </div>

      <FormField
        label="Description / Requirements"
        htmlFor="description"
        required
        error={errors.description?.message}
      >
        <Textarea
          id="description"
          rows={4}
          placeholder="Tell us what you need, including quantities and timeline."
          {...register("description")}
        />
      </FormField>

      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-2 w-full">
        {isSubmitting ? "Sending..." : "Submit Quote Request"}
      </Button>
    </form>
  );
}

export { QuoteForm };
