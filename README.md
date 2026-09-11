# SmartSource Nigeria Limited — Website

A premium, image-led product-catalogue and lead-generation website for a Nigerian
construction-materials supplier. Built with Next.js App Router, TypeScript,
Tailwind CSS v4 and shadcn/ui (on a `@base-ui/react` primitive layer).

This is **not** a cart/checkout store — the primary conversions are **Request Quote**,
**Call**, and **WhatsApp**.

## Tech Stack

- **Next.js 16** (App Router, Turbopack, Server Components by default)
- **TypeScript**, strict mode
- **Tailwind CSS v4** (CSS-based theme — no `tailwind.config.js`)
- **shadcn/ui** on the `base-nova` style, built on `@base-ui/react` (not Radix)
- **Framer Motion** for animation
- **React Hook Form + Zod** for the quote/contact forms
- **Embla Carousel** (via shadcn's `Carousel`) for the hero slider

> **A note on this Next.js version:** this project intentionally pins a
> pre-release Next.js/React/shadcn combination with real API differences from
> the current stable release you may know (async `params`/`searchParams`,
> `@base-ui/react` instead of Radix under shadcn, `cn` as an installed
> package rather than a local `lib/utils.ts` helper, Cache Components as an
> **opt-in** flag rather than the default). See `node_modules/next/dist/docs/`
> for the authoritative reference before changing framework-level code.

## Installation

```bash
npm install
cp .env.example .env.local   # fill in form provider keys — see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Quote and contact form submissions go through this app's own
`/api/quote` and `/api/contact` route handlers, which forward to
[Web3Forms](https://web3forms.com) server-side. The access keys are
intentionally **not** `NEXT_PUBLIC_`-prefixed — they never need to reach the
browser, since submission happens through our own route.

```env
QUOTE_FORM_ACCESS_KEY=
CONTACT_FORM_ACCESS_KEY=
```

Get a free key at [web3forms.com](https://web3forms.com) (no account required).
Without a key set, submissions are logged to the server console in development
and rejected with a clear error in production — see
`src/app/api/quote/route.ts` / `src/app/api/contact/route.ts`. To switch
providers (Formspree, Basin), edit only those two files — `src/lib/forms.ts`,
which the UI calls, never talks to a provider directly.

## Folder Structure

```
src/
  app/                    Routes (App Router)
    products/
      page.tsx             /products — filterable catalogue
      [category]/          /products/[category]
        [subcategory]/     /products/[category]/[subcategory]
      item/[slug]/         /products/item/[slug] — canonical product URL
    api/quote/, api/contact/   Form submission route handlers
  components/
    atoms/                 Smallest building blocks (Button, Price, Container…)
    molecules/              ProductCard, CategoryCard, forms fields…
    organisms/               Navbar, Footer, ProductFilters, QuoteDialog…
    sections/                Homepage/page sections (HeroSection, FaqSection…)
    ui/                     shadcn primitives (generated — avoid hand-editing)
  config/                  site.ts (business info), navigation.ts, social.ts
  data/                    categories.ts, products.ts, testimonials.ts, etc.
  lib/                     Domain utilities — no UI concerns
  hooks/                   useProductFilters, useRecentlyViewed, etc.
  types/                   product.ts, category.ts, quote.ts, common.ts
```

Every reusable component lives in its own folder with an `index.ts` barrel
(`ProductCard/ProductCard.tsx` + `ProductCard/index.ts`), so tests can sit
alongside the component later without restructuring.

## How Categories Work

Categories and subcategories live in `src/data/categories.ts` as a single
typed array (`Category[]`). Adding a category is a **data-only change** —
the sticky category nav, the mega menu, the homepage showcase and the
`/products/[category]` routes all read from this one file and pick it up
automatically (routes are statically generated via `generateStaticParams`).

```ts
// src/data/categories.ts
{
  id: "roofing",
  slug: "roofing",
  name: "Roofing",
  image: "/images/categories/roofing.jpg",
  subcategories: [
    { id: "longspan-aluminium", slug: "longspan-aluminium", name: "Longspan Aluminium", image: "..." },
  ],
}
```

**To add a subcategory:** append to that category's `subcategories` array — no
new files or UI code needed.

## How Products Work

Products live in `src/data/products.ts` as a typed `Product[]` (see
`src/types/product.ts`). Each product references its parent category and
subcategory by `id` (not `slug`), and has a stable, SEO-friendly canonical
URL at `/products/item/[slug]` — independent of its category, so
re-categorizing a product never breaks its URL.

```ts
{
  id: "dangote-cement-42-5r",
  slug: "dangote-cement-42-5r",
  categoryId: "cement-concrete",
  subcategoryId: "cement",
  price: 11500,
  unit: "bag",
  availability: "in-stock",
  // ...
}
```

Prices are **numbers**, formatted for display via `formatCurrency()` /
`formatPriceWithUnit()` in `src/lib/currency.ts`. Prices in the sample
dataset are indicative Nigerian market ranges — confirm current pricing
before publishing (see the disclaimer rendered on every product page via
`PRICE_DISCLAIMER` in `src/lib/constants.ts`).

Domain query helpers (`getProductsByCategory`, `getRelatedProducts`,
`filterProducts`, `sortProducts`, etc.) live in `src/lib/products.ts` — kept
out of components on purpose, so the data layer can migrate to a CMS
(Sanity/Strapi/Supabase) later with UI changes limited to swapping these
functions for API calls.

## How Weekly Product Rotation Works

"Popular This Week" and "Recently Supplied" use a **deterministic** weekly
selection (`src/lib/weekly.ts`) seeded by the current ISO week number
(e.g. `2026-W37`), not `Math.random()`. This means:

- Every visitor sees the same selection all week (no per-request flicker).
- The selection changes automatically at the start of the next ISO week.
- No hydration mismatch — the seed never depends on render time, and the
  selection is computed server-side and sent as static HTML.

## How Recently Viewed Works

`src/hooks/useRecentlyViewed.ts` stores up to 8 product IDs in
`localStorage`, client-side only (the read happens inside a `useEffect`, so
there's no server/client markup mismatch). `ProductActions` records a view
on mount; `RecentlyViewedRail` reads it back on the product page.

## How the Quote Flow Works

`RequestQuoteButton` (any product card, product page, or CTA section) calls
`useQuoteDialog().openQuote(product?)`, a small React Context provider
(`src/components/organisms/QuoteDialog/`) — not a global state library, per
the brief. This opens a slide-over form pre-filled with the product name
where relevant, validated with Zod (`src/lib/schemas.ts`) via React Hook
Form, and submitted through `submitQuoteRequest()` → `/api/quote`.

## How WhatsApp Works

`src/config/site.ts` holds the WhatsApp number and default message. The
floating `WhatsAppButton` (every page) and product-page WhatsApp links build
a `https://wa.me/<number>?text=<message>` deep link — product pages
pre-fill "I'm interested in [Product Name]."

## How to Replace Images

**No real product/category/editorial photography exists yet**, but every
path the site references *does* have a real file —
`scripts/generate-placeholder-images.py` generates an on-brand placeholder
(charcoal/gold gradient + caption) at every image path in `src/data/*` and
the hardcoded editorial paths in components. Run it again any time you add a
product, category, hero slide, etc.:

```bash
python3 scripts/generate-placeholder-images.py   # requires Pillow: pip install pillow
```

`ImageWithFallback` (`src/components/atoms/ImageWithFallback/`) still exists
as a safety net for any path that isn't covered (e.g. a manually-added
image reference the generator doesn't know about) — it catches the load
failure and renders the same style of placeholder client-side.

To add real photography: just overwrite the file at its existing path under
`public/images/...` (see the `// IMAGE REQUIRED` comments in `data/` files
for subject/aspect-ratio guidance, or the "SmartSource Image Kit" prompt
reference if one was generated for this project) — no code changes needed.

**Two things to not run through an AI image generator or this script:**
partner logos (`public/images/partners/*.png` are placeholder wordmarks, not
real brand marks — an AI-generated likeness of a real company's logo is a
trademark problem) and testimonial headshots once they represent real named
clients (a generated face on a real quote reads as fabricated).

## Logo, Favicon &amp; Social Icons

These are real brand assets, not generated placeholders, and the generator
script above never touches them:

- **Logo** — `src/components/atoms/Logo/Logo.tsx` renders
  `public/images/logo.png` (a whitespace-trimmed crop of the source lockup
  at `public/images/logo.jpeg`). On dark surfaces (the footer) it sits on an
  explicit white card, since the source image has an opaque white
  background. To swap the logo: replace `public/images/logo.png` with a new
  image at a similar aspect ratio — the component sizes purely by height
  (`h-11`/`sm:h-12`) and derives width from the image's own ratio, so a very
  different aspect ratio will need a matching adjustment there.
- **Favicon** — the full package (`favicon.ico`, `favicon.svg`,
  `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`,
  `site.webmanifest`) lives in `public/` and is wired up via
  `metadata.icons` / `metadata.manifest` in `src/app/layout.tsx` — **not**
  Next's `src/app/favicon.ico` file-convention. Don't add files named
  `favicon.ico`, `icon.png`, or `apple-icon.png` into `src/app/`; Next
  auto-detects those and would inject a second, conflicting set of icon
  tags alongside the real ones.
- **Social icons** — `src/config/social.ts` points at real brand SVGs under
  `public/images/socials/`. Each entry has a `chipTone` (`"light"` or
  `"dark"`) controlling the footer badge background — the X icon is a plain
  white glyph and needs a dark chip to stay visible; the rest are full-color
  and use a light chip. The floating WhatsApp button
  (`src/components/molecules/WhatsAppButton/`) also uses a real icon
  (`whatsapp-color-icon.svg`) with no extra background, since the icon is
  already a complete rounded badge shape.

## How to Change Company Information

Everything business-level — phone, WhatsApp, email, address, business hours,
social links, tagline — lives in **one file**: `src/config/site.ts`
(`siteConfig`). Nothing else in the codebase should hardcode this
information; update it once here.

## How to Update Policies

Privacy Policy, Delivery Policy, Return Policy and Terms of Use are in
`src/app/{privacy-policy,delivery-policy,return-policy,terms-of-use}/page.tsx`,
each composing `src/components/sections/PolicyLayout/`. **The current copy is
placeholder text — have it reviewed by counsel before production launch.**

## Fonts

Manrope (UI/body) and Cormorant Garamond (display headings, used sparingly)
are self-hosted via `next/font/local` from `src/app/fonts/` rather than
`next/font/google` — this development sandbox couldn't reach
`fonts.googleapis.com` from Turbopack's build process specifically (regular
HTTP requests worked fine; the font-fetch step in particular didn't). The
files served are byte-identical to what Google Fonts would serve for the
same subset/weight range, so this has no visual effect — it's a
self-hosting choice that's arguably better for production anyway (no
runtime dependency on Google's CDN). If you'd rather use `next/font/google`
directly, swap the `localFont(...)` calls in `src/app/layout.tsx`.

## Known Gaps / Follow-ups

- **Three.js 3D decorative sections** (hero and media page) from the brief
  were **not implemented** in this pass — they're marked optional in the
  brief, and doing them properly (lazy-loaded, mobile fallback,
  performance-budgeted) is its own scoped piece of work. Everything else in
  the 105-point brief is implemented.
- Real photography (currently generated placeholders — see "How to Replace
  Images" above), a real logo mark (currently a text wordmark + generated
  favicon), verified trust-section statistics, genuine testimonials, real
  partner logos, and final legal copy are all placeholder/sample content
  clearly marked as such in code (`isSample: true` on testimonials/partners)
  — replace before launch.
- Quantity selected on the product page doesn't yet pre-fill into the quote
  form (only product name/ID do) — a small enhancement if needed.

## Development

```bash
npm run dev      # start dev server (Turbopack)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
```

## Deploying

Standard Next.js deployment (Vercel or any Node host). Set
`QUOTE_FORM_ACCESS_KEY` and `CONTACT_FORM_ACCESS_KEY` in your host's
environment variables before going live.
