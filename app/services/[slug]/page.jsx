// In: app/services/[slug]/page.jsx

// This is the final, corrected Server Component for service pages.

import allServicesData from "@/components/data/services-data.jsx"; 
import { notFound } from 'next/navigation';
import ServiceClientPage from './service-client-page';

// This function handles the basic SEO meta tags. It doesn't need the full valid schema.
export async function generateMetadata({ params }) {
  const service = allServicesData.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return {
    title: service.pageTitle,
    description: service.schema.description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  };
}


const Page = ({ params }) => {
  const serviceContent = allServicesData.find((service) => service.slug === params.slug);

  if (!serviceContent) {
    notFound();
  }

  // --- AUTOMATIC SCHEMA CORRECTION LOGIC ---
  // 1. Create a deep copy of the schema to safely modify it.
  const correctedSchema = JSON.parse(JSON.stringify(serviceContent.schema));

  // 2. If a 'review' object exists, add the required 'itemReviewed' field to it.
  if (correctedSchema.review) {
    correctedSchema.review.itemReviewed = {
      "@type": "Service",
      "name": correctedSchema.name // It uses the service name from the schema itself.
    };
  }

  // 3. If an 'aggregateRating' object exists, add the required 'itemReviewed' field to it.
  if (correctedSchema.aggregateRating) {
    correctedSchema.aggregateRating.itemReviewed = {
      "@type": "Service",
      "name": correctedSchema.name
    };
  }
  // --- END OF CORRECTION LOGIC ---

  return (
    <>
      {/* 4. Inject the new, CORRECTED schema into the page. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(correctedSchema) }}
      />
      
      {/* The client component receives the original, unmodified data for display purposes. */}
      <ServiceClientPage serviceContent={serviceContent} />
    </>
  );
};

export default Page;