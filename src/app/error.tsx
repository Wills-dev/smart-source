"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-5 py-20 text-center">
      <AlertTriangle className="size-10 text-brand-gold" />
      <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
        Something Went Wrong
      </h1>
      <p className="max-w-md text-muted-foreground">
        An unexpected error occurred. Please try again, or head back to the homepage.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>Try Again</Button>
        <Button variant="outline" render={<Link href="/" />}>
          Back to Home
        </Button>
      </div>
    </Container>
  );
}
