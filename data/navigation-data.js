import { testimonials } from "./testimonials-data.js";

// Testimonials stays out of the menu (and out of search) until there is an approved review.
/** @type {import("../lib/content-types").NavigationItem[]} */
export const navigation = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/treated-locations", label: "Treated locations" },
  { href: "/gallery", label: "Gallery" },
  ...(testimonials.length > 0 ? [{ href: "/testimonials", label: "Testimonials" }] : []),
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
