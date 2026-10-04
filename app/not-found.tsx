import Link from "next/link";
import { ArrowLeft, Bug } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found"><div><Bug aria-hidden="true" /><p>404 · Page not found</p><h1>This page has moved—or never existed.</h1><p>Return to the DMSA homepage or request a pest control quotation.</p><div><Button asChild><Link href="/"><ArrowLeft aria-hidden="true" />Back home</Link></Button><Button asChild variant="outline"><Link href="/request-quote">Get a quotation</Link></Button></div></div></main>
  );
}
