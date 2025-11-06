// In: app/services/[slug]/page.jsx

// This is the Server Component.

import allServicesData from "@/components/data/services-data.jsx"; 
import { notFound } from 'next/navigation';
import ServiceClientPage from './service-client-page';

// --- UPDATED: generateMetadata now only handles standard SEO tags ---
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
    // The "other" key for schema has been REMOVED from here.
  };
}

// This is the main Page component
const Page = ({ params }) => {
  // 1. Fetch the data on the server
  const serviceContent = allServicesData.find((service) => service.slug === params.slug);

  if (!serviceContent) {
    notFound();
  }

  // --- ADDED: We create the schema object here to inject it directly ---
  const serviceSchema = serviceContent.schema;

  // 3. Render the Client Component and inject the schema script alongside it
  return (
    <>
      {/* This script tag will be rendered on the server in the final HTML */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServiceClientPage serviceContent={serviceContent} />
    </>
  );
};

export default Page;