import Link from '@/components/arabic/link';
import { authors } from '@/components/arabic/content';
import { editorialMetadata, JsonLd, breadcrumbs } from '@/components/arabic/blog/seo';
import styles from '@/components/arabic/blog/blog.module.css';

export const metadata = editorialMetadata('الجهة المسؤولة عن المحتوى', 'تعرّف على جهة نشر أدلة Business Setup UAE وسياسة إعداد المحتوى والمصادر والتصحيح.', '/ar/المؤلفون/');
export default function AuthorsPage() {
  return <section className={styles.profilePage}><div className="ar-container"><JsonLd data={breadcrumbs([{ name: 'الجهة المسؤولة عن المحتوى', path: '/ar/المؤلفون/' }])} /><nav className={styles.breadcrumb} aria-label="مسار التصفح"><Link href="/ar/">الرئيسية</Link><span>/</span><span>عن المحتوى</span></nav><p className={styles.eyebrow}>تعرف من يكتب لك</p><h1>وراء كل دليل،<br /><em>مسؤولية واضحة.</em></h1><p className={styles.profileIntro}>هوية الناشر ومصادر المعلومات جزء أساسي من تجربتك معنا.</p><div className={styles.authorList}>{authors.map(author => <article key={author.slug} className={styles.authorBox}><span className={styles.avatar}>B<span>U</span></span><div><p className={styles.eyebrow}>{author.role}</p><h2><Link href={`/ar/المؤلفون/${author.urlSlug}/`}>{author.name}</Link></h2><p>{author.bio}</p><Link href={`/ar/المؤلفون/${author.urlSlug}/`} className={styles.textLink}>تعرّف على الناشر وتصفّح أدلته ←</Link></div></article>)}</div></div></section>;
}
