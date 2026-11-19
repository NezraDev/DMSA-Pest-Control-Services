import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";

import { siteConfig } from "@/data/site-data";

const profiles = [
  { label: "Facebook", href: siteConfig.socialLinks.facebook, Icon: FaFacebookF },
  { label: "Instagram", href: siteConfig.socialLinks.instagram, Icon: FaInstagram },
  { label: "TikTok", href: siteConfig.socialLinks.tiktok, Icon: FaTiktok },
];

/** DMSA's official social profiles. rel="me" marks them as the business's own accounts. */
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`social-links ${className}`.trim()} aria-label="DMSA on social media">
      {profiles.filter(({ href }) => href).map(({ label, href, Icon }) => (
        <li key={label}>
          <a href={href} target="_blank" rel="me noopener noreferrer" aria-label={`DMSA Pest Control on ${label}`} title={label}>
            <Icon aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
