import ArabicHomeView, { arabicHomeMetadata } from './home';
import Footer from './footer';
import NativeAnchor from './native-anchor';
import NativeHeader from './native-header';
import { SITE_URL, StructuredData } from './seo';

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', '@id': `${SITE_URL}/#organization`,
  name: 'BSetup UAE', url: SITE_URL,
  contactPoint: { '@type': 'ContactPoint', telephone: '+971507706746', contactType: 'customer service', availableLanguage: ['Arabic', 'English'] },
};

export default function NativeHomeDocument({ css, cssHref, scriptUrl, indexable = false }) {
  const { title, description, alternates, openGraph: og } = arabicHomeMetadata;
  const image = og.images[0];
  return <html lang="ar-EG" dir="rtl"><head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title.absolute}</title>
    <meta name="description" content={description} />
    <meta name="robots" content={`${indexable ? 'index' : 'noindex'}, follow`} />
    <meta name="googlebot" content={`${indexable ? 'index' : 'noindex'}, follow, max-image-preview:large`} />
    <link rel="canonical" href={alternates.canonical} />
    {Object.entries(alternates.languages).map(([language, url]) => <link key={language} rel="alternate" hrefLang={language} href={url} />)}
    <meta property="og:title" content={og.title} /><meta property="og:description" content={og.description} /><meta property="og:url" content={og.url} />
    <meta property="og:site_name" content={og.siteName} /><meta property="og:locale" content={og.locale} />
    <meta property="og:image" content={image.url} /><meta property="og:image:width" content={image.width} /><meta property="og:image:height" content={image.height} /><meta property="og:image:alt" content={image.alt} />
    <meta property="og:type" content={og.type} />
    <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={og.title} /><meta name="twitter:description" content={og.description} />
    <meta name="twitter:image" content={image.url} /><meta name="twitter:image:alt" content={image.alt} /><meta name="twitter:image:width" content={image.width} /><meta name="twitter:image:height" content={image.height} />
    <link rel="icon" href="/icon.ico" type="image/x-icon" sizes="32x32" />
    <style href={cssHref} precedence="arabic-base">{css}</style>
    {[400, 500, 600].map(weight => <link key={weight} rel="preload" href={`/assets/arabic/fonts/uae-arabic-${weight}.woff2`} as="font" type="font/woff2" crossOrigin="anonymous" />)}
    <script src={scriptUrl} defer />
  </head><body className="ar-site">
    <StructuredData data={organizationSchema} />
    <NativeHeader />
    <main id="main-content"><ArabicHomeView LinkComponent={NativeAnchor} /></main>
    <Footer LinkComponent={NativeAnchor} />
  </body></html>;
}
