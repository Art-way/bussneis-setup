import { canonicalArabicUrl } from '@/components/arabic/routes.mjs';
import Link from '@/components/arabic/link';
import { notFound } from 'next/navigation';
import { posts, getAuthor, siteUrl } from '@/components/arabic/content';
import ArticleCard from '@/components/arabic/blog/article-card';
import { editorialMetadata, JsonLd, breadcrumbs } from '@/components/arabic/blog/seo';
import styles from '@/components/arabic/blog/blog.module.css';

export async function generateMetadata({ params: paramsPromise }) {
  const params = await paramsPromise;
  const author = getAuthor(params.slug);
  return author ? editorialMetadata(author.name, author.bio, `/ar/authors/${author.urlSlug}/`) : {};
}
export default async function AuthorPage({ params: paramsPromise }) {
  const params = await paramsPromise;
  const author = getAuthor(params.slug);
  if (!author) notFound();
  const authorPosts = posts.filter(post => post.authorSlug === author.slug);
  return <>
    <JsonLd data={breadcrumbs([{ name: 'عن المحتوى', path: '/ar/authors/' }, { name: author.name, path: `/ar/authors/${author.urlSlug}/` }])} />
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'ProfilePage', url: canonicalArabicUrl(`/ar/authors/${author.urlSlug}/`), inLanguage: 'ar-EG', mainEntity: { '@type': 'Organization', name: author.name, description: author.bio, url: canonicalArabicUrl(`/ar/authors/${author.urlSlug}/`), parentOrganization: { '@type': 'Organization', name: 'BSetup UAE', url: siteUrl } } }} />
    <section className={styles.profilePage}><div className="ar-container"><nav className={styles.breadcrumb} aria-label="مسار التصفح"><Link href="/ar/">الرئيسية</Link><span>/</span><Link href="/ar/authors/">عن المحتوى</Link><span>/</span><span>فريق التحرير</span></nav><div className={styles.profileGrid}><div><p className={styles.eyebrow}>هوية الناشر</p><h1>{author.name}</h1><p className={styles.profileIntro}>{author.bio}</p><div className={styles.profileActions}><Link href="/ar/سياسة-التحرير/" className={styles.button}>سياسة المحتوى ←</Link><a href="mailto:info@businesssetupuae.ae" className={styles.textLink}>تواصل مع التحرير ↗</a></div></div><div className={styles.profileSeal} aria-hidden="true"><span>B<span>U</span></span><p>BSETUP UAE</p><small>معرفة تساعدك تبدأ</small></div></div><div className={styles.profilePrinciples}><div><span>01</span><h2>هوية واضحة</h2><p>المحتوى منسوب إلى جهة النشر، دون أسماء أو مؤهلات غير موثّقة.</p></div><div><span>02</span><h2>مصادر يمكن فحصها</h2><p>روابط للجهات الرسمية مرتبطة بموضوع كل دليل.</p></div><div><span>03</span><h2>نطاق محدّد</h2><p>أدلة تمهيدية عامة لا تحل محل التقييم المهني لحالتك.</p></div></div></div></section>
    <section className={styles.library}><div className="ar-container"><div className={styles.libraryTop}><div><p className={styles.eyebrow}>من هذه الجهة</p><h2>الأدلة المنشورة <span className={styles.count}>{authorPosts.length}</span></h2></div><Link href="/ar/المدونة/" className={styles.textLink}>تصفّح المجلة ←</Link></div><div className={styles.cardGrid}>{authorPosts.map(post => <ArticleCard key={post.slug} post={post} />)}</div></div></section>
  </>;
}
