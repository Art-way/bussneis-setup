import Header from '@/components/arabic/header';
import Footer from '@/components/arabic/footer';
import { StructuredData, SITE_URL } from '@/components/arabic/seo';
import { arabicCriticalCss, arabicCriticalCssHref } from '@/components/arabic/critical-css';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'تأسيس شركة في الإمارات | BSetup UAE', template: '%s | BSetup UAE' },
  description: 'بداية مدروسة لشركتك في الإمارات. خدمات تأسيس الشركات ودليل أعمال عربي لرواد الأعمال والمستثمرين من خارج الإمارات.',
  openGraph: { siteName: 'BSetup UAE', locale: 'ar_EG', type: 'website', images: [{ url: '/assets/arabic/dubai-skyline.jpg', width: 1400, height: 933, alt: 'أفق دبي وقت الغروب' }] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
};

export default function ArabicLayout({ children }) {
  return <html lang="ar-EG" dir="rtl"><head><style href={arabicCriticalCssHref} precedence="arabic-base">{arabicCriticalCss}</style>{[400, 500, 600].map(weight => <link key={weight} rel="preload" href={`/assets/arabic/fonts/uae-arabic-${weight}.woff2`} as="font" type="font/woff2" crossOrigin="anonymous" />)}</head><body className="ar-site"><StructuredData data={{ '@context': 'https://schema.org', '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'BSetup UAE', url: SITE_URL, contactPoint: { '@type': 'ContactPoint', telephone: '+971507706746', contactType: 'customer service', availableLanguage: ['Arabic', 'English'] } }} /><Header /><main id="main-content" tabIndex={-1}>{children}</main><Footer /></body></html>;
}
