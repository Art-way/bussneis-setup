// In: app/faq/page.jsx

import FaqComponent from "@/components/pages/faq";
import faqData from "@/components/data/faq";

// --- CORRECTED: Using metadata API for SEO and Schema ---
// The incorrect import line has been removed.
export const metadata = {
  title: "FAQ - Business Setup in UAE",
  description: "Find answers to common questions about company formation, mainland vs free zone, visas, and corporate tax in the UAE.",
  alternates: {
    canonical: "/faq",
  },
  other: {
    "script[type='application/ld+json']": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [...faqData.faqOne, ...faqData.faqTwo].map(faq => ({
        "@type": "Question",
        "name": faq.title,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.des
        }
      }))
    })
  }
};

const FaqPage = () => {
    return (
        <>
            <FaqComponent />
        </>
    );
};

export default FaqPage;