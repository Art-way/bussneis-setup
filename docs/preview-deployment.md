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
- Arabic blog: `/ar/blog/`

Build from source on Vercel; do not upload local `node_modules` or the Windows `.next` directory. The Arabic homepage uses a supported Pages API renderer behind the `/ar/` rewrite; its authored CSS and script files are explicitly included in Next's file tracing.

Use the temporary Vercel address for review. The existing main site's domain and canonical URLs remain configured for the original site. Do not connect or replace its custom domain for this review.

Detailed Arabic content and taxonomy work remain a later phase. Preserve truthful organizational authorship. The current typography/readability update and separate simulated/actual-throttle lab results are documented in `arabic-design-refinement.md`. Mobile performance under actual throttling still needs improvement; lab scores are not a guarantee of this deployment's performance.
