export const SITE_URL = 'https://businesssetupuae.ae';

export function arabicMetadata(title, description, path = '/ar/') {
  const canonicalPath = path.endsWith('/') ? path : `${path}/`;
  return {
    title: { absolute: `${title} | Business Setup UAE` },
    description,
    alternates: { canonical: `${SITE_URL}${canonicalPath}` },
    openGraph: { title, description, url: `${SITE_URL}${canonicalPath}`, siteName: 'Business Setup UAE', locale: 'ar_EG', type: 'website', images: [{ url: `${SITE_URL}/assets/arabic/dubai-skyline.jpg`, width: 1400, height: 933, alt: 'أفق دبي وقت الغروب' }] },
  };
}

export function StructuredData({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
