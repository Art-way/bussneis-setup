import Link from '../link';
import { dubaiPosts } from '../content';
import { dubaiServicePath, costRequestPath } from '../routes.mjs';
import { dubaiTopics } from '../market-segments';
import { arabicMetadata, StructuredData, SITE_URL } from '../seo';
import { breadcrumbs } from '../blog/seo';
import ArticleCard from '../blog/article-card';
import ArabicContactForm from '../contact-form';
import { regionalServicePages } from '../regional-services.mjs';
import styles from '../service-pages.module.css';

export const metadata = arabicMetadata('تأسيس شركة في دبي: الخيارات والمتطلبات وطلب الخدمة', 'ابدأ تأسيس شركة في دبي بمراجعة النشاط والشكل القانوني والمستندات والتكلفة. قارن البر الرئيسي والمناطق الحرة، وأرسل تفاصيل مشروعك لطلب الخدمة.', dubaiServicePath);

const steps = [
  ['نراجع مشروعك', 'نبدأ بالنشاط الفعلي والعملاء والشركاء ومكان تقديم الخدمة، ونحدد الأسئلة التي تحتاج تأكيداً من جهة الترخيص.'],
  ['نرتب مسار التأسيس', 'نقارن جهة التسجيل والشكل القانوني والمقر والموافقات المرتبطة بالنشاط، ونوضح نطاق الخدمة المقترح.'],
  ['نجهز ملف الطلب', 'نرتب البيانات والمستندات المطلوبة بحسب حالتك، ونراجع ما يحتاج ترجمة أو تصديقاً أو توثيقاً قبل التقديم.'],
  ['نوضح المتابعة', 'نتفق على الخطوة التالية وما يشمله العمل. إصدار الرخصة والإقامة والحساب المصرفي إجراءات لها جهات وقرارات مستقلة.'],
];
const serviceGroups = [...new Set(regionalServicePages.filter(service => service.emirateSlug === 'dubai').map(service => service.group))];
const questions = [
  ['ما البيانات التي أرسلها لطلب الخدمة؟', 'وصف النشاط، وعدد الشركاء وصفاتهم، ومكان العملاء والتنفيذ، والحاجة إلى مقر أو فريق، والخيارات التي تقارنها. لا ترسل وثائق هوية مع الاستفسار الأولي.'],
  ['هل يجب اختيار البر الرئيسي أم منطقة حرة؟', 'يرتبط القرار بالنشاط ونطاق عمله ومكان تنفيذه والعملاء والمقر. نرتب المقارنة، ثم نتحقق من المتطلبات لدى الجهة المختصة قبل اعتماد المسار.'],
  ['هل يمكن ترتيب الإجراءات وأنا خارج الإمارات؟', 'يمكن البدء بمناقشة المشروع وتجهيز البيانات عن بُعد. الحاجة إلى الحضور أو توثيق مستندات تتحدد بحسب جهة التسجيل والإجراءات الفعلية لحالتك.'],
  ['كم تبلغ التكلفة وكم تستغرق الإجراءات؟', 'لا نعرض سعراً أو مدة ثابتين دون معرفة النشاط والجهة والشركاء والمقر والموافقات. اطلب عرضاً مكتوباً يوضح الرسوم وأتعاب الخدمة والمشمول والمستثنى وما يؤثر في المدة.'],
  ['هل تشمل الرخصة حساباً مصرفياً وإقامة؟', 'لا يضمن إصدار الرخصة قبول حساب مصرفي أو إقامة. يجب توضيح نطاق كل خدمة ومتطلباتها والجهة التي تتخذ القرار بشأنها.'],
];

export default function DubaiServicePage() {
  return <>
    <StructuredData data={breadcrumbs([{ name: 'تأسيس الشركات في دبي', path: dubaiServicePath }])} />
    <StructuredData data={{ '@context': 'https://schema.org', '@type': 'Service', name: 'تأسيس شركة في دبي', url: new URL(dubaiServicePath, SITE_URL).href, serviceType: 'تنسيق خدمات تأسيس الشركات', areaServed: { '@type': 'City', name: 'Dubai' }, provider: { '@type': 'Organization', name: 'BSetup UAE', url: SITE_URL, telephone: '+971507706746', email: 'info@businesssetupuae.ae' } }} />
    <section className={`ar-container ${styles.hero} ${styles.dubaiHero}`}>
      <nav className={styles.breadcrumb} aria-label="مسار التنقل"><Link href="/ar/">الرئيسية العربية</Link><span aria-hidden="true">/</span><span>تأسيس الشركات في دبي</span></nav>
      <div className={styles.heroGrid}>
        <div><span className="ar-eyebrow">خدمات دبي · من خارج الإمارات إلى خطوتك التالية</span><h1>تأسيس شركة<br /><span className={styles.accent}>في دبي.</span></h1><p className={styles.lead}>نساعدك على ترتيب خيارات تأسيس شركتك في دبي: من تحديد النشاط وجهة التسجيل إلى تجهيز المستندات وفهم نطاق الخدمة والتكاليف قبل الالتزام.</p><div className={styles.dubaiActions}><a href="#request" className="ar-button">اطلب استشارة لمشروعك <span aria-hidden="true">←</span></a><a href="#options" className={styles.textLink}>استكشف خيارات التأسيس ↓</a></div><p className={styles.formHelp}>للرائد الذي يبدأ مشروعاً، أو الشركة القائمة التي تدرس التوسع إلى دبي.</p></div>
        <div className={styles.dubaiArt}><img src="/assets/arabic/dubai-skyline-640.webp" srcSet="/assets/arabic/dubai-skyline-384.webp 384w, /assets/arabic/dubai-skyline-640.webp 640w, /assets/arabic/dubai-skyline-1080.webp 1080w" sizes="(max-width: 760px) 90vw, 44vw" width="1080" height="720" alt="أفق مدينة دبي وبرج خليفة" fetchPriority="high" /><span>دبي<br /><small>ابدأ باختيار يخدم نشاطك</small></span></div>
      </div>
    </section>
    <nav className={`ar-container ${styles.topicNav}`} aria-label="أقسام خدمة دبي">{[['options','خيارات التأسيس'],['documents','البيانات والمستندات'],['process','خطوات الخدمة'],['cost','عوامل التكلفة'],['dubai-resources','مقالات دبي'],['request','طلب استشارة']].map(([id,label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
    <section id="options" className="ar-container ar-section" aria-labelledby="options-title"><div className={styles.sectionHeading}><div><span className="ar-eyebrow">الإمارة أولاً، ثم موضوع الخدمة</span><h2 id="options-title">اختر المسار وفق<br />طريقة عمل شركتك.</h2></div><p>هذه موضوعات نراجعها داخل خدمة دبي. لا تمثل أنشطة أو تراخيص متاحة تلقائياً؛ يُحدد نطاق العمل بعد تأكيد المتطلبات والخدمة المناسبة للحالة.</p></div><div className={styles.dubaiTopicGrid}>{dubaiTopics.map(topic => <article key={topic.slug} id={`topic-${topic.slug}`}><span aria-hidden="true">↗</span><h3>{topic.title}</h3><p>{topic.description}</p></article>)}</div></section>
    <section id="documents" className={`ar-container ar-section ${styles.dubaiDocuments}`} aria-labelledby="documents-title"><div><span className="ar-eyebrow">ملف واضح، من البداية</span><h2 id="documents-title">ما الذي نحتاجه<br />لفهم طلبك؟</h2><p className={styles.lead}>نبدأ بالمعلومات العامة، ثم نحدد قائمة المستندات المطلوبة من الجهة المختارة بحسب صفة الشركاء والنشاط.</p></div><div><ul>{['وصف النشاط وما ستبيعه أو تقدمه، ومكان العملاء وتنفيذ العمل.','عدد الشركاء: أفراد أم شركات، والشكل القانوني والاسم التجاري المقترح.','احتياجات المقر والفريق والإقامات، وخطة التشغيل الأولية.','بعد تحديد المسار: وثائق الشركاء وإثبات صلاحيات ممثلي الشركات عند انطباقها.','الترجمة أو التصديق أو التوثيق وأي موافقات قطاعية بحسب الطلب.'].map(text => <li key={text}>{text}</li>)}</ul><p>تُحدد المستندات وقناة إرسالها بعد معرفة الجهة والحالة. لا تُعد هذه قائمة نهائية تصلح لكل نشاط.</p></div></section>
    <section id="process" className="ar-container ar-section" aria-labelledby="process-title"><div className={styles.sectionHeading}><div><span className="ar-eyebrow">كيف نقدم الخدمة</span><h2 id="process-title">من السؤال إلى<br />ملف قابل للمتابعة.</h2></div></div><ol className={styles.processGrid}>{steps.map(([title,text],i) => <li key={title}><span className={styles.stepNumber}>0{i+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></section>
    <section id="cost" className={`ar-container ar-section ${styles.dubaiDocuments}`} aria-labelledby="cost-title"><div><span className="ar-eyebrow">التكلفة تتبع المتطلبات</span><h2 id="cost-title">اطلب نطاقاً واضحاً،<br />قبل مقارنة الأرقام.</h2><p className={styles.lead}>النشاط وجهة التسجيل والشكل القانوني وعدد الشركاء والمقر والموافقات عوامل تغير تفاصيل العرض.</p><Link className={styles.textLink} href={costRequestPath}>جهّز طلب مراجعة التكلفة ←</Link></div><div><ul>{['رسوم الجهة الحكومية والتسجيل والترخيص والتوثيق بحسب الحالة.','أتعاب مقدم الخدمة والخطوات التي يشملها العرض.','المقر والتجهيز والمتطلبات الفنية والكوادر المرتبطة بالنشاط.','الإقامات والخدمات المصرفية والمحاسبية عند طلبها كنطاق مستقل.','التجديد والتعديلات والمبالغ المستردة أو المستثناة وشروطها.'].map(text => <li key={text}>{text}</li>)}</ul></div></section>

    <section className="ar-container ar-section" aria-labelledby="dubai-service-list">
      <div className={styles.sectionHeading}><div><span className="ar-eyebrow">حسب احتياج شركتك</span><h2 id="dubai-service-list">خدمات تأسيس الشركات في دبي</h2></div></div>
      <div className="ar-region-grid">{serviceGroups.map(group => <article className="ar-region-card" key={group}>
        <h3>{group}</h3>
        <ul>{regionalServicePages.filter(service => service.emirateSlug === 'dubai' && service.group === group).map(service => <li key={service.slug}><Link href={service.path}>{service.title}</Link></li>)}</ul>
      </article>)}</div>
    </section>
    <section id="dubai-resources" className="ar-container ar-section" aria-labelledby="resources-title"><div className={styles.sectionHeading}><div><span className="ar-eyebrow">مقالات مساعدة · إمارة دبي</span><h2 id="resources-title">من أول خطوة،<br />إلى خطة التشغيل.</h2></div><div><p>ابدأ بدليل خطوات التأسيس، ثم راجع مسودة العقد وميزانية المقاولات ومميزات فتح الشركة بحسب مشروعك.</p><Link className={styles.textLink} href="/ar/المدونة/?emirate=dubai#articles">كل مقالات دبي ←</Link></div></div><div className={styles.resourceGrid}>{dubaiPosts.map(post => <ArticleCard key={post.slug} post={post} />)}</div></section>
    <section className={`ar-container ar-section ${styles.dubaiFaq}`} aria-labelledby="dubai-faq-title"><h2 id="dubai-faq-title">أسئلة قبل طلب الخدمة</h2>{questions.map(([question,answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</section>
    <section id="request" className={`ar-container ar-section ${styles.dubaiRequest}`} aria-labelledby="request-title"><div><span className="ar-eyebrow">نبدأ بمحادثة مفيدة</span><h2 id="request-title">احكِ لنا عن<br /><span className={styles.accent}>مشروعك في دبي.</span></h2><p className={styles.lead}>اذكر النشاط والشركاء ومكان العملاء، وسؤالك الأساسي. سنبني النقاش على احتياجات مشروعك بدل افتراض باقة واحدة للجميع.</p><a className={styles.textLink} href="tel:+971507706746" dir="ltr">+971 50 770 6746</a></div><div className={styles.contactPanel}><h3>طلب استشارة تأسيس</h3><ArabicContactForm /></div></section>
    <section className={`ar-container ${styles.dubaiReferences}`} aria-label="المعلومات والمرجع"><p>BSetup UAE · <a href="mailto:info@businesssetupuae.ae">info@businesssetupuae.ae</a> · <Link href="/ar/تواصل-معنا/">وسائل التواصل</Link></p><p>للمعلومات الحكومية: <a href="https://www.investindubai.gov.ae/en/business-setup/mainland-companies" target="_blank" rel="noopener noreferrer">شركات البر الرئيسي — استثمر في دبي ↗</a>. لا توجد أسعار أو مدد ثابتة أو ضمانات موافقة ضمن هذه الصفحة.</p></section>
  </>;
}
