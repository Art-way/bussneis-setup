import { canonicalArabicUrl, servicePath } from '@/components/arabic/routes.mjs';
import Link from '@/components/arabic/link';
import { notFound } from 'next/navigation';
import { services, getService } from '@/components/arabic/services';
import { arabicMetadata } from '@/components/arabic/seo';
import ArabicContactForm from '../contact-form';
import styles from '@/components/arabic/service-pages.module.css';

export async function generateMetadata({ params: paramsPromise }) {
  const params = await paramsPromise;
  const service = getService(params.slug);
  return service ? arabicMetadata(service.title, service.description, servicePath(service)) : {};
}

export default async function ArabicServicePage({ params: paramsPromise }) {
  const params = await paramsPromise;
  const service = getService(params.slug);
  if (!service) notFound();
  const path = servicePath(service);
  const parent = service.parent || { title: 'خدماتنا', path: '/ar/الخدمات/' };
  const otherServices = services.filter(item => item.slug !== service.slug && item.emirateSlug === service.emirateSlug).slice(0, 3);
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Service', name: service.title, description: service.description, serviceType: service.title, url: canonicalArabicUrl(path), areaServed: { '@type': 'Country', name: 'United Arab Emirates' }, provider: { '@type': 'Organization', name: 'BSetup UAE', url: 'https://businesssetupuae.ae' } },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://businesssetupuae.ae/ar/' },
      { '@type': 'ListItem', position: 2, name: parent.title, item: canonicalArabicUrl(parent.path) },
      { '@type': 'ListItem', position: 3, name: service.title, item: canonicalArabicUrl(path) },
    ] },
  ] };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <section className={`ar-container ${styles.hero}`}>
      <nav aria-label="مسار التنقل" className={styles.breadcrumb}><Link href="/ar/">الرئيسية</Link><span aria-hidden="true">/</span><Link href={parent.path}>{parent.title}</Link><span aria-hidden="true">/</span><span>{service.title}</span></nav>
      <div className={styles.detailHero}><div><span className="ar-eyebrow">{service.eyebrow}</span><h1>{service.title}</h1><p className={styles.lead}>{service.intro}</p><a href="#request" className="ar-button">ناقش مشروعك معنا <span aria-hidden="true">↖</span></a></div><aside className={styles.summaryCard} aria-label="نظرة على الخدمة"><span className={styles.summaryMark} aria-hidden="true">↗</span><span className={styles.cardEyebrow}>مسار يناسب المرحلة</span><h2>فكرة أوضح.<br />قرار مدروس.</h2><ul>{service.features.map((feature) => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}</ul><div className={styles.summaryFoot}>نرتب خطوتك التالية في الإمارات.</div></aside></div>
    </section>
    <section className={`ar-section ${styles.servicesSection}`} aria-labelledby="scope-title"><div className="ar-container"><div className={styles.sectionHeading}><div><span className="ar-eyebrow">تفاصيل تصنع الفرق</span><h2 id="scope-title">كيف نساعدك؟</h2></div><p>{service.fit}</p></div><div className={styles.scopeGrid}>{service.sections.map((section, index) => <article key={section.title}><span className={styles.stepNumber}>0{index + 1}</span><h3>{section.title}</h3><p>{section.description}</p></article>)}</div></div></section>
    <section className={`ar-container ar-section ${styles.preparation}`} aria-labelledby="prepare-title"><div><span className="ar-eyebrow">قبل أول محادثة</span><h2 id="prepare-title">جهّز فكرتك.<br />والأسئلة اللي تهمك.</h2><p>ما تحتاج تكون عارف كل التفاصيل. هذه بداية تساعدنا نفهم مشروعك ونوجّه النقاش.</p><Link href={service.guide} className={styles.textLink}>{service.guideTitle || 'استكشف الأدلة'} <span aria-hidden="true">↖</span></Link></div><ol className={styles.checklist}><li><strong>ما النشاط الذي تخطط له؟</strong><span>وصف مختصر لما ستقدمه ومن هم عملاؤك.</span></li><li><strong>من الشركاء، وأين ستعملون؟</strong><span>عدد الشركاء ومكان إدارتك للعمل والحاجة إلى مقر أو إقامة.</span></li><li><strong>ما الأولوية في هذه المرحلة؟</strong><span>مقارنة الخيارات، فهم بنود التكلفة أو ترتيب متطلبات التأسيس.</span></li></ol></section>
    <section className={`ar-container ${styles.sourceNote}`}><span aria-hidden="true">↗</span><p>متطلبات الترخيص والخدمات تختلف حسب النشاط والجهة والحالة. راجع المعلومات العامة لدى <a href={service.source.url} target="_blank" rel="noopener noreferrer">{service.source.label}<span className={styles.screenReader}> (يفتح في تبويب جديد)</span></a>، واطلب نطاق خدمة مكتوباً يناسب مشروعك.</p></section>
    <section className={`ar-container ar-section`} aria-labelledby="related-services"><div className={styles.sectionHeading}><h2 id="related-services">قد يناسبك أيضاً</h2><Link href="/ar/الخدمات/" className={styles.textLink}>كل الخدمات <span aria-hidden="true">←</span></Link></div><div className={styles.relatedGrid}>{otherServices.map((item) => <Link key={item.slug} href={servicePath(item)} className={styles.relatedCard}><span>{item.eyebrow}</span><h3>{item.title}</h3><p>{item.description}</p><b aria-hidden="true">↖</b></Link>)}</div></section>
    <section id="request" className={`ar-container ar-section ${styles.costRequestForm}`}><span className="ar-eyebrow">نحدد نطاق العمل معك</span><h2>اطلب مراجعة متطلبات الخدمة</h2><p className={styles.lead}>شاركنا نوع الخدمة والنشاط وبيانات التواصل، ليتمكن الفريق من مراجعة الطلب معك.</p><ArabicContactForm /></section>
    <section className={`ar-container ${styles.ctaWrap}`}><div className={styles.cta}><div><span className={styles.lightEyebrow}>خلّينا نبدأ من مشروعك</span><h2>سؤالك الأول،<br />بداية خطتك.</h2><p>تواصل مع الفريق واحكِ لنا عن المرحلة التي وصلت إليها.</p></div><Link href="/ar/تواصل-معنا/" className="ar-button">تواصل معنا <span aria-hidden="true">↖</span></Link></div></section>
  </>;
}
