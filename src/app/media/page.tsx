import type { Metadata } from "next";
import { Container } from "@/components/atoms/Container";
import { PageHero } from "@/components/sections/PageHero";
import { MediaFilterGallery } from "@/components/organisms/MediaMotionGallery";

export const metadata: Metadata = {
  title: "Media",
  description: "A closer look at the products, people and projects behind SmartSource Nigeria Limited.",
};

export default function MediaPage() {
  return (
    <div className="pb-20">
      <PageHero
        eyebrow="Media"
        title="Materials in Motion"
        description="A closer look at the products, people and projects behind SmartSource."
        image="/images/media/media-hero.jpg"
        breadcrumbs={[{ label: "Media" }]}
      />

      <Container className="mt-14">
        <MediaFilterGallery />
      </Container>
    </div>
  );
}
