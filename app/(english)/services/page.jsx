// In: app/services/page.jsx

import ServicePage from '@/components/pages/services/service';
import serviceListingData from '@/components/data/service-listing-data.jsx'; // Import data for schema

// --- ADDED: Metadata for the main Services page ---
export const metadata = {
  title: "Our Services - Company Formation & PRO Services UAE",
  description: "Explore our comprehensive services including mainland, free zone, and offshore company setup, PRO services, bank account opening, and visa assistance in the UAE.",
  alternates: {
    canonical: "/services",
  },
  other: {
    "script[type='application/ld+json']": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Business Setup Services",
      "description": "Core services offered by BSetup UAE.",
      "itemListElement": serviceListingData.map((service, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Service",
          "name": service.title,
          "description": service.description,
          "url": `https://businesssetupuae.ae${service.link}`
        }
      }))
    })
  }
};


const ServicePages = () => {
    return (
        <>
            <ServicePage />
        </>
    );
};

export default ServicePages;