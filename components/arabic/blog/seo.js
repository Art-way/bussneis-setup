import { canonicalArabicUrl } from '../routes.mjs';

export function editorialMetadata(title, description, path, options = {}) {
  const url = canonicalArabicUrl(path);
  return {
    title: { absolute: `${title} | BSetup UAE` }, description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website', locale: 'ar_EG', siteName: 'BSetup UAE' },
    ...options,
  };
}

export function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export const breadcrumbs = (items) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ name: 'الرئيسية', path: '/ar/' }, ...items].map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: canonicalArabicUrl(item.path) })) });
