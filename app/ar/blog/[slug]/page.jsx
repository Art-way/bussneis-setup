import Link from '@/components/arabic/link';
import { notFound } from 'next/navigation';
import { posts, getPost, getCategory, getAuthor, formatDate, formatReadingTime, siteUrl } from '@/components/arabic/content';
import { editorialMetadata, JsonLd, breadcrumbs } from '@/components/arabic/blog/seo';
import EditorialCover from '@/components/arabic/blog/cover';
import ArticleCard from '@/components/arabic/blog/article-card';
import styles from '@/components/arabic/blog/blog.module.css';

export const dynamicParams = false;
export const generateStaticParams = () => posts.map(post => ({ slug: post.slug }));
export async function generateMetadata({ params: paramsPromise }) {
  const params = await paramsPromise;
  const post = getPost(params.slug);
  if (!post) return {};
  return editorialMetadata(post.title, post.excerpt, `/ar/blog/${post.slug}/`, { openGraph: { type: 'article', title: post.title, description: post.excerpt, url: `${siteUrl}/ar/blog/${post.slug}/`, locale: 'ar_EG', publishedTime: post.publishedAt, modifiedTime: post.updatedAt, authors: [`${siteUrl}/ar/authors/${post.authorSlug}/`] } });
}

function ArticleContents({ sections }) {
  return <nav aria-label="محتويات المقال"><ol>{sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{section.title}</a></li>)}<li><a href="#sources"><span aria-hidden="true">↗</span>المصادر والمراجع</a></li></ol></nav>;
}

export default async function ArticlePage({ params: paramsPromise }) {
  const params = await paramsPromise;
  const post = getPost(params.slug);
  if (!post) notFound();
  const category = getCategory(post.categorySlug);
  const author = getAuthor(post.authorSlug);
  const related = posts.filter(item => item.slug !== post.slug).sort((a, b) => Number(b.categorySlug === post.categorySlug) - Number(a.categorySlug === post.categorySlug)).slice(0, 3);
  return <>
    <JsonLd data={breadcrumbs([{ name: 'المجلة', path: '/ar/blog/' }, { name: category.title, path: `/ar/blog/category/${category.slug}/` }, { name: post.title, path: `/ar/blog/${post.slug}/` }])} />
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BlogPosting', '@id': `${siteUrl}/ar/blog/${post.slug}/#article`, headline: post.title, description: post.excerpt, inLanguage: 'ar-EG', mainEntityOfPage: `${siteUrl}/ar/blog/${post.slug}/`, datePublished: post.publishedAt, dateModified: post.updatedAt, author: { '@type': 'Organization', name: author.name, url: `${siteUrl}/ar/authors/${author.slug}/` }, publisher: { '@type': 'Organization', name: 'Business Setup UAE', url: siteUrl }, articleSection: category.title, citation: post.sources.map(source => source.url) }} />
    <article>
      <header className={styles.articleHeader}><div className="ar-container">
        <nav aria-label="مسار التصفح" className={styles.breadcrumb}><Link href="/ar/">الرئيسية</Link><span>/</span><Link href="/ar/blog/">المجلة</Link><span>/</span><Link href={`/ar/blog/category/${category.slug}/`}>{category.title}</Link></nav>
        <div className={styles.articleHeading}><Link className={styles.categoryTag} href={`/ar/blog/category/${category.slug}/`}>{category.title}</Link><h1>{post.title}</h1><p className={styles.articleIntro}>{post.excerpt}</p>
          <div className={styles.byline}><Link href={`/ar/authors/${author.slug}/`} className={styles.authorLink}><span className={styles.avatar} aria-hidden="true">B<span>U</span></span><span><strong>{author.name}</strong><small>{author.role}</small></span></Link><div className={styles.dateLine}><span>تاريخ النشر: <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></span><span>آخر تحديث: <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time></span><span>{formatReadingTime(post.readingMinutes)} تقريبًا</span></div></div>
        </div>
      </div></header>
      <div className={`ar-container ${styles.articleLayout}`}>
        <aside className={styles.toc} aria-label="فهرس الدليل"><div className={styles.tocDesktop}><p className={styles.eyebrow}>في هذا الدليل</p><ArticleContents sections={post.sections} /><Link href="/ar/contact/" className={styles.tocCta}>جاهز لخطوتك القادمة؟<strong>خلّينا نتكلم عن مشروعك ←</strong></Link></div><details className={styles.tocMobile}><summary>في هذا الدليل <span aria-hidden="true">+</span></summary><ArticleContents sections={post.sections} /></details></aside>
        <div className={styles.articleBody}>
          <EditorialCover category={post.categorySlug} className={styles.articleCover} />
          <div className={styles.takeaway}><span>الجواب أولًا</span><p>{post.takeaway}</p></div>
          <p className={styles.articleDisclosure}>دليل تمهيدي للمعلومات العامة. تختلف المتطلبات بحسب النشاط والجهة والحالة؛ راجع الجهة المختصة قبل أي التزام مالي أو قانوني.</p>
          {post.sections.map(section => <section className={styles.proseSection} id={section.id} key={section.id}><h2>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}
          <div className={styles.articleCta}><span className={styles.eyebrow}>حوّل المعرفة إلى خطوة</span><h2>عندك مشروع في بالك؟</h2><p>تعرّف على خدمات التأسيس، ثم شاركنا نشاطك واحتياجاتك لمناقشة المسار المناسب.</p><Link href={post.relatedService} className={styles.button}>استكشف خدمات التأسيس <span aria-hidden="true">←</span></Link></div>
          <section id="sources" className={styles.sources}><p className={styles.eyebrow}>للتأكد والقراءة الإضافية</p><h2>المصادر الرسمية</h2><p>استند هذا الدليل إلى الصفحات التالية عند إعداد نسخته بتاريخ {formatDate(post.updatedAt)}. قد تحدّث الجهات متطلباتها لاحقًا.</p><ol>{post.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<span aria-hidden="true">↗</span><small dir="ltr">{new URL(source.url).hostname}</small></a></li>)}</ol><Link href="/ar/editorial-policy/" className={styles.textLink}>سياسة إعداد المحتوى والتصحيح ←</Link></section>
          <section className={styles.authorBox} aria-label="عن الجهة الناشرة"><span className={styles.avatar} aria-hidden="true">B<span>U</span></span><div><p className={styles.eyebrow}>إعداد ونشر</p><h2><Link href={`/ar/authors/${author.slug}/`}>{author.name}</Link></h2><p>{author.bio}</p><div className={styles.authorLinks}><Link className={styles.textLink} href={`/ar/authors/${author.slug}/`}>ملف الناشر وجميع أدلته <span aria-hidden="true">←</span></Link><Link className={styles.textLink} href="/ar/editorial-policy/">سياسة التحرير والتصحيح <span aria-hidden="true">↗</span></Link></div></div></section>
          <p className={styles.correction}>لاحظت معلومة تحتاج تصحيحًا؟ <a href={`mailto:info@businesssetupuae.ae?subject=${encodeURIComponent(`تصحيح محتوى: ${post.title}`)}`}>أبلغ فريق التحرير</a> مع رابط الدليل والمصدر المقترح.</p>
        </div>
      </div>
    </article>
    <section className={styles.related}><div className="ar-container"><div className={styles.libraryTop}><div><p className={styles.eyebrow}>كمّل الصورة</p><h2>أدلة قد تفيد خطوتك القادمة</h2></div><Link href={`/ar/blog/category/${category.slug}/`} className={styles.textLink}>كل أدلة {category.title} ←</Link></div><div className={styles.cardGrid}>{related.map(item => <ArticleCard post={item} key={item.slug} />)}</div></div></section>
  </>;
}
