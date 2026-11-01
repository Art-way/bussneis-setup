import { siteUrl } from '../content';

export function editorialMetadata(title, description, path, options = {}) {
  const url = `${siteUrl}${path}`;
  return {
    title: { absolute: `${title} | Business Setup UAE` }, description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website', locale: 'ar_EG', siteName: 'Business Setup UAE' },
    ...options,
  };
}

export function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export const breadcrumbs = (items) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ name: 'الرئيسية', path: '/ar/' }, ...items].map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: `${siteUrl}${item.path}` })) });
