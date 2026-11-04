import Link from '@/components/arabic/link';
import { services } from '@/components/arabic/services';
import { arabicMetadata } from '@/components/arabic/seo';
import { availableEmirates } from '../market-segments';
import styles from '@/components/arabic/service-pages.module.css';

export const metadata = arabicMetadata('خدمات تأسيس الشركات في الإمارات', 'اختر مسار تأسيس شركتك في الإمارات. خدمات البر الرئيسي والمناطق الحرة وما بعد التأسيس، بخطوات واضحة للمستثمر من مصر.', '/ar/الخدمات');

const steps = [
  ['نسمع فكرتك', 'نبدأ بالنشاط والعملاء والشركاء وما تحتاجه شركتك فعلًا.'],
  ['نرتّب الخيارات', 'نقارن المسارات والمتطلبات ونوضح نطاق الخدمة المقترح.'],
  ['نجهّز الخطوات', 'ننظم المستندات والموافقات المطلوبة مع الجهات المعنية.'],
  ['نكمل معك', 'نحدد ما بعد الرخصة ومواعيد المتابعة والتجديد.'],
];

function ServiceSymbol({ type }) {
  return <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{type === 'globe' ? <><circle cx="16" cy="16" r="12" /><ellipse cx="16" cy="16" rx="5" ry="12" /><path d="M4 16h24M7 8.5h18M7 23.5h18" /></> : type === 'briefcase' ? <><rect x="3" y="10" width="26" height="18" rx="3" /><path d="M11 10V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4M3 17l13 4 13-4M16 18v6" /></> : <><path d="M6 28V8l10-4 10 4v20M2 28h28M13 28v-7h6v7M11 11h2m6 0h2m-10 5h2m6 0h2" /></>}</g></svg>;
}

export default function ArabicServicesPage() {
  return <>
    <section className={`ar-container ${styles.hero}`}>
      <nav aria-label="مسار التنقل" className={styles.breadcrumb}><Link href="/ar/">الرئيسية</Link><span aria-hidden="true">/</span><span>خدماتنا</span></nav>
      <div className={styles.heroGrid}>
        <div><span className="ar-eyebrow">خدماتنا · خطوات محسوبة لبداية أقوى</span><h1>مشروعك مختلف.<br /><span className={styles.accent}>ومساره كمان.</span></h1><p className={styles.lead}>من أول سؤال في مصر إلى خطوات تأسيس شركتك في الإمارات. نرتّب معك الخيارات والمتطلبات، ونساعدك على اختيار بداية تناسب مشروعك.</p><Link href="/ar/تواصل-معنا/" className="ar-button">خلّينا نحكي عن مشروعك <span aria-hidden="true">↖</span></Link></div>
        <div className={styles.pathGraphic} aria-hidden="true"><span className={styles.graphicLabel}>من الفكرة، إلى خطتك التالية.</span><div className={styles.graphicOrbit}><i /><i /><i /></div><div className={styles.graphicCenter}>كل خطوة<br /><strong>لها مكان.</strong><span>مصر ← الإمارات</span></div><span className={styles.graphicPill}>فكرة واضحة</span><span className={styles.graphicPillTwo}>مسار يناسبك</span><span className={styles.graphicBottom}>BUSINESS, WITH CLARITY.</span></div>
      </div>
    </section>

    <section className="ar-container ar-section" aria-labelledby="emirates-title"><div className={styles.sectionHeading}><div><span className="ar-eyebrow">الخدمات بحسب الإمارة</span><h2 id="emirates-title">اختَر إمارة التأسيس.</h2></div><p>نعرض الإمارة التي تتوفر لها صفحة خدمة ومحتوى مكتملان. لكل نشاط متطلبات تُراجع قبل تحديد نطاق الخدمة.</p></div>{availableEmirates.map(emirate => <article className={styles.dubaiIndexCard} key={emirate.slug}><div><span className="ar-eyebrow">دبي · صفحة الخدمة الرئيسية</span><h3><Link href={emirate.path}>{emirate.title}</Link></h3><p>خيارات التأسيس والمستندات والخطوات وعوامل التكلفة، مع مقالات مستقلة تساعدك على اتخاذ القرار.</p></div><Link href={emirate.path} className="ar-button">خدمة دبي ←</Link></article>)}</section>
    <section className={`ar-section ${styles.servicesSection}`} aria-labelledby="services-title"><div className="ar-container"><div className={styles.sectionHeading}><div><span className="ar-eyebrow">ابدأ من احتياجك</span><h2 id="services-title">مسارات عامة.<br />لفهم الخيارات والمتابعة.</h2></div><p>خدمات عامة عبر الإمارات؛ لا تمثل صفحات بديلة لخدمة دبي. ابدأ بالإمارة ثم راجع المسار المناسب لنشاطك.</p></div><div className={styles.serviceGrid}>{services.map((service, index) => <article key={service.slug} className={styles.serviceCard}><div className={styles.cardTop}><ServiceSymbol type={service.icon} /><span>0{index + 1}</span></div><span className={styles.cardEyebrow}>{service.eyebrow}</span><h3><Link href={`/ar/الخدمات/${service.urlSlug}/`}>{service.title}</Link></h3><p>{service.description}</p><ul>{service.features.map((feature) => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}</ul><Link className={styles.textLink} href={`/ar/الخدمات/${service.urlSlug}/`}>تعرّف على الخدمة <span aria-hidden="true">↖</span></Link></article>)}</div></div></section>

    <section className="ar-container ar-section" aria-labelledby="process-title"><div className={styles.sectionHeading}><div><span className="ar-eyebrow">الوضوح في كل مرحلة</span><h2 id="process-title">من أين نبدأ معك؟</h2></div><p>خطوات مرتبطة باحتياجاتك، مع مساحة للأسئلة قبل كل قرار.</p></div><ol className={styles.processGrid}>{steps.map(([title, description], index) => <li key={title}><span className={styles.stepNumber}>0{index + 1}</span><h3>{title}</h3><p>{description}</p></li>)}</ol></section>

    <section className={`ar-container ${styles.ctaWrap}`}><div className={styles.cta}><div><span className={styles.lightEyebrow}>مش متأكد من المسار؟</span><h2>ابدأ بفكرتك.<br />نرتّب الباقي سوا.</h2><p>احكِ لنا عن نشاطك وخطتك، لنحدد معك الأسئلة والخطوات المناسبة.</p></div><Link href="/ar/تواصل-معنا/" className="ar-button">تواصل مع الفريق <span aria-hidden="true">↖</span></Link></div></section>
  </>;
}
