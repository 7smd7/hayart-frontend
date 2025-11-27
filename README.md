<div align="center">
	<img src="./public/logo.svg" alt="HayArt Cultural Centre" height="90" />
	<h1>HayArt Frontend</h1>
	<p><strong>Brutalist cultural platform</strong> built with Next.js 16, WordPress (WPGraphQL), Apollo Client & Atomic Design.</p>
</div>

## Overview

This repository powers the public website for HayArt Cultural Centre. It consumes structured content from a WordPress WPGraphQL backend and presents events, news posts, and static pages with a fast, SEO-optimized Next.js App Router architecture.

Key goals:
- Fast, cache‑friendly server components
- Domain‑driven, modular architecture (types, services, utils, components)
- Strong SEO (dynamic metadata, OpenGraph/Twitter cards, title templates)
- Scalable visual system (Atoms → Molecules → Organisms → Features)
- Brutalist, high‑contrast UI with clear hierarchy

## Tech Stack

| Layer          | Technology |
|----------------|------------|
| Framework      | Next.js 16 (App Router, Turbopack) |
| UI             | React 19, Tailwind CSS 4 (via `@import "tailwindcss"`) |
| Data           | WordPress + WPGraphQL |
| Client         | Apollo Client (SSR safe) |
| Images         | Next Image optimization |
| Carousel       | Embla (`embla-carousel-react` + autoplay plugin) |
| Icons          | `react-icons` FontAwesome set |
| Fonts          | Geist Sans & Mono via `next/font` |

## Project Structure

```
src/
	app/                  # Route segments & layouts
	components/           # Atomic design (atoms/molecules/organisms/features)
	services/             # Data-access (GraphQL queries)
	types/                # Centralized TS domain models
	utils/                # Pure helpers (date, metadata, social, event)
	lib/                  # Apollo client setup
	styles/               # Global CSS & WP content styling
```

See `docs/ARCHITECTURE.md` for a deeper breakdown.

## Core Features

- Hero Slider (Embla) for upcoming events
- Collapsible Calendar with month/day grouping
- Event detail pages (date/time/location/entry)
- News listing & post detail pages
- Dynamic generic page route (`/[slug]`) for WP pages (`/about-us`, `/history`, `/visit`, `/contact`)
- Social footer (ordered from WP custom field `order`)
- Dynamic SEO metadata (`generateMetadata` per route)
- Automatic title templating: `"%s | SiteTitle"`

## Dynamic Metadata Strategy

Implemented via Next.js `generateMetadata` in:
- `src/app/layout.tsx` (global defaults & template)
- `blog/[slug]/page.tsx`, `event/[slug]/page.tsx`, `[slug]/page.tsx`

Utilities in `src/utils/metadata.utils.ts`:
- `decodeHtmlEntities`, `stripHtmlTags`, `truncateText`, `generateDescription`, `getAbsoluteUrl`

Fallback image: `/favicon.svg` (square) and `/logo.svg` when no featured image.

## Data Services

All GraphQL queries live in `src/services/`:
- `post.service.ts` – posts & single post
- `event.service.ts` – events, single event, hero events
- `page.service.ts` – generic WP pages by URI
- `social.service.ts` – social links with `order`
- `settings.service.ts` – site title/description/url

Each function returns typed models from `src/types/` (e.g. `Event`, `PostDetail`, `Page`).

## Datetime Formatting

`formatDateTimeRange(start, end, mode)` in `date.utils.ts`:
- Card mode: `12:00 — 09:00 NOV 28` (same day) or `12:00 NOV 25 — NOV 28`
- Detail mode: `12:00 NOV 25 — 09:00 NOV 28` (full clarity)

## Social Links Ordering

`social.service.ts` filters links whose `socialDetails.order` is null/undefined, then sorts ascending. Add/change positions in WordPress without code changes.

## WP Content Styling

Custom `.wp-content` class (see `globals.css`) restores proper bullet lists, headings, links and block elements from WP block editor HTML.

## Getting Started

### 1. Requirements

- Node 18+ (recommended LTS)
- A running WordPress instance with WPGraphQL plugin

### 2. Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT=https://your-wp-site.com/graphql
```
Add others as needed (analytics, etc.).

### 3. Install & Run

```bash
npm install
npm run dev    # Starts on port 3001 (see package script)
```
Navigate to: `http://localhost:3001`

### 4. Build
```bash
npm run build
npm start
```

## Adding a New WP Page

1. Create page in WordPress (slug e.g. `/support`)
2. Ensure it has a featured image for richer metadata (optional)
3. Visit `/support` – handled by catch‑all `[slug]` route
4. Metadata auto-generates from content (excerpt fallback logic inside util)

## Hero Slider

- Source: `getHeroEvents()` (next 5 upcoming events)
- Autoplay 5s, loop, grayscale → color on hover inside EventCard

## Calendar

- Collapsible month/day sections
- First day expanded by default
- 2 cards per row (responsive)
- Heavy borders distinguish month boundaries

## Conventions

- No business logic inside components – push to services/utilities
- All dates stored & processed as ISO strings without timezone mutation
- Avoid arbitrary re-renders: heavy work in server components
- Keep components presentation‑focused (pure props)

## Deployment

Deploy on Vercel:
1. Set `NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT` in Vercel project env
2. Enable image domains in `next.config.ts` (add your WP uploads host)
3. Trigger build – dynamic metadata runs server‑side

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Missing bullets on page | Verify `.wp-content` class applied & CSS loaded |
| Wrong time range | Check original WP datetime – must be valid ISO format |
| Social links out of order | Confirm `order` field exists & not null |
| Favicon/logo missing in metadata | Ensure `/favicon.svg` & `/logo.svg` exist in `public/` |

## Future Enhancements (Ideas)

- Image optimization with remote loader config
- Incremental revalidation per route
- Search across events & news
- RSS / ICS feed generation

---

Feel free to propose improvements or open issues. This codebase is designed to be extensible while staying lean and explicit.

