# Satkar Hotel, Bakery & Cafe

A premium, source-first website for **Satkar Hotel, Bakery & Cafe** in Dipayal, Doti, Nepal. Built with **React 18 + Vite + Tailwind CSS** as a clean, component-based design system — no override layers, no `!important` patches, no DOM-injection scripts.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview  # preview the production build
```

> The previous bundled site has been preserved under `legacy/` for content reference and is no longer used.

## Project structure

```
src/
  components/
    ui/           Button, Container, Section, Card, SectionHeader   ← design primitives
    layout/       Navbar, Footer, FloatingCTA                       ← app chrome
    cards/        RoomCard, GalleryCard, ReviewCard, AmenityCard    ← reusable card UI
    sections/     Hero, About, Amenities, RoomsShowcase,
                  CafeShowcase, EventsSection, GalleryPreview,
                  ReviewsSection, ContactCTA, BookingBar            ← page sections
  pages/          Home, Rooms, Gallery, About, Contact, Cafe
  data/           site, rooms, reviews, gallery, amenities          ← single source of content
  hooks/          useReveal                                         ← scroll-reveal animation
  lib/            cn (className combiner)
  index.css       global tokens + base + a few utility components
  App.jsx         routing
  main.jsx        entry
tailwind.config.js  ← all colors, fonts, radii, shadows, spacing tokens live here
```

## Design system

All visual tokens are defined in **one place**:

- **`tailwind.config.js`** — colors (`bg.primary`, `surface`, `text.primary`, `accent`, `line`, …), fonts (`display` = Cormorant Garamond, `body` = Inter), spacing (`section`, `gutter`), radius (`card`), shadows (`card`, `cinema`, `gold`), easings.
- **`src/index.css`** — minimal base layer + a handful of reusable component classes (`.eyebrow`, `.img-cinema`, `.reveal`).

To change the palette site-wide, edit `tailwind.config.js`. There are no overrides anywhere else.

## Component rules

- **Button** — only place CTAs are styled. Variants: `primary`, `ghost`, `link`. Becomes `<a>` automatically when given `href`.
- **Section** — every page section uses this for consistent vertical rhythm and surface tone.
- **Card** — base elevated surface used by every card type.
- **Navbar** — designed in-component. The mobile menu is a controlled overlay, no DOM-injection.
- **Footer** — source-rendered only.
- **Hero** — final Mona Lisa copy and CTA hierarchy live in `src/components/sections/Hero.jsx`.

## What changed vs. legacy

| Before                                                   | After                                              |
| -------------------------------------------------------- | -------------------------------------------------- |
| 974 KB single bundled `index.html`                       | Component source under `src/`, Vite build pipeline |
| Patch `<style>` blocks (`hamburger-fix`, `navbar-elevated`, `review-section-fix`, …) | Single `src/index.css` + Tailwind tokens |
| Post-load DOM styling JS                                 | Components render correct on first paint           |
| Hundreds of `!important` overrides                       | Zero `!important` in source                        |
| Mobile fixes via JS                                      | Mobile designed in-component                       |

## Deployment

`npm run build` produces a static `dist/` folder. Deploy to Netlify, Vercel, Cloudflare Pages, or any static host. No server, no Firebase required for the public site.

## Content

All copy, room data, reviews, and gallery images live in `src/data/`. Update those files to update the site.
