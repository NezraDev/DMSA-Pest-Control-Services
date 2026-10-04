"use client";

import Link from "next/link";
import { ArrowRight, Eye, MapPin, Quote } from "lucide-react";
import { useMemo, useState } from "react";

import { ProjectVisual } from "@/components/site/page-elements";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { galleryItems } from "@/data/gallery-data";
import type { GalleryItem } from "@/lib/content-types";

const all = "All";

export function GalleryExplorer() {
  const [region, setRegion] = useState(all);
  const [service, setService] = useState(all);
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const filtered = useMemo(() => galleryItems.filter((item) =>
    (region === all || item.region === region) && (service === all || item.servicePerformed === service)), [region, service]);

  return (
    <>
      <div className="gallery-toolbar">
        <p><strong>{filtered.length}</strong> {filtered.length === 1 ? "treatment" : "treatments"}</p>
        <div>
          <label><span>Region</span><Select value={region} onValueChange={setRegion}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{[all, ...new Set(galleryItems.map((item) => item.region))].map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></label>
          <label><span>Service</span><Select value={service} onValueChange={setService}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{[all, ...new Set(galleryItems.map((item) => item.servicePerformed))].map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></label>
        </div>
      </div>
      <div className="project-grid gallery-grid">
        {filtered.map((location) => (
          <article className="project-card" key={location.slug}>
            <button className="project-preview-button" type="button" onClick={() => setSelected(location)} aria-label={`Preview ${location.title}`}>
              <ProjectVisual location={location} />
              <span><Eye aria-hidden="true" />Quick preview</span>
            </button>
            <div className="project-card-body">
              <div className="project-meta"><span>{location.servicePerformed}</span><span>{location.year}</span></div>
              <h2>{location.title}</h2>
              <p className="location-line"><MapPin aria-hidden="true" />{location.generalLocation}</p>
              <p>{location.shortDescription}</p>
              <Link className="card-link" href={`/gallery/${location.slug}`}>View full details <ArrowRight aria-hidden="true" /></Link>
            </div>
          </article>
        ))}
      </div>
      {!filtered.length ? <p className="empty-state">No treatments match these filters.</p> : null}
      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="gallery-dialog">
          {selected ? (
            <>
              <DialogHeader><DialogTitle>{selected.title}</DialogTitle><DialogDescription>{selected.generalLocation} · {selected.servicePerformed}</DialogDescription></DialogHeader>
              <ProjectVisual location={selected} large />
              <div className="dialog-project-meta"><span>{selected.servicePerformed}</span><span>{selected.pest}</span><span>{selected.propertyType}</span></div>
              <p>{selected.description}</p>
              {selected.customerFeedback ? <blockquote><Quote aria-hidden="true" />{selected.customerFeedback}<cite>Published with customer permission</cite></blockquote> : null}
              <Button asChild><Link href={`/gallery/${selected.slug}`}>View full treatment <ArrowRight aria-hidden="true" /></Link></Button>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
