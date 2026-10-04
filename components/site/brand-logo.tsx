import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/data/site-data";

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand-link" aria-label="DMSA Pest Control Services home">
      <span className={compact ? "brand-crop brand-crop-compact" : "brand-crop"}>
        <Image
          src={siteConfig.logos.website}
          alt="DMSA Pest Control Services"
          width={2048}
          height={1152}
          priority
          sizes={compact
            ? "(max-width: 360px) 200px, (max-width: 640px) 220px, 210px"
            : "(max-width: 360px) 200px, (max-width: 640px) 220px, 240px"}
        />
      </span>
    </Link>
  );
}
