/**
 * Single source of truth for every business-level value on the site.
 * Replace the placeholder contact details, socials and form keys here —
 * nothing else in the codebase should hardcode this information.
 */
export const siteConfig = {
  name: "SmartSource Nigeria Limited",
  shortName: "SmartSource",
  tagline: "always dedicated and devoted",
  description:
    "SmartSource Nigeria Limited sources and supplies quality construction materials — cement, steel, roofing, plumbing, electrical and finishing products — for contractors, developers and businesses across Nigeria.",
  url: "https://www.smartsource.com.ng",

  contact: {
    // PLACEHOLDER — replace with SmartSource's real phone number
    phone: "+2348000000000",
    phoneDisplay: "+234 800 000 0000",
    // PLACEHOLDER — replace with SmartSource's real WhatsApp number
    whatsapp: "2348000000000",
    // PLACEHOLDER — replace with SmartSource's real business email
    email: "hello@smartsource.com.ng",
    // PLACEHOLDER — replace with SmartSource's real office address
    address: "Lagos, Nigeria",
  },

  businessHours: {
    weekdays: "8:00 AM – 6:00 PM",
    saturday: "9:00 AM – 4:00 PM",
    sunday: "Closed",
  },

  socials: {
    // PLACEHOLDER — fill in with real social profile URLs
    instagram: "",
    facebook: "",
    linkedin: "",
    x: "",
    tiktok: "",
    youtube: "",
  },

  whatsappDefaultMessage:
    "Hello SmartSource, I would like to make an enquiry about construction materials.",
} as const;

export const company = siteConfig;
