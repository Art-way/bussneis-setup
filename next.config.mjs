// next.config.mjs

import { getServiceRedirects } from './components/data/service-slugs.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // يضمن هذا الخيار أن جميع الروابط تنتهي بـ / (مثل /services/uae-free-zones/)
  trailingSlash: true,

  // The Arabic server stylesheet reads these authored files at module startup.
  outputFileTracingIncludes: {
    '/ar': ['./app/ar/arabic.css', './components/arabic/blog/cards.css'],
    '/ar/**': ['./app/ar/arabic.css', './components/arabic/blog/cards.css'],
    '/api/arabic-home': ['./app/ar/arabic.css', './components/arabic/blog/cards.css', './public/assets/arabic/native-home.js'],
  },

  async redirects() {
    // 1. جلب التوجيهات الآلية لصفحات الخدمات (من القديم إلى /services/)
    const automatedServiceRedirects = getServiceRedirects();

    // 2. القائمة اليدوية للصفحات القديمة جداً والمدونة
    const manualRedirects = [
      // --- Specific Page Redirects ---
      { source: '/contact-us', destination: '/contact/', permanent: true },
      { source: '/mainland-vs-free-zone', destination: '/blog/mainland-vs-free-zone-which-is-right-for-your-business/', permanent: true },
      { source: '/our-business-setup-process', destination: '/blog/uae-company-formation-steps/', permanent: true },

      // --- Service Redirects (Old specific names to New standard names) ---
      { source: '/mainland-company-formation-services', destination: '/services/mainland-company-formation/', permanent: true },
      { source: '/free-zone-company-formation-services', destination: '/services/free-zone-company-formation/', permanent: true },
      { source: '/bank-account-opening-services', destination: '/services/corporate-bank-account-opening/', permanent: true },
      { source: '/pro-services', destination: '/services/pro-services-uae/', permanent: true },
      { source: '/license-renewal-services', destination: '/services/business-license-renewal/', permanent: true },
      { source: '/uae-visa-services', destination: '/services/uae-residence-visas/', permanent: true },
      
      // --- Redirects for old content to relevant New Pages ---
      { source: '/mainland-llc-setup', destination: '/services/llc-company-formation-dubai-mainland/', permanent: true },
      { source: '/mainland-trade-license', destination: '/services/mainland-trade-license-uae/', permanent: true },
      { source: '/jebel-ali-free-zone-trade-license-verification', destination: '/services/jafza-free-zone/', permanent: true },
      { source: '/online-gate-pass-for-jebel-ali-free-zone', destination: '/services/jafza-free-zone/', permanent: true },
      { source: '/how-to-check-trade-license-in-dubai', destination: '/services/mainland-trade-license-uae/', permanent: true },
      { source: '/how-to-download-company-trade-license-in-dubai', destination: '/services/mainland-trade-license-uae/', permanent: true },
      { source: '/postal-code-for-dubai-jebel-ali-free-zone', destination: '/services/jafza-free-zone/', permanent: true },
      { source: '/dubai-trade-license-activities-list', destination: '/services/mainland-trade-license-uae/', permanent: true },
      { source: '/sharjah-hamriyah-free-zone-companies-list', destination: '/services/hamriyah-free-zone/', permanent: true },
      { source: '/hamriyah-free-zone-sharjah-gate-pass-2', destination: '/services/hamriyah-free-zone/', permanent: true },
      { source: '/cheapest-trade-license-dubai', destination: '/services/free-zone-setup-packages/', permanent: true },
      { source: '/sharjah-trade-license-activities-list', destination: '/services/sharjah-mainland-company-setup/', permanent: true },
      { source: '/sharjah-trade-license-renewal-grace-period', destination: '/services/business-license-renewal/', permanent: true },
      { source: '/general-trading-license-for-sale-in-dubai', destination: '/services/mainland-trade-license-uae/', permanent: true },
      { source: '/dubai-economic-department-trade-license-check', destination: '/services/mainland-trade-license-uae/', permanent: true },
      { source: '/uae-trade-license-sample', destination: '/services/mainland-trade-license-uae/', permanent: true },
      { source: '/how-to-check-trade-license-in-uae', destination: '/services/mainland-trade-license-uae/', permanent: true },
      { source: '/download-trade-license-dubai', destination: '/services/mainland-trade-license-uae/', permanent: true },
      { source: '/how-to-get-trade-license-in-abu-dhabi', destination: '/services/abu-dhabi-mainland-company-setup/', permanent: true },
      { source: '/dubai-economic-department-trade-license-activity-list', destination: '/services/mainland-trade-license-uae/', permanent: true },
      { source: '/how-to-get-trade-license-in-dubai', destination: '/services/dubai-mainland-company-setup/', permanent: true },
      { source: '/dubai-economic-department-trade-license-renewal-online', destination: '/services/business-license-renewal/', permanent: true },
      { source: '/dubai-trade-license-renewal-fees', destination: '/services/business-license-renewal/', permanent: true },
      { source: '/how-to-print-out-trade-license-in-dubai', destination: '/services/mainland-trade-license-uae/', permanent: true },
      { source: '/how-to-add-activity-in-dubai-trade-license', destination: '/services/mainland-trade-license-uae/', permanent: true },
      { source: '/sample-trade-license-dubai', destination: '/services/mainland-trade-license-uae/', permanent: true },
      { source: '/sharjah-trade-license-inquiry', destination: '/services/sharjah-mainland-company-setup/', permanent: true },
      { source: '/technical-services-company-license-cost-in-dubai', destination: '/services/dubai-mainland-company-setup/', permanent: true },
      { source: '/dubai-general-trading-llc-license-renewal-fees', destination: '/services/business-license-renewal/', permanent: true },
      { source: '/abu-dhabi-trade-license-activities-list', destination: '/services/abu-dhabi-mainland-company-setup/', permanent: true },
      { source: '/business-setup-packages', destination: '/services/free-zone-setup-packages/', permanent: true },

      // --- Fallback Redirects to BLOG for all other old pages ---
      // ملاحظة: تم تحديث الوجهات لتذهب إلى /blog/ مباشرة
      
      { source: '/hamriyah-free-zone-phase-1', destination: '/blog/', permanent: true },
      { source: '/talal-restaurant-hamriyah-free-zone-phase-2', destination: '/blog/', permanent: true },
      { source: '/dubai-trade-license-on-installment', destination: '/blog/', permanent: true },
      { source: '/hamriyah-free-zone-driver-job-vacancies', destination: '/blog/', permanent: true },
      { source: '/list-of-jebel-ali-free-zone-companies-in-dubai', destination: '/blog/', permanent: true },
      { source: '/ajman-free-zone-license-cancellation', destination: '/blog/', permanent: true },
      { source: '/unilever-jebel-ali-free-zone', destination: '/blog/', permanent: true },
      { source: '/list-of-shipping-companies-in-jebel-ali-free-zone-dubai-2', destination: '/blog/', permanent: true },
      { source: '/ercon-middle-east-industries-ajman-free-zone', destination: '/blog/', permanent: true },
      { source: '/arya-petroleum-hamriyah-free-zone', destination: '/blog/', permanent: true },
      { source: '/ajman-free-zone-executive-office', destination: '/blog/', permanent: true },
      { source: '/ngc-jebel-ali-free-zone', destination: '/blog/', permanent: true },
      { source: '/ajman-free-zone-activity-list', destination: '/blog/', permanent: true },
      { source: '/hamriyah-free-zone-entry-pass', destination: '/blog/', permanent: true },
      { source: '/how-to-cancel-trade-license-in-dubai', destination: '/blog/', permanent: true },
      { source: '/aramex-jebel-ali-free-zone-address', destination: '/blog/', permanent: true },
      { source: '/salalah-free-zone-setup', destination: '/blog/', permanent: true },
      { source: '/abu-dhabi-trade-license-name-search', destination: '/blog/', permanent: true },
      { source: '/ajman-free-zone-portal-login', destination: '/blog/', permanent: true },
      { source: '/jebel-ali-free-zone-fishing-spot', destination: '/blog/', permanent: true },
      { source: '/belleli-energy-hamriyah-free-zone', destination: '/blog/', permanent: true },
      { source: '/ajman-free-zone-online-portal', destination: '/blog/', permanent: true },
      { source: '/ajman-free-zone-gate-1', destination: '/blog/', permanent: true },
      { source: '/ajman-free-zone-license-types', destination: '/blog/', permanent: true },
      { source: '/abdulla-food-court-jebel-ali-free-zone-menu', destination: '/blog/', permanent: true },
      { source: '/jebel-ali-free-zone-companies-list-with-email-ids', destination: '/blog/', permanent: true },
      { source: '/jebel-ali-free-zone-gate-7-location-map', destination: '/blog/', permanent: true },
      { source: '/forklift-operator-jobs-in-jebel-ali-free-zone-area-location', destination: '/blog/', permanent: true },
      { source: '/forklift-operator-jobs-in-jebel-ali-free-zone', destination: '/blog/', permanent: true },
      { source: '/oman-local-business-license', destination: '/blog/', permanent: true },
      { source: '/dubai-trade-license-cancellation-fees', destination: '/blog/', permanent: true },
      { source: '/psl-hamriyah-free-zone', destination: '/blog/', permanent: true },
      { source: '/hamriyah-free-zone-labour-contract', destination: '/blog/', permanent: true },
      { source: '/hamriyah-free-zone-medical-centre', destination: '/blog/', permanent: true },
      { source: '/walk-in-interview-in-sharjah-free-zone', destination: '/blog/', permanent: true },
      { source: '/uae-free-zone-companies-list', destination: '/blog/', permanent: true },
      { source: '/hotels-near-hamriyah-free-zone-sharjah', destination: '/blog/', permanent: true },
      { source: '/list-of-companies-in-jebel-ali-free-zone-dubai-2', destination: '/blog/', permanent: true },
      { source: '/ajman-free-zone-warehouse-rent', destination: '/blog/', permanent: true },
      { source: '/sharjah-bus-route-to-hamriyah-free-zone-2', destination: '/blog/', permanent: true },
      { source: '/volvo-jebel-ali-free-zone', destination: '/blog/', permanent: true },
      { source: '/sharjah-rolla-to-hamriyah-free-zone-bus', destination: '/blog/', permanent: true },
      { source: '/how-to-start-car-wash-business-in-dubai', destination: '/blog/', permanent: true },
      { source: '/cheapest-company-registration-in-uae', destination: '/blog/', permanent: true },
      { source: '/landmark-group-jebel-ali-free-zone', destination: '/blog/', permanent: true },
      { source: '/ajman-free-zone-building-e1', destination: '/blog/', permanent: true },
      { source: '/jebel-ali-free-zone-south-accommodation', destination: '/blog/', permanent: true },
      { source: '/ajman-free-zone-visa-cancellation-form', destination: '/blog/', permanent: true },
      { source: '/hamriyah-free-zone-labour-law', destination: '/blog/', permanent: true },
      { source: '/landmark-jebel-ali-free-zone', destination: '/blog/', permanent: true },
      { source: '/female-jobs-in-hamriyah-free-zone-sharjah-2', destination: '/blog/', permanent: true },
      { source: '/can-i-start-my-own-business-while-employed-in-dubai', destination: '/blog/', permanent: true },
      { source: '/how-to-start-a-legal-consultancy-business-in-dubai', destination: '/blog/', permanent: true },
      { source: '/oman-business-setup', destination: '/blog/', permanent: true },
    ];

    // دمج القائمتين
    return [...automatedServiceRedirects, ...manualRedirects];
  },
};

export default nextConfig;
