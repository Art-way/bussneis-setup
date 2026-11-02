# Arabic typography and reading refinement

2 November 2026. A refinement of the existing Arabic identity for the temporary review repository.

## Typography and layout

- Retained the existing locally hosted, licensed UAE Arabic family and its three weights. No new font downloads, client libraries or third-party requests were added.
- Arabic headings use natural letter spacing at each breakpoint. Body copy is17px; article paragraphs are18px on desktop and mobile, with1.95 line height. Article text uses a maximum720px reading column on wide screens.
- Increased navigation, article metadata, card descriptions, footer links and supporting text sizes. Primary buttons have a consistent54px minimum height; the mobile menu button is44px square.
- Balanced hero spacing and mobile button layout. The existing ivory, emerald and orange palette remains the visual identity.

## Editorial experience

- Desktop articles retain their visible side index. Mobile articles use a native, initially collapsed disclosure containing all article sections and the official-source link. It works with the keyboard and without JavaScript; print exposes the full index.
- Publisher names, roles and publication/update dates are more prominent. The publisher panel links to both the publisher profile and the editorial/correction policy.
- Authorship remains attributed to the real publishing organization. No person, qualification or specialist review was invented; publication and modification dates remain unchanged.
- Category covers now have distinct authored SVG motifs: company formation, map/compass, budget planning and operational checklist. No raster-image downloads were added.
- Latin publisher monograms explicitly use left-to-right direction inside the RTL interface.
- Decorative motion remains optional and respects reduced-motion preferences. Added step-hover feedback uses CSS only.

## Verification

Production build and scoped ESLint pass. HTTP checks cover all20Arabic routes, three English pages, search indexing rules, sitemap and branded404. Browser checks cover375/390/768/1024/1440px, plus320px home/service/contact checks; no horizontal overflow was observed. Twelve axe scans across six templates at390/1440px reported zero WCAG2A/AA/2.1AA violations. Final focused checks verify publisher monograms, motion preferences, navigation and caption visibility. These are scoped lab checks, not accessibility certification or field-performance guarantees.

The temporary Vercel deployment is not managed by this change. Continue to import the full repository using the setup in `preview-deployment.md`.

## Current mobile lab measurements

These measurements belong to typography source commit `f2cd47f`, before the subsequent Arabic URL migration. One report per case was retained after that build. Methods are deliberately listed separately; simulation does not reproduce actual DevTools throttling. The later URL-only change is verified separately in `arabic-url-migration.md`.

| Page | Method | Performance | Accessibility / best practices / SEO | FCP | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Arabic home | DevTools actual throttling |84|100 /100 /100|2657ms|3057ms|282ms|0|
| Arabic home | Standard simulation |100|100 /100 /100|945ms|1819ms|27ms|0.000329|
| Arabic blog | Standard simulation |95|100 /100 /100|1018ms|1018ms|250ms|0|

The home still has room for improvement under actual slow-device/network throttling; its measured LCP and TBT do not meet all good thresholds. These are individual local lab observations, not stable score estimates, deployment measurements or field Core Web Vitals. No benchmarks were repeated to obtain a preferred score.
