// Public Arabic URL segments are independent of stable content/category IDs.
export const arabicSectionPaths = {
  services: '/ar/الخدمات/',
  contact: '/ar/تواصل-معنا/',
  blog: '/ar/المدونة/',
  authors: '/ar/المؤلفون/',
  'editorial-policy': '/ar/سياسة-التحرير/',
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

export const arabicPageRoutes = [
  ...Object.entries(arabicSectionPaths).map(([view, path]) => ({ legacyPath: `/ar/${view}`, path, view })),
  ...Object.entries(arabicServiceSlugs).map(([oldSlug, slug]) => ({ legacyPath: `/ar/services/${oldSlug}`, path: `${arabicSectionPaths.services}${slug}/`, view: 'service', slug })),
  ...Object.entries(arabicPostSlugs).map(([oldSlug, slug]) => ({ legacyPath: `/ar/blog/${oldSlug}`, path: `${arabicSectionPaths.blog}${slug}/`, view: 'post', slug })),
  ...Object.entries(arabicCategorySlugs).map(([oldSlug, slug]) => ({ legacyPath: `/ar/blog/category/${oldSlug}`, path: `${arabicSectionPaths.blog}تصنيف/${slug}/`, view: 'category', slug })),
  ...Object.entries(arabicAuthorSlugs).map(([oldSlug, slug]) => ({ legacyPath: `/ar/authors/${oldSlug}`, path: `${arabicSectionPaths.authors}${slug}/`, view: 'author', slug })),
];

export const legacyArabicRedirects = new Map(arabicPageRoutes.map(route => [route.legacyPath, route.path]));

export const canonicalArabicPaths = new Set([
  '/ar',
  ...[...legacyArabicRedirects.values()].map(path => path.replace(/\/+$/, '')),
]);

export function canonicalArabicUrl(path) {
  return new URL(path, 'https://businesssetupuae.ae').href;
}
