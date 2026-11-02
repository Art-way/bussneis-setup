# Arabic public URLs

All content URL segments after `/ar/` now use readable Arabic names. The homepage remains `/ar/`.

| Area | Example canonical path |
| --- | --- |
| Services | `/ar/الخدمات/` |
| Service detail | `/ar/الخدمات/تأسيس-شركة-في-البر-الرئيسي/` |
| Contact | `/ar/تواصل-معنا/` |
| Blog | `/ar/المدونة/` |
| Article | `/ar/المدونة/تأسيس-شركة-في-الإمارات-من-مصر/` |
| Category | `/ar/المدونة/تصنيف/تأسيس-الشركات/` |
| Publishers | `/ar/المؤلفون/` |
| Publisher profile | `/ar/المؤلفون/فريق-التحرير/` |
| Editorial policy | `/ar/سياسة-التحرير/` |

The19previous URLs using English segments receive direct permanent308redirects to the Arabic canonicals. Query strings are preserved; existing article section bookmarks still work. Canonical links, Open Graph, structured data, navigation, related articles/services, search forms,404links and sitemap use the new URLs. Sitemap and metadata URLs use standard percent encoding for their non-ASCII characters.

## Implementation

`components/arabic/routes.mjs` defines the public section/record slugs and redirect map. Stable internal record IDs remain unchanged, so category filtering, related articles, author attribution and illustration selection continue to use their original keys. New content needs an explicit public slug in this table.

The installed Next16.4.3 segment-key encoder calls `btoa` on static filesystem segment names and rejects Arabic names. This was reproduced locally; the same failure is described in [the upstream issue](https://github.com/vercel/next.js/issues/97886). The normal build failed when literal Arabic static route folders were used.

The supported `app/ar/[...path]/page.jsx` route therefore receives Arabic path values and dispatches the19known pages to their existing Server Component views in `components/arabic/views/`. The views retain their metadata and static generation where applicable. Unknown and malformed paths remain4xx; the proxy normalizes Unicode NFC and handles the legacy redirects. No dependency patch, experimental flag or response-output transformation is used. Only the existing homepage retains its native Pages API renderer.

## Verification

Run against a production preview:

```sh
node scripts/verify-arabic-urls.mjs http://127.0.0.1:5047
```

The verification passed131checks across20canonical pages and19legacy redirects, including SSR, encoded self-canonicals, internal/schema URLs, search noindex, sitemap, NFC normalization, unknown/malformed paths and English route compatibility. Browser verification passed29checks over17navigation states: category filtering, publisher links, service/contact/policy transitions, Back/Forward, legacy search/bookmarks, mobile menu/index, accessibility smoke and JavaScript-disabled article rendering. No page or console errors were observed.

References: [Next redirects](https://nextjs.org/docs/app/guides/redirecting), [Google URL structure](https://developers.google.com/search/docs/crawling-indexing/url-structure).
