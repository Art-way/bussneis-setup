import { arabicAuthorSlugs, arabicCategorySlugs } from './routes.mjs';
import dubaiArticles from './dubai-articles.json';

export const siteUrl = 'https://businesssetupuae.ae';

export const categories = [
  { slug: 'company-formation', title: 'تأسيس الشركات', kicker: 'من الفكرة إلى البداية', description: 'افهم خطوات التأسيس، وجهّز أسئلتك وملف شركتك قبل اتخاذ القرار.' },
  { slug: 'free-zones', title: 'المناطق الحرة', kicker: 'اختر البيئة المناسبة', description: 'أدلة تساعدك على مقارنة المناطق الحرة والبر الرئيسي بحسب نشاطك وسوقك.' },
  { slug: 'costs-planning', title: 'التكاليف والتخطيط', kicker: 'خطّة أوضح لميزانيتك', description: 'تعرّف على بنود التكلفة والأسئلة التي تكشف تفاصيل عروض التأسيس.' },
  { slug: 'after-setup', title: 'ما بعد التأسيس', kicker: 'البداية تحتاج متابعة', description: 'نظّم مستنداتك والتزاماتك وخطوات التشغيل بعد إصدار الرخصة.' },
].map(category => ({ ...category, urlSlug: arabicCategorySlugs[category.slug] }));

export const authors = [{
  slug: 'editorial-team', name: 'فريق BSetup UAE', role: 'الجهة المسؤولة عن المحتوى', type: 'Organization',
  bio: 'تستند BSetup UAE إلى خبرة في خدمات تأسيس الشركات في الإمارات منذ 2021. تُنسب الأدلة التمهيدية في هذا القسم إلى فريق تحرير الموقع بصفته جهة نشر. نجمع المعلومات العامة من المصادر الرسمية الموضّحة داخل كل دليل، ونفصل بينها وبين التقييم الخاص بحالة كل عميل. لا تمثّل هذه النسبة ادّعاءً بمؤهل قانوني أو ضريبي، ولا مراجعة مستقلة من مختص.'
}].map(author => ({ ...author, urlSlug: arabicAuthorSlugs[author.slug] }));

// All published articles share the current block-based article template.
export const dubaiPosts = dubaiArticles;
export const posts = dubaiPosts;
export const getPost = (slug) => posts.find(post => post.slug === slug || post.urlSlug === slug);
export const getCategory = (slug) => categories.find(category => category.slug === slug || category.urlSlug === slug);
export const getAuthor = (slug) => authors.find(author => author.slug === slug || author.urlSlug === slug);
export const formatDate = (date) => new Intl.DateTimeFormat('ar-EG', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));
export const formatReadingTime = (minutes) => minutes === 1 ? 'دقيقة قراءة' : minutes === 2 ? 'دقيقتان للقراءة' : `${new Intl.NumberFormat('ar-EG').format(minutes)} دقائق قراءة`;
