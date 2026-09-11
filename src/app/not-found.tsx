import Link from "next/link";
import { Compass } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-5 py-20 text-center">
      <Compass className="size-10 text-brand-gold" />
      <span className="font-heading text-6xl font-semibold text-brand-gold/30">404</span>
      <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
        Page Not Found
      </h1>
      <p className="max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Try browsing our materials
        or head back home.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button render={<Link href="/" />}>Back to Home</Button>
        <Button variant="outline" render={<Link href="/products" />}>
          Browse Products
        </Button>
      </div>
    </Container>
  );
}
