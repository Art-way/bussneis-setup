import { dubaiServicePath } from './routes.mjs';
import { regionalProfiles, regionalServicePages } from './regional-services.mjs';

// Planned segments have no public URL and are never navigation destinations.
export const emirates = [
  { slug: 'dubai', name: 'دبي', title: 'تأسيس الشركات في دبي', path: dubaiServicePath, status: 'available' },
  ...regionalProfiles.map(profile => ({ ...profile, title: `تأسيس الشركات في ${profile.name}`, status: 'available' })),
  { slug: 'ras-al-khaimah', name: 'رأس الخيمة', title: 'تأسيس شركة في المنطقة الحرة رأس الخيمة', path: regionalServicePages.find(service => service.slug === 'rak-free-zone').path, status: 'available' },
];
export const availableEmirates = emirates.filter(emirate => emirate.status === 'available' && emirate.path);
export const getEmirate = slug => emirates.find(emirate => emirate.slug === slug);

export const dubaiTopics = [
  { slug: 'mainland', title: 'البر الرئيسي', description: 'مسار يخضع لجهة الترخيص في دبي ومتطلبات النشاط والشكل القانوني.' },
  { slug: 'free-zones', title: 'المناطق الحرة', description: 'خيارات تقارن بحسب الأنشطة المسموحة والمقر ونطاق العمل وشروط المنطقة المختارة.' },
  { slug: 'offshore', title: 'الأوفشور', description: 'يحتاج تقييماً مستقلاً لغرض الكيان والجهة ونطاق العمل المسموح؛ لا يُعامل بديلاً تلقائياً لترخيص نشاط محلي.' },
  { slug: 'branches', title: 'فروع الشركات', description: 'للشركة القائمة التي تدرس التوسع؛ تُراجع صلاحيات الشركة الأم ومستنداتها ومسؤولية الفرع.' },
  { slug: 'contracts', title: 'عقود التأسيس والأشكال القانونية', description: 'نرتب بيانات الشركاء والحصص والإدارة والمستندات التي تتطلب مراجعة وتوثيقاً بحسب الحالة.' },
  { slug: 'activities', title: 'التأسيس حسب النشاط', description: 'المقاولات والشحن والسياحة أمثلة لأنشطة تحتاج تدقيقاً للمتطلبات والموافقات الخاصة قبل عرض الخدمة.' },
];
export const articleTopics = {
  'formation-steps': 'خطوات التأسيس',
  'trade-licences': 'الرخص التجارية',
  contracts: 'عقود التأسيس', 'legal-forms': 'الشركات ذات المسؤولية المحدودة',
  contracting: 'شركات المقاولات', 'formation-benefits': 'مميزات التأسيس',
};
