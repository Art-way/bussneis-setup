import Link from '../link';
import ArabicContactForm from '../contact-form';
import { costRequestPath, dubaiServicePath, canonicalArabicUrl } from '../routes.mjs';
import { arabicMetadata, StructuredData } from '../seo';
import { breadcrumbs } from '../blog/seo';
import styles from '../service-pages.module.css';

export const metadata = arabicMetadata('حاسبة تكلفة تأسيس شركة — أرسل متطلباتك للفريق', 'اختر خدمة تأسيس الشركة وموقعها، وأرسل تفاصيل مشروعك ووسيلة التواصل إلى Business Setup UAE لطلب مراجعة التكلفة. لا تعرض الصفحة سعراً تلقائياً.', costRequestPath);

export default function CostRequestPage() {
  return <>
    <StructuredData data={breadcrumbs([{ name: 'حاسبة تكلفة تأسيس شركة', path: costRequestPath }])} />
    <StructuredData data={{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'حاسبة تكلفة تأسيس شركة', description: 'نموذج اختيارات لطلب مراجعة تكلفة التأسيس من الفريق دون تسعير آلي.', url: canonicalArabicUrl(costRequestPath), inLanguage: 'ar-EG' }} />
    <section className={`ar-container ${styles.costRequestHero}`}>
      <nav className={styles.breadcrumb} aria-label="مسار التنقل"><Link href="/ar/">الرئيسية العربية</Link><span aria-hidden="true">/</span><span>طلب مراجعة التكلفة</span></nav>
      <span className="ar-eyebrow">اختياراتك أولاً، ثم مراجعة تناسب مشروعك</span>
      <h1>حاسبة تكلفة<br /><span className={styles.accent}>تأسيس شركة.</span></h1>
      <p className={styles.lead}>ابدأ بتحديد الخدمة ومكان التأسيس، ثم أرسل تفاصيل مشروعك وبيانات التواصل. هذا نموذج لطلب مراجعة التكلفة من الفريق؛ لا يعرض سعراً أو عرضاً تلقائياً.</p>
      <a href="#cost-request-form" className="ar-button">ابدأ اختياراتك <span aria-hidden="true">↓</span></a>
    </section>
    <section className={`ar-container ${styles.costRequestLayout}`} aria-labelledby="cost-request-title">
      <aside className={styles.costRequestGuide}>
        <span className="ar-eyebrow">طلب أوضح، من البداية</span><h2>كيف ترسل طلبك؟</h2>
        <ol>{[
          ['اختر الخدمة والموقع', 'حدد الخدمة التي تبحث عنها والإمارة المقصودة من القائمتين في النموذج.'],
          ['اكتب تفاصيل المشروع', 'اذكر النشاط، وعدد الشركاء، والحاجة إلى مقر أو إقامات، وما تريد أن يشمله العرض.'],
          ['أضف وسيلة التواصل وأرسل', 'أكمل البريد الإلكتروني ورقم الهاتف في الخطوة التالية، ثم اضغط زر الإرسال وانتظر تأكيد النموذج.'],
        ].map(([title,text],index) => <li key={title}><span aria-hidden="true">0{index+1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
        <p className={styles.costRequestNote}>لا يظهر إجمالي أو سعر في هذه الصفحة. نطاق الخدمة والمتطلبات يحتاجان مراجعة بحسب حالتك قبل تقديم أي عرض.</p>
        <Link className={styles.textLink} href={dubaiServicePath} prefetch={false}>تعرّف على خدمة تأسيس شركة في دبي ←</Link>
      </aside>
      <div id="cost-request-form" className={styles.costRequestForm}><span className="ar-eyebrow">خطوتان لإكمال الطلب</span><h2 id="cost-request-title">جهّز طلب مراجعة التكلفة</h2><ArabicContactForm initiallyOpen costRequest /></div>
    </section>
    <section className={`ar-container ${styles.costRequestHelp}`} aria-label="مساعدة في إكمال الطلب"><h2>تحتاج توضيحاً قبل الإرسال؟</h2><p>يمكنك أيضاً التواصل عبر <a href="https://wa.me/971507706746" target="_blank" rel="noopener noreferrer">واتساب</a> أو البريد <a href="mailto:info@businesssetupuae.ae">info@businesssetupuae.ae</a>. أرسل وصفاً مختصراً للنشاط دون وثائق هوية أو بيانات بنكية.</p></section>
  </>;
}
