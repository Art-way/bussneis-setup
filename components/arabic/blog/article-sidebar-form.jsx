import Link from '../link';
import LazyArabicContactWidget from '../lazy-contact-widget';
import styles from './blog.module.css';

export default function ArticleSidebarForm({ requestHref }) {
  return <section id="article-sidebar-form" className={styles.sidebarForm} aria-labelledby="sidebar-form-title" data-form-status="ready">
    <h2 id="sidebar-form-title">لنتحدث عن شركتك</h2>
    <p>شارك فريق BSetup UAE نشاطك واحتياجاتك، لنناقش الخطوة المناسبة لمشروعك.</p>
    <div className={styles.sidebarFormEmbed}><LazyArabicContactWidget id="sidebar-form-embed" /></div>
    <Link prefetch={false} href={requestHref} className={styles.sidebarFormAlternative}>انتقل إلى طلب الاستشارة</Link>
  </section>;
}
