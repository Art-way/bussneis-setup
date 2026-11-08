// In: app/layout.jsx
import "../globals.css";
import Providers from "./providers"; // استدعاء المكون الذي أنشأناه

// 1. إعدادات الميتا العامة للموقع بالكامل
export const metadata = {
  metadataBase: new URL('https://businesssetupuae.ae'), // هذا يحل مشاكل الروابط النسبية
   
  alternates: {
    canonical: './',
  },
  title: {
    default: "BSetup UAE | Company Formation in Dubai",
    template: "%s | BSetup UAE" // سيظهر هذا الاسم تلقائياً بعد اسم كل صفحة
  },
  description: "Your trusted partner for company formation in Dubai and UAE. Mainland, Free Zone, and Offshore business setup services.",
  openGraph: {
    title: 'BSetup UAE',
    description: 'Expert Company Formation Services in Dubai & UAE',
    url: './', 
    siteName: 'BSetup UAE',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  // 2. إعدادات السكيما (Schema Markup)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BSetup UAE",
    "url": "https://businesssetupuae.ae",
    "logo": "https://businesssetupuae.ae/assets/brand/bsetup-uae.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+971-50-770-6746",
      "contactType": "Customer Service",
      "areaServed": "AE",
      "availableLanguage": ["English", "Arabic"]
    },
    "sameAs": [
      // ضع روابط السوشيال ميديا هنا إن وجدت
      "https://www.facebook.com/businesssetupuae", 
      "https://www.linkedin.com/company/businesssetupuae"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BSetup UAE",
    "url": "https://businesssetupuae.ae",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://businesssetupuae.ae/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        {/* إضافة خطوط جوجل هنا إن لزم الأمر */}
      </head>
      <body>
        {/* حقن السكيما */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        
        {/* تغليف المحتوى بـ Providers للتعامل مع Client Logic */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
