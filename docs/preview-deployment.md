# Temporary review deployment

This snapshot is for reviewing the current English site and Arabic section before further improvements.

- Repository: `Art-way/bussneis-setup`
- Framework: Next.js
- Root directory: repository root
- Install command: `npm ci`
- Build command: `npm run build` (uses webpack)
- Output directory: Next.js default
- Node.js: 22.x
- Required environment variables: none for the current source
- English homepage: `/`
- Arabic homepage: `/ar/`
- Arabic blog: `/ar/المدونة/`

Build from source on Vercel; do not upload local `node_modules` or the Windows `.next` directory. The Arabic homepage uses a supported Pages API renderer behind the `/ar/` rewrite; its authored CSS and script files are explicitly included in Next's file tracing.

Use the temporary Vercel address for review. The existing main site's domain and canonical URLs remain configured for the original site. Do not connect or replace its custom domain for this review.

Public Arabic path names and legacy redirects are documented in `arabic-url-migration.md`.

The first Dubai content group is now implemented: one Dubai service and three Word-supplied articles. See `dubai-publication.md` for paths, taxonomy, form verification and remaining publication settings. Preserve truthful organizational authorship. The typography/readability update and separate historical simulated/actual-throttle lab results are documented in `arabic-design-refinement.md`; they are not measurements of this new content build.

For local rebuilds on a full disk, the optional environment flag `DISABLE_LOCAL_WEBPACK_CACHE=1` skips only webpack's rebuildable cache. Leave it unset for normal Vercel builds.
