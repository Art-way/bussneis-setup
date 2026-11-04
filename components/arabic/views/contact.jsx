import Link from '@/components/arabic/link';
import { arabicMetadata } from '@/components/arabic/seo';
import ArabicContactForm from '../contact-form';
import styles from '@/components/arabic/service-pages.module.css';

export const metadata = arabicMetadata('تواصل معنا — لنرتّب بداية مشروعك', 'تواصل مع Business Setup UAE حول تأسيس شركتك في الإمارات من مصر، عبر واتساب أو الهاتف أو البريد الإلكتروني.', '/ar/تواصل-معنا');

export default function ArabicContactPage() {
  return <>
    <section className={`ar-container ${styles.contactHero}`}>
      <nav aria-label="مسار التنقل" className={styles.breadcrumb}><Link href="/ar/">الرئيسية</Link><span aria-hidden="true">/</span><span>تواصل معنا</span></nav>
      <div className={styles.contactGrid}><div className={styles.contactIntro}><span className="ar-eyebrow">أول خطوة، محادثة</span><h1>كل مشروع كبير،<br />بدأ <span className={styles.accent}>بسؤال.</span></h1><p className={styles.lead}>عندك فكرة؟ أو محتاج تفهم خياراتك؟ احكِ لنا عن مشروعك في الإمارات، وخلّينا نرتّب الخطوة القادمة معك.</p><div className={styles.contactChannels}><a href="https://wa.me/971507706746" target="_blank" rel="noopener noreferrer"><span className={styles.channelIcon} aria-hidden="true">↗</span><span><small>محادثة على واتساب</small><strong>اسأل الفريق مباشرة</strong></span><span aria-hidden="true">↖</span><span className={styles.screenReader}>يفتح في تبويب جديد</span></a><a href="tel:+971507706746"><span className={styles.channelIcon} aria-hidden="true">↗</span><span><small>اتصل بنا</small><strong dir="ltr">+971 50 770 6746</strong></span><span aria-hidden="true">↖</span></a><a href="mailto:info@businesssetupuae.ae"><span className={styles.channelIcon} aria-hidden="true">@</span><span><small>راسلنا بالبريد الإلكتروني</small><strong className={styles.email} dir="ltr">info@businesssetupuae.ae</strong></span><span aria-hidden="true">↖</span></a></div></div>
      <div className={styles.contactPanel}><span className={styles.formKicker}>من فكرتك، نبدأ.</span><h2>احكِ لنا عن مشروعك</h2><ArabicContactForm /></div></div>
    </section>
    <section className={`ar-container ar-section ${styles.contactPreparation}`} aria-labelledby="conversation-title"><div><span className="ar-eyebrow">محادثة مفيدة من البداية</span><h2 id="conversation-title">ما الذي نناقشه معك؟</h2><p>نبدأ بصورة مشروعك قبل الانتقال إلى تفاصيل الإجراءات.</p></div><div className={styles.scopeGrid}><article><span className={styles.stepNumber}>01</span><h3>النشاط والعملاء</h3><p>ما الذي تقدمه، ومن أين تدير العمل، وأين يوجد عملاؤك؟</p></article><article><span className={styles.stepNumber}>02</span><h3>المسار والمتطلبات</h3><p>ما الخيارات التي تقارنها، وما الذي تحتاج توضيحه قبل القرار؟</p></article><article><span className={styles.stepNumber}>03</span><h3>نطاق الخطوة التالية</h3><p>نرتّب ما يحتاج مراجعة، وما يمكن تجهيزُه للبدء بصورة أوضح.</p></article></div></section>
  </>;
}
