"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

interface WhatsAppButtonProps {
  message?: string;
}

/** Fixed, global WhatsApp deep-link — appears on every page. */
function WhatsAppButton({ message }: WhatsAppButtonProps) {
  const text = encodeURIComponent(message ?? siteConfig.whatsappDefaultMessage);
  const href = `https://wa.me/${siteConfig.contact.whatsapp}?text=${text}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with SmartSource on WhatsApp"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      className="fixed right-4 bottom-4 z-40 flex size-14 items-center justify-center drop-shadow-lg sm:right-6 sm:bottom-6"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- small static brand SVG, not a content photo */}
      <img src="/images/socials/whatsapp-color-icon.svg" alt="" aria-hidden className="size-full" />
      <span className="sr-only">Chat on WhatsApp</span>
    </motion.a>
  );
}

export { WhatsAppButton };
