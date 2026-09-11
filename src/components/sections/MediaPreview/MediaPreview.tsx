import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Button } from "@/components/ui/button";
import { MediaMotionGallery } from "@/components/organisms/MediaMotionGallery";
import { mediaItems } from "@/data/media";

function MediaPreview() {
  return (
    <section className="overflow-hidden py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Media"
            title="Materials in Motion"
            description="A closer look at the products, people and projects behind SmartSource."
          />
          <Button variant="outline" render={<Link href="/media" />} className="shrink-0">
            View Full Gallery
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </Container>

      <div className="mt-10">
        <MediaMotionGallery items={mediaItems.slice(0, 16)} columns={5} height="h-[420px] sm:h-[500px]" />
      </div>
    </section>
  );
}

export { MediaPreview };
