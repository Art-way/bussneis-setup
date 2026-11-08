import { notFound } from 'next/navigation';
import Link from '../link';
import { regionalProfiles, regionalServicePages } from '../regional-services.mjs';
import { arabicMetadata, StructuredData } from '../seo';
import { canonicalArabicUrl, postPath } from '../routes.mjs';
import { posts } from '../content';
import ArticleCard from '../blog/article-card';
import ArabicContactForm from '../contact-form';
import styles from '../service-pages.module.css';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const profile = regionalProfiles.find(item => item.slug === slug);
  return profile ? arabicMetadata(profile.title, profile.description, profile.path) : {};
}

export default async function EmiratePage({ params }) {
  const { slug } = await params;
  const profile = regionalProfiles.find(item => item.slug === slug);
  if (!profile) notFound();
  const services = regionalServicePages.filter(service => service.emirateSlug === slug);
  const relatedGuides = posts.filter(post => post.emirateSlug === slug);
  const generalGuides = posts.filter(post => !post.emirateSlug).slice(0, 3);

  return <>
    <StructuredData data={{
      '@context': 'https://schema.org', '@type': 'Service', name: profile.title,
      description: profile.description, url: canonicalArabicUrl(profile.path),
      areaServed: { '@type': 'AdministrativeArea', name: profile.name },
      provider: { '@type': 'Organization', name: 'BSetup UAE', url: 'https://businesssetupuae.ae/' },
    }} />
    <StructuredData data={{
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'تأسيس الشركات في الإمارات', item: canonicalArabicUrl('/ar/') },
        { '@type': 'ListItem', position: 2, name: profile.title, item: canonicalArabicUrl(profile.path) },
      ],
    }} />
    <section className={`ar-container ${styles.costRequestHero}`}>
      <nav className={styles.breadcrumb} aria-label="مسار التنقل">
        <Link href="/ar/">تأسيس الشركات في الإمارات</Link><span aria-hidden="true">/</span><span>{profile.name}</span>
      </nav>
      <span className="ar-eyebrow">BSetup UAE · خدمات التأسيس في {profile.name}</span>
      <h1>{profile.title}</h1>
      <p className={styles.lead}>{profile.description}</p>
      <a href="#request" className="ar-button">ناقش متطلبات شركتك <span aria-hidden="true">←</span></a>
    </section>
    <section className="ar-container ar-section" aria-labelledby="emirate-route">
      <div className={styles.sectionHeading}><h2 id="emirate-route">اختَر المسار على أساس نشاطك</h2></div>
      <p className={styles.lead}>{profile.focus}</p>
      <p className={styles.lead}>نقدم لك في BSetup UAE ترتيب ملف التأسيس ومراجعة المستندات وبنود عرض الخدمة، مستندين إلى خبرتنا في خدمات تأسيس الشركات بالإمارات منذ 2021. نحدد نطاق المتابعة بعد فهم النشاط والمؤسسين والمقر الذي يحتاجه المشروع.</p>
      <ol className={styles.checklist}>
        <li><strong>حدّد ما ستقدمه الشركة</strong><span>وصف النشاط والعملاء ومكان تنفيذ العمل يساعد على اختيار جهة الترخيص.</span></li>
        <li><strong>رتّب بيانات المؤسسين</strong><span>نراجع الشركاء والشكل القانوني والمستندات والتوقيع وما يحتاج استكمالاً.</span></li>
        <li><strong>راجع العرض والمتابعة</strong><span>نفصل التسجيل والترخيص والمقر والخدمات الإضافية والتجديد في نطاق مكتوب.</span></li>
      </ol>
    </section>
    {services.length > 0 && <section className="ar-container ar-section" aria-labelledby="emirate-services">
      <div className={styles.sectionHeading}><div><span className="ar-eyebrow">الخدمات حسب المسار</span><h2 id="emirate-services">خدماتنا في {profile.name}</h2></div></div>
      <div className={styles.relatedGrid}>{services.map(service => <Link href={service.path} className={styles.relatedCard} key={service.slug}>
        <span>{service.group}</span><h3>{service.title}</h3><p>{service.intro}</p><b aria-hidden="true">↖</b>
      </Link>)}</div>
    </section>}
    <section className={`ar-container ${styles.sourceNote}`}><span aria-hidden="true">↗</span><p>راجع المعلومات والمتطلبات لدى <a href={profile.source.url} target="_blank" rel="noopener noreferrer">{profile.source.label}</a>، وشاركنا بيانات نشاطك لتحديد نطاق الخدمة الذي يناسبه.</p></section>
    <section className="ar-container ar-section" aria-labelledby="emirate-guides">
      <div className={styles.sectionHeading}><h2 id="emirate-guides">{relatedGuides.length ? `مقالات مرتبطة بـ${profile.name}` : 'أدلة عامة تساعدك قبل التقديم'}</h2><Link href="/ar/المدونة/" className={styles.textLink}>المدونة ←</Link></div>
      <div className={styles.resourceGrid}>{(relatedGuides.length ? relatedGuides : generalGuides).map(post => <ArticleCard key={postPath(post)} post={post} />)}</div>
    </section>
    <section id="request" className={`ar-container ar-section ${styles.costRequestForm}`}>
      <h2>شاركنا متطلبات التأسيس في {profile.name}</h2>
      <ArabicContactForm />
    </section>
  </>;
}
