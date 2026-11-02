---
name: DMSA Pest Control Services
description: Calm, evidence-led pest and termite control, shown through real job photos and clear steps.
colors:
  wine-red: "#7b1113"
  wine-red-dark-surface: "#b63a3e"
  rose-text-dark: "#e58b8e"
  rose-text-footer: "#f0bdc0"
  charcoal: "#273239"
  footer-charcoal: "#202b30"
  page-light: "#f7f7f5"
  surface-white: "#ffffff"
  page-dark: "#151c20"
  surface-dark: "#1d272c"
  muted-text-light: "#596660"
  muted-text-dark: "#b1bcc1"
  border-light: "#dce1dc"
  border-dark: "#3d494f"
  tint-light: "#f4e9e9"
  tint-dark: "#3d2729"
  wine-red-deep: "#5f0c10"
  success-bg: "#e7f4e9"
  success-text: "#255b31"
  success-border: "#9bc9a4"
  success-bg-dark: "#203b27"
  success-text-dark: "#b7eac0"
  success-border-dark: "#416c4a"
  success-icon: "#23834b"
  error-bg: "#f8e2e2"
  button-shadow: "rgba(28, 8, 9, 0.18)"
  photo-footer-scrim: "rgba(28, 22, 24, 0.53)"
  photo-text-shadow: "rgba(0, 0, 0, 0.34)"
typography:
  hero:
    fontFamily: "Poppins, Segoe UI, sans-serif"
    fontSize: "72px"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.045em"
  title:
    fontFamily: "Poppins, Segoe UI, sans-serif"
    fontSize: "44px"
    fontWeight: 600
  heading:
    fontFamily: "Poppins, Segoe UI, sans-serif"
    fontSize: "32px"
    fontWeight: 600
  card:
    fontFamily: "Poppins, Segoe UI, sans-serif"
    fontSize: "20px"
    fontWeight: 600
  body:
    fontFamily: "Inter, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Inter, Segoe UI, sans-serif"
    fontSize: "14px"
    fontWeight: 600
  label-small:
    fontFamily: "Inter, Segoe UI, sans-serif"
    fontSize: "12px"
    fontWeight: 400
rounded:
  tail: "4px"
  pin: "6px"
  control: "8px"
  media: "12px"
  panel: "16px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.wine-red}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.control}"
  hero-button:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.wine-red}"
    rounded: "{rounded.control}"
    height: "52px"
  panel:
    backgroundColor: "{colors.surface-white}"
    rounded: "{rounded.panel}"
    padding: "24px"
  input:
    backgroundColor: "{colors.surface-white}"
    rounded: "{rounded.control}"
    height: "48px"
---

# Design System: DMSA Pest Control Services

## Overview

**Creative North Star: "The Site Inspection"**

The site behaves like a good technician on a first visit: calm, plain and led by what the property shows. Real job photographs carry the proof, numbered steps explain what happens next, and quotation and phone actions stay close at hand.

Wine red is the single brand colour against charcoal, white and soft neutral grays. Density is moderate, with room around sections and tighter groups inside them. Decoration is rare because evidence does the persuading.

**Key Characteristics:**
- Real DMSA photography, never stock imagery or illustration standing in for work.
- One brand colour, used for actions, labels and icons.
- Plain language grounded in confirmed service details.
- Light mode by default, with a full dark theme.

## Colors

A restrained palette of wine red over charcoal and warm-neutral surfaces, as requested by the owner.

### Primary
- **Wine Red:** buttons, active navigation, the call-to-action band, and text and icons in light mode.
- **Wine Red, Dark Surface:** button and other solid fills in dark mode only. It is too dim for text.
- **Rose Text, Dark:** red text and icons in dark mode (`--primary-text`).
- **Rose Text, Footer:** red text and icons inside the always-dark footer.

### Neutral
- **Charcoal / Footer Charcoal:** body text and headings in light mode; the footer surface.
- **Page Light / Surface White:** page background and panels in light mode.
- **Page Dark / Surface Dark:** page background and panels in dark mode.
- **Muted Text:** supporting copy in each theme.
- **Border:** one-pixel dividers and panel outlines in each theme.
- **Tint:** quiet callouts and icon wells in each theme.

- **Status colours:** the green and red tints are only for form success and error messages.

### Named Rules
**The Two Reds Rule.** `--primary` is for fills and `--primary-text` is for text and icons. Any section that overrides one must override the other.

**The Photo Exception.** White text and translucent white or black values on photographs and on the wine-red band stay hard-coded, because they don't change with the theme.

## Typography

**Display Font:** Poppins (with Segoe UI, sans-serif)
**Body Font:** Inter (with Segoe UI, sans-serif)

**Character:** Rounded, confident headings over a neutral, highly legible body face. Both load through `next/font`.

### Hierarchy
- **Hero** (500, up to 72px, 1.08): the homepage heading only, set in white over photography.
- **Title** (600, up to 56px): page headings.
- **Heading** (600, 32–44px): section headings.
- **Card** (600, 20–24px): panel and list-item titles.
- **Body** (400, 16px, 1.7): running text, limited to about 70 characters per line.
- **Label** (600, 14px): small labels, links and metadata. 12px is the floor, used only in compact chat and map details.

### Named Rules
**The Search Words Rule.** Headings name the service and place in customers' own words, including "anay", rather than a slogan.

## Layout

Content sits in a centred container of up to 1200px, with sections spaced around 64–96px apart. Grids collapse to a single column on phones, and the page never scrolls sideways at 320px. On phones, a fixed action bar offers Call, Viber and Get quote.

## Elevation & Depth

Depth comes mostly from tonal layers and one-pixel borders, so surfaces sit flat at rest. Soft shadows with an offset (`0 8px 24px` at low opacity) are kept for floating elements such as the map popups, dialogs and chat button.

## Shapes

Gently rounded corners are used throughout: 8px on controls and callouts, 12px on media and 16px on panels. Pill shapes are for the floating chat button and quick-reply chips, chat bubbles get a small 4px tail corner, and the map pin has its own 6px point. Panels are defined by a full one-pixel outline, never by a coloured edge.

## Components

### Buttons
- **Shape:** gently curved (8px), at least 44px tall in key actions and 52px in heroes.
- **Primary:** solid red with white text and a trailing arrow when it moves the visitor forward.
- **On photos or red:** white with red text, or a white outline.
- **Focus:** a visible 3px ring on every interactive element.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** the surface colour with a one-pixel border; tinted fill for callouts.
- **Internal Padding:** 24–32px.

### Inputs / Fields
- **Style:** 48px tall, 8px corners, one-pixel border, 16px text.
- **Focus / Error:** the border shifts with a visible ring, and errors use the destructive red with a written message.
- **Consent checkboxes:** 24px, with a clickable label.

### Navigation
- **Desktop:** text links in muted colour, with an animated underline in red for the current page.
- **Mobile:** a slide-in sheet plus the fixed action bar.

### Homepage Slideshow
Full-bleed job photos behind the hero. It advances every 6.5 seconds, has a visible pause button, pauses while the pointer or keyboard focus is on its controls, and stays still for visitors who prefer reduced motion.

## Do's and Don'ts

### Do:
- **Do** use real, approved DMSA photos and generalized locations.
- **Do** use `--primary-text` for any red text or icon.
- **Do** keep colour changes and loading spinners working when reduced motion is on, and drop movement instead.
- **Do** give tap targets at least 24px, and 44px on touch devices where space allows.

### Don't:
- **Don't** add a small label above a heading.
- **Don't** add thick coloured edges to cards or callouts. Use a tint or a one-pixel divider.
- **Don't** nest a card inside a card.
- **Don't** introduce colours outside the wine-red, charcoal, white and neutral-gray palette.
- **Don't** publish exact customer addresses, or unverified ratings, guarantees, certifications or prices.
