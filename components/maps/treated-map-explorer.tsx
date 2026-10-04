"use client";

import Link from "next/link";
import { ArrowRight, Filter, MapPin, RotateCcw, SearchX, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { MapCanvas } from "@/components/maps/map-canvas";
import { ProjectVisual } from "@/components/site/page-elements";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { siteConfig } from "@/data/site-data";
import { treatedLocations } from "@/data/treated-locations-data";
import type { GalleryItem } from "@/lib/content-types";

const all = "All";
const serviceChoices: GalleryItem["servicePerformed"][] = ["General Pest Control", "Termite Control"];
const pestChoices: GalleryItem["pest"][] = ["Ants", "Cockroaches", "Flies", "Rodents", "Termites"];
const customerChoices: GalleryItem["customerType"][] = ["Residential", "Commercial", "Other"];

function LocationDetails({ location }: { location: GalleryItem }) {
  return (
    <article className="map-location-detail">
      <ProjectVisual location={location} />
      <div className="project-meta"><span>{location.servicePerformed}</span><span>{location.year}</span></div>
      <h3>{location.title}</h3>
      <p className="location-line"><MapPin aria-hidden="true" />{location.generalLocation}</p>
      <dl>
        <div><dt>Pest</dt><dd>{location.pest}</dd></div>
        <div><dt>Property</dt><dd>{location.propertyType}</dd></div>
        <div><dt>Customer</dt><dd>{location.customerType === "Other" ? location.customerTypeOther : location.customerType}</dd></div>
      </dl>
      <p>{location.shortDescription}</p>
      <Button asChild><Link href={`/gallery/${location.slug}`}>View treatment <ArrowRight aria-hidden="true" /></Link></Button>
    </article>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="filter-field">
      <span>{label}</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="filter-trigger"><SelectValue /></SelectTrigger>
        <SelectContent>{options.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
      </Select>
    </label>
  );
}

export function TreatedMapExplorer({ compact = false }: { compact?: boolean }) {
  const [region, setRegion] = useState(all);
  const [service, setService] = useState(all);
  const [pest, setPest] = useState(all);
  const [customer, setCustomer] = useState(all);
  const [year, setYear] = useState(all);
  const [selected, setSelected] = useState<GalleryItem | null>(treatedLocations[0] ?? null);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const regionalRecords = useMemo(
    () => region === all ? treatedLocations : treatedLocations.filter((item) => item.region === region),
    [region],
  );

  const serviceOptions = useMemo(() => [all, ...new Set([...serviceChoices, ...treatedLocations.map((item) => item.servicePerformed)])], []);
  const pestOptions = useMemo(() => [all, ...new Set([...pestChoices, ...treatedLocations.map((item) => item.pest)])], []);
  const customerOptions = useMemo(() => [all, ...new Set([...customerChoices, ...treatedLocations.map((item) => item.customerType)])], []);
  const yearOptions = useMemo(
    () => [all, ...new Set(regionalRecords.map((item) => item.year).sort((a, b) => b - a).map(String))],
    [regionalRecords],
  );
  const regionOptions = useMemo(
    () => [all, ...new Set([...siteConfig.serviceAreas, ...treatedLocations.map((item) => item.region)])],
    [],
  );

  const filtered = useMemo(
    () => regionalRecords.filter((item) =>
      (service === all || item.servicePerformed === service) &&
      (pest === all || item.pest === pest) &&
      (customer === all || item.customerType === customer) &&
      (year === all || String(item.year) === year)),
    [regionalRecords, service, pest, customer, year],
  );

  const framingLocations = region === all ? filtered : regionalRecords;
  const activeSelected = selected && filtered.some((item) => item.slug === selected.slug)
    ? selected
    : filtered[0] ?? null;

  const changeRegion = (nextRegion: string) => {
    const nextRecords = nextRegion === all
      ? treatedLocations
      : treatedLocations.filter((item) => item.region === nextRegion);
    setRegion(nextRegion);
    if (service !== all && !nextRecords.some((item) => item.servicePerformed === service)) setService(all);
    if (pest !== all && !nextRecords.some((item) => item.pest === pest)) setPest(all);
    if (customer !== all && !nextRecords.some((item) => item.customerType === customer)) setCustomer(all);
    if (year !== all && !nextRecords.some((item) => String(item.year) === year)) setYear(all);
  };

  const selectLocation = (location: GalleryItem) => {
    setSelected(location);
    if (isMobile) setMobileSheetOpen(true);
  };

  const resetFilters = () => {
    setRegion(all); setService(all); setPest(all); setCustomer(all); setYear(all);
  };

  return (
    <div className={compact ? "map-explorer compact" : "map-explorer"}>
      {!compact ? (
        <div className="map-filters" aria-label="Filter treated locations">
          <div className="filter-title"><Filter aria-hidden="true" /><span>Filter records</span></div>
          <FilterSelect label="Region" value={region} options={regionOptions} onChange={changeRegion} />
          <FilterSelect label="Service" value={service} options={serviceOptions} onChange={setService} />
          <FilterSelect label="Pest" value={pest} options={pestOptions} onChange={setPest} />
          <FilterSelect label="Customer" value={customer} options={customerOptions} onChange={setCustomer} />
          <FilterSelect label="Year" value={year} options={yearOptions} onChange={setYear} />
          <Button type="button" variant="ghost" size="sm" onClick={resetFilters}><RotateCcw aria-hidden="true" />Reset</Button>
        </div>
      ) : null}
      <div className="map-explorer-grid">
        <div>
          <div className={filtered.length ? "map-stage" : "map-stage map-stage-empty"}>
            <MapCanvas mode="treated" locations={filtered} fitLocations={framingLocations} onLocationSelect={selectLocation} className={compact ? "map-compact" : "map-large"} />
            {!filtered.length ? (
              <div className="map-empty-overlay" role="status" aria-live="polite" aria-atomic="true">
                <div className="map-empty-state">
                  <SearchX aria-hidden="true" />
                  <strong>No results found</strong>
                  <p>No treated locations match the selected filters.</p>
                  {!compact ? <Button type="button" onClick={resetFilters}>Reset filters</Button> : null}
                </div>
              </div>
            ) : null}
          </div>
          <p className="privacy-note"><ShieldCheck aria-hidden="true" />Pins use generalized coordinates and do not identify an exact property address.</p>
        </div>
        {!compact ? <div className="map-desktop-detail">{activeSelected ? <LocationDetails location={activeSelected} /> : <p>No records match these filters.</p>}</div> : null}
      </div>
      {!compact ? (
        <div className="location-list" aria-label="Accessible treated location list">
          <div className="location-list-heading"><h2>Location list</h2><span>{filtered.length} {filtered.length === 1 ? "record" : "records"}</span></div>
          {filtered.length ? filtered.map((location) => (
            <Link className="location-list-item" key={location.slug} href={`/gallery/${location.slug}`} aria-label={`View ${location.title} in gallery`}>
              <span><strong>{location.title}</strong><small>{location.generalLocation} · {location.servicePerformed}</small></span>
              <ArrowRight aria-hidden="true" />
            </Link>
          )) : <p className="empty-state">No records match these filters. Reset the filters to see all locations.</p>}
        </div>
      ) : null}
      <Sheet open={isMobile && mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
        <SheetContent
          side="bottom"
          className="location-sheet"
          onOpenAutoFocus={(event) => event.preventDefault()}
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Selected treated location</SheetTitle>
            <SheetDescription>Selected treatment details</SheetDescription>
          </SheetHeader>
          {activeSelected ? <LocationDetails location={activeSelected} /> : null}
        </SheetContent>
      </Sheet>
    </div>
  );
}
