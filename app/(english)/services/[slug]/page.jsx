// In: app/services/[slug]/page.jsx

import { notFound } from 'next/navigation';
import allServicesData from '@/components/data/services-data'; 
import ServiceClientPage from './service-client-page'; 

// 1. دالة لجلب الخدمة
function getService(slug) {
  return allServicesData.find((item) => item.slug === slug);
}

// 2. توليد الميتا تاج (تم التصحيح هنا)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  // --- التصحيح ---
  // في ملف البيانات المتغير اسمه pageTitle وليس title
  const pageTitle = service.pageTitle || service.title || "Business Setup Service";
  
  // الوصف موجود داخل كائن schema في ملف البيانات، وليس في المستوى الأعلى
  const pageDescription = service.schema?.description || 
                          service.sections?.find(s => s.type === 'intro')?.description || 
                          "Expert assistance for company formation in Dubai and UAE.";

  return {
    title: pageTitle, // سيقوم Next.js بإضافة اللاحقة | Business Setup UAE تلقائياً من layout.jsx
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://businesssetupuae.ae/services/${slug}`,
      siteName: 'Business Setup UAE',
      images: [
        {
          url: '/assets/img/logo-1.png', // صورة افتراضية لأن البيانات الحالية لا تحتوي صوراً بارزة
          width: 800,
          height: 600,
          alt: pageTitle,
        },
      ],
      type: 'website',
    },
    alternates: {
      canonical: `/services/${slug}`,
    },
  };
}

// 3. مكون الصفحة
const ServiceDetails = async ({ params }) => {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  // استخدام السكيما الموجودة بالفعل في ملف البيانات
  // قمنا بإضافة context و id للكائن ليكون صالحاً
  const jsonLd = {
    ...service.schema,
    "@id": `https://businesssetupuae.ae/services/${slug}`
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://businesssetupuae.ae"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://businesssetupuae.ae/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.breadcrumbTitle || service.pageTitle,
        "item": `https://businesssetupuae.ae/services/${slug}`
      }
    ]
  };

  return (
    <>
      {/* حقن السكيما */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ServiceClientPage singleData={service} />
    </>
  );
};

export default ServiceDetails;
