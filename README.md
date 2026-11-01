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

Production preview uses port5047: [Arabic homepage](http://127.0.0.1:5047/ar/) and [Arabic blog](http://127.0.0.1:5047/ar/blog/). Production builds use the supported webpack option; the development server uses Next's default bundler.

## Source structure

- `app/(english)/`: original English URLs and isolated English layout/providers.
- `app/ar/`: Arabic root layout, homepage, blog, categories, articles, authors, services and contact.
- `components/arabic/content.js`: introductory articles, categories, organizational author, dates and official sources.
- `components/arabic/services.js`: Arabic service records.
- `components/arabic/blog/`: article/listing/cover templates with separate lightweight card CSS.
- `components/arabic/critical-css.js`: server-rendered Arabic base/card styles; the two authored CSS files are explicitly included in Arabic server traces by `next.config.mjs`.
- `pages/api/arabic-home.jsx`: shared-source native homepage HTML, reached by the exact `/ar/` proxy rewrite; other Arabic pages retain App Router rendering.
- `proxy.js`: Arabic route validation, derived from the content records, and an actual404 response for missing paths.
- `public/assets/arabic/`: local licensed fonts and responsive image assets; provenance in `docs/arabic-assets.md`.

## Publishing and verification

The current Arabic articles are introductory content. Confirm the final taxonomy, service scope, author identities and specialist review before publishing detailed legal or tax guidance. Preserve true publication/update dates and match schema to visible content and real author data.

`npm run lint` uses the standard Next configuration. Legacy native image elements produce warnings; do not change validated responsive images simply to silence them. Asset provenance and font licensing are recorded in `docs/arabic-assets.md`.

This repository is a temporary review snapshot containing both language sections. See `docs/preview-deployment.md` for Vercel setup. Performance work is still in progress; this snapshot does not claim that every speed threshold is met. Local continuation notes and generated browser/audit files are excluded from the upload.
