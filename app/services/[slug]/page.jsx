// In: app/services/[slug]/page.jsx

// Server Component

import allServicesData from "@/components/data/services-data.jsx"; 
import { notFound } from 'next/navigation';
import ServiceClientPage from './service-client-page'; // The name of your client component file

// generateMetadata stays the same and is correct.
export async function generateMetadata({ params }) {
  const service = allServicesData.find((s) => s.slug === params.slug);
  if (!service) notFound();
  return {
    title: service.pageTitle,
    description: service.schema.description,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

// The Page component now ONLY fetches data and passes it.
const Page = ({ params }) => {
  const serviceContent = allServicesData.find((service) => service.slug === params.slug);
  if (!serviceContent) notFound();

  // Pass the entire serviceContent object, which includes the schema.
  return <ServiceClientPage serviceContent={serviceContent} />;
};

export default Page;