import { siteConfig } from "@/config/site";

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
  /** Most provided icons are full-color and need a light chip; the X icon is plain white and needs a dark one. */
  chipTone: "light" | "dark";
}

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: siteConfig.socials.instagram, icon: "/images/socials/ig-instagram-icon.svg", chipTone: "light" },
  { label: "Facebook", href: siteConfig.socials.facebook, icon: "/images/socials/facebook-square-icon.svg", chipTone: "light" },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, icon: "/images/socials/linkedin-app-icon.svg", chipTone: "light" },
  { label: "X", href: siteConfig.socials.x, icon: "/images/socials/x-social-media-white-icon.svg", chipTone: "dark" },
  { label: "YouTube", href: siteConfig.socials.youtube, icon: "/images/socials/youtube-color-icon.svg", chipTone: "light" },
];
