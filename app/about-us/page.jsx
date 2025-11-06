// In: app/about-us/page.jsx

import AboutUsComponent from "@/components/pages/about";

// --- CORRECTED: Using the built-in metadata API for SEO ---
export const metadata = {
  title: "About Us",
  description: "Learn about our mission, our expert team, and our commitment to simplifying the company formation process for entrepreneurs and businesses in the UAE.",
  alternates: {
    canonical: "/about-us",
  },
  // --- ADDED: A clean way to add JSON-LD schema ---
  other: {
    "script[type='application/ld+json']": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Business Setup UAE",
      "description": "Learn about our mission, our expert team, and our commitment to simplifying the company formation process in the UAE.",
      "url": "https://businesssetupuae.ae/about-us"
    })
  }
};


const AboutPage = () => {
    return (
        <>
            {/* The SEO component is no longer needed here */}
            <AboutUsComponent />
        </>
    );
};

export default AboutPage;