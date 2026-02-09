// In: app/about-us/page.jsx

import AboutUsComponent from "@/components/pages/about";

// 1. تعريف الميتا تاج (SEO Metadata)
export const metadata = {
  title: "About Us", // سيقوم Next.js بإضافة "| Business Setup UAE" تلقائياً
  description: "Learn about our mission, our expert team, and our commitment to simplifying the company formation process for entrepreneurs and businesses in the UAE.",
  alternates: {
    canonical: "/about-us",
  },
};

const AboutPage = () => {
    // 2. تعريف السكيما (Schema Markup)
    const aboutSchema = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Business Setup UAE",
      "description": "Learn about our mission, our expert team, and our commitment to simplifying the company formation process in the UAE.",
      "url": "https://businesssetupuae.ae/about-us",
      "mainEntity": {
        "@type": "Organization",
        "name": "Business Setup UAE",
        "logo": "https://businesssetupuae.ae/assets/img/logo-1.png"
      }
    };

    return (
        <>
            {/* حقن السكيما بشكل صحيح */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
            />
            
            {/* استدعاء مكون التصميم */}
            <AboutUsComponent />
        </>
    );
};

export default AboutPage;