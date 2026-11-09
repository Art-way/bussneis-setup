import { regionalRoutes } from './regional-services.mjs';

// Public Arabic URL segments are independent of stable content/category IDs.
export const arabicSectionPaths = {
  services: '/ar/الخدمات/',
  contact: '/ar/تواصل-معنا/',
  blog: '/ar/المدونة/',
  authors: '/ar/المؤلفون/',
  'editorial-policy': '/ar/سياسة-التحرير/',
};

export const arabicLegalPaths = {
  'privacy-policy': '/ar/سياسة-الخصوصية/',
  'terms-and-conditions': '/ar/الشروط-والأحكام/',
};

export const arabicServiceSlugs = {
  mainland: 'تأسيس-شركة-في-البر-الرئيسي',
  'free-zone': 'تأسيس-شركة-في-منطقة-حرة',
  'business-support': 'خدمات-ما-بعد-التأسيس',
};

export const arabicPostSlugs = {
  'start-a-uae-company-from-egypt': 'تأسيس-شركة-في-الإمارات-من-مصر',
  'mainland-or-free-zone': 'البر-الرئيسي-أم-المنطقة-الحرة',
  'company-setup-cost-checklist': 'تكلفة-تأسيس-شركة-في-الإمارات',
  'prepare-company-formation-documents': 'مستندات-تأسيس-شركة-في-الإمارات',
  'after-your-trade-license': 'ما-بعد-إصدار-الرخصة-التجارية',
  'choose-your-free-zone': 'اختيار-المنطقة-الحرة',
};

export const arabicCategorySlugs = {
  'company-formation': 'تأسيس-الشركات',
  'free-zones': 'المناطق-الحرة',
  'costs-planning': 'التكاليف-والتخطيط',
  'after-setup': 'ما-بعد-التأسيس',
};

export const arabicAuthorSlugs = { 'editorial-team': 'فريق-التحرير' };

export const dubaiServicePath = '/ar/تأسيس-شركة-في-دبي/';
export const costRequestPath = '/ar/حاسبة-تكلفة-تأسيس-شركة/';
export const dubaiGuideSlug = 'كيف-افتح-شركة-في-دبي';
const dubaiLicenceFeesSlug = 'أسعار-الرخص-التجارية-في-دبي';
export const dubaiLicenceFeesPath = `/ar/${dubaiLicenceFeesSlug}/`;
export const dubaiArticleSlugs = [
  dubaiGuideSlug,
  'نموذج-عقد-تأسيس-شركة-ذات-مسئولية-محدودة-دبي',
  'تكلفة-تاسيس-شركة-مقاولات-في-دبي',
  'مميزات-فتح-شركة-في-دبي',
  dubaiLicenceFeesSlug,
];
export const categoryPath = slug => `/ar/تصنيف/${slug}/`;
export const postPath = post => post.path || `${arabicSectionPaths.blog}${post.urlSlug}/`;
export const servicePath = service => service.path || `${arabicSectionPaths.services}${service.urlSlug}/`;

export const arabicPageRoutes = [
  ...Object.entries(arabicSectionPaths).map(([view, path]) => ({ legacyPath: `/ar/${view}`, path, view })),
  ...Object.entries(arabicLegalPaths).map(([slug, path]) => ({ legacyPath: `/ar/${slug}`, path, view: 'legal', slug })),
  ...Object.entries(arabicServiceSlugs).map(([oldSlug, slug]) => ({ legacyPath: `/ar/services/${oldSlug}`, path: `${arabicSectionPaths.services}${slug}/`, view: 'service', slug })),
  ...Object.entries(arabicPostSlugs).map(([oldSlug, slug]) => ({ legacyPath: `/ar/blog/${oldSlug}`, path: `${arabicSectionPaths.blog}${slug}/`, view: 'post', slug })),
  ...Object.entries(arabicCategorySlugs).map(([oldSlug, slug]) => ({ legacyPath: `/ar/blog/category/${oldSlug}`, path: categoryPath(slug), view: 'category', slug })),
  ...Object.entries(arabicAuthorSlugs).map(([oldSlug, slug]) => ({ legacyPath: `/ar/authors/${oldSlug}`, path: `${arabicSectionPaths.authors}${slug}/`, view: 'author', slug })),
  { path: dubaiServicePath, view: 'dubai' },
  { path: costRequestPath, view: 'cost-request' },
  ...dubaiArticleSlugs.map(slug => ({ path: `/ar/${slug}/`, view: 'post', slug })),
  ...regionalRoutes,
];

export const legacyArabicRedirects = new Map([
  ...arabicPageRoutes.filter(route => route.legacyPath).map(route => [route.legacyPath, route.path]),
  ...Object.values(arabicCategorySlugs).map(slug => [`${arabicSectionPaths.blog}تصنيف/${slug}`, categoryPath(slug)]),
]);

export const canonicalArabicPaths = new Set([
  '/ar',
  ...arabicPageRoutes.map(route => route.path.replace(/\/+$/, '')),
]);

export function canonicalArabicUrl(path) {
  return new URL(path, 'https://businesssetupuae.ae').href;
}
