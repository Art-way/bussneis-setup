# Business Setup UAE

Next.js App Router website with an English section and an Arabic `/ar/` section for entrepreneurs in Egypt planning a UAE company.

## Local setup

Requires Node.js 20.9+; Node.js 22 is recommended for this preview.

```sh
npm ci
npm run lint
npm run build
npm start
```

Production preview uses port5047: [Arabic homepage](http://127.0.0.1:5047/ar/) and [Arabic blog](http://127.0.0.1:5047/ar/المدونة/). Production builds use the supported webpack option; the development server uses Next's default bundler.

## Source structure

- `app/(english)/`: original English URLs and isolated English layout/providers.
- `app/ar/`: Arabic root layout, homepage, blog, categories, articles, authors, services and contact.
- `app/ar/[...path]/page.jsx`: public Arabic URL dispatcher using supported dynamic path values.
- `components/arabic/views/`: the Arabic Server Component templates and page metadata.
- `components/arabic/routes.mjs`: Arabic public slugs and permanent redirects from the previous URLs.
- `components/arabic/content.js`: introductory articles, categories, organizational author, dates and official sources.
- `components/arabic/dubai-articles.json`: three faithful Word article imports with structured, escaped body blocks and exact SEO metadata.
- `components/arabic/market-segments.js`: emirate availability and topic taxonomy; planned emirates have no public destinations.
- `components/arabic/services.js`: Arabic service records.
- `components/arabic/blog/`: article/listing/cover templates with separate lightweight card CSS.
- `components/arabic/critical-css.js`: server-rendered Arabic base/card styles; the two authored CSS files are explicitly included in Arabic server traces by `next.config.mjs`.
- `pages/api/arabic-home.jsx`: shared-source native homepage HTML, reached by the exact `/ar/` proxy rewrite; other Arabic pages retain App Router rendering.
- `proxy.js`: Arabic route validation, derived from the content records, and an actual404 response for missing paths.
- `public/assets/arabic/`: local licensed fonts and responsive image assets; provenance in `docs/arabic-assets.md`.

## Publishing and verification

Dubai now has one main service at `/ar/تأسيس-شركة-في-دبي/`, three revised Word articles with their approved root-level Arabic slugs, and `/ar/حاسبة-تكلفة-تأسيس-شركة/` as a choice-based cost-review request form with no displayed prices. See [the latest Word revision report](docs/dubai-word-revision.md) for square illustrations, native numbering, internal links and verified email reception. [The original delivery report](docs/dubai-publication.md) retains the first implementation history. The original six introductory guides remain available. Preserve truthful publisher identity, verified service scope and actual publication dates; the educational legal model and hypothetical budget are not individualized advice.

`npm run lint` uses the standard Next configuration. Legacy native image elements produce warnings; do not change validated responsive images simply to silence them. Asset provenance and font licensing are recorded in `docs/arabic-assets.md`.

The 2 November typography, article-reading and publisher-panel improvements are documented in `docs/arabic-design-refinement.md`.

Verify Arabic routing and Dubai publication with:

```sh
node scripts/verify-arabic-urls.mjs http://127.0.0.1:5047
node scripts/verify-dubai-publication.mjs http://127.0.0.1:5047
```

Elfsight loads only when a visitor opens the consultation form. Its existing English field labels and Swedish success copy are vendor settings; the shared English widget is preserved. Actual request acceptance was tested once, with no claim about email inbox delivery. For a local disk with little free space, set `DISABLE_LOCAL_WEBPACK_CACHE=1` for a build to skip rebuildable webpack cache; leave it unset for normal deployment.

Arabic URL migration and verification are documented in `docs/arabic-url-migration.md`. Run `node scripts/verify-arabic-urls.mjs` against the local production preview to verify routes, redirects and indexing metadata.

This repository is a temporary review snapshot containing both language sections. See `docs/preview-deployment.md` for Vercel setup. Performance work is still in progress; this snapshot does not claim that every speed threshold is met. Local continuation notes and generated browser/audit files are excluded from the upload.
