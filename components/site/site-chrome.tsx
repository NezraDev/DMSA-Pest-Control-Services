"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Clock3,
  MapPin,
  Menu,
  MessageCircle,
  Monitor,
  Moon,
  Phone,
  ShieldCheck,
  Sun,
} from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigation } from "@/data/navigation-data";
import { services } from "@/data/services-data";
import { siteConfig } from "@/data/site-data";
import { BrandLogo } from "./brand-logo";

type Theme = "light" | "dark" | "system";

function applyTheme(theme: Theme) {
  const dark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.dataset.theme = theme;
}

function getStoredTheme(): Theme {
  const stored = window.localStorage.getItem("dmsa-theme") as Theme | null;
  return stored && ["light", "dark", "system"].includes(stored) ? stored : "light";
}

function subscribeToTheme(callback: () => void) {
  const sync = () => callback();
  window.addEventListener("storage", sync);
  window.addEventListener("dmsa-theme-change", sync);
  return () => {
    window.removeEventListener("storage", sync);
    window.removeEventListener("dmsa-theme-change", sync);
  };
}

function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getStoredTheme, () => "light" as Theme);

  useEffect(() => {
    applyTheme(theme);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystem = () => theme === "system" && applyTheme("system");
    media.addEventListener("change", syncSystem);
    return () => media.removeEventListener("change", syncSystem);
  }, [theme]);

  const nextTheme: Record<Theme, Theme> = { system: "light", light: "dark", dark: "system" };
  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="theme-button"
      onClick={() => {
        const next = nextTheme[theme];
        window.localStorage.setItem("dmsa-theme", next);
        applyTheme(next);
        window.dispatchEvent(new Event("dmsa-theme-change"));
      }}
      aria-label={`Theme: ${theme}. Change theme`}
      title={`Theme: ${theme}`}
    >
      <Icon aria-hidden="true" />
    </Button>
  );
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <>
      <div className="utility-bar">
        <div className="site-container utility-inner">
          <span className="utility-highlight"><ShieldCheck aria-hidden="true" /> Free ocular inspection with quotation</span>
          <span><MapPin aria-hidden="true" /> San Fernando, Camarines Sur</span>
          <span><Clock3 aria-hidden="true" /> Daily · 8:00 AM–5:00 PM</span>
          <a href={`tel:${siteConfig.phoneViberHref}`}><Phone aria-hidden="true" /> 0918 299 5218</a>
        </div>
      </div>
      <header className="site-header">
        <div className="site-container header-inner">
          <BrandLogo />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <ThemeToggle />
            <Button asChild className="header-quote">
              <Link href="/request-quote">Get a quotation <ArrowRight aria-hidden="true" /></Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="menu-button" aria-label="Open menu">
                  <Menu aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent className="mobile-sheet">
                <SheetHeader>
                  <SheetTitle><BrandLogo compact /></SheetTitle>
                  <SheetDescription>Practical pest management for homes and businesses.</SheetDescription>
                </SheetHeader>
                <nav aria-label="Mobile navigation" className="mobile-nav">
                  {navigation.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
                        {item.label}<ArrowRight aria-hidden="true" />
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="sheet-contact">
                  <Button asChild><Link href="/request-quote">Get a quotation <ArrowRight aria-hidden="true" /></Link></Button>
                  <a href={`tel:${siteConfig.phoneMobileHref}`}><Phone aria-hidden="true" /> Call {siteConfig.phoneMobile}</a>
                  <a href={`viber://chat?number=${encodeURIComponent(siteConfig.phoneViberHref)}`}><MessageCircle aria-hidden="true" /> Viber {siteConfig.phoneViber}</a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div className="footer-brand">
          <BrandLogo compact />
          <p>{siteConfig.description}</p>
          <Link className="text-link inverse-link" href="/request-quote">Request a quotation <ArrowRight aria-hidden="true" /></Link>
        </div>
        <div>
          <h2>Explore</h2>
          <nav aria-label="Footer navigation">
            {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
        </div>
        <div>
          <h2>Services</h2>
          <nav aria-label="Service links">
            {services.map((service) => <Link key={service.slug} href={`/services#${service.slug}`}>{service.shortTitle}</Link>)}
          </nav>
        </div>
        <div className="footer-contact">
          <h2>Contact</h2>
          <p><MapPin aria-hidden="true" /><span>{siteConfig.address}</span></p>
          <a href={`tel:${siteConfig.phoneViberHref}`}><Phone aria-hidden="true" /><span>{siteConfig.phoneViber} · Viber</span></a>
          <a href={`tel:${siteConfig.phoneMobileHref}`}><Phone aria-hidden="true" /><span>{siteConfig.phoneMobile}</span></a>
          {siteConfig.publicEmail ? <a href={`mailto:${siteConfig.publicEmail}`}><MessageCircle aria-hidden="true" /><span>{siteConfig.publicEmail}</span></a> : null}
          <p><Clock3 aria-hidden="true" /><span>{siteConfig.hours}</span></p>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <p>© {new Date().getFullYear()} DMSA Pest Control Services. All rights reserved.</p>
        <p>Map locations are generalized to protect customer privacy.</p>
      </div>
    </footer>
  );
}

export function MobileActionBar() {
  return (
    <nav className="mobile-action-bar" aria-label="Quick contact actions">
      <a href={`tel:${siteConfig.phoneMobileHref}`}><Phone aria-hidden="true" /><span>Call</span></a>
      <a href={`viber://chat?number=${encodeURIComponent(siteConfig.phoneViberHref)}`}><MessageCircle aria-hidden="true" /><span>Viber</span></a>
      <Link href="/request-quote"><ShieldCheck aria-hidden="true" /><span>Get quote</span></Link>
    </nav>
  );
}
