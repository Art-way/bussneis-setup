import { canonicalArabicUrl, postPath, dubaiServicePath } from '../routes.mjs';
import Link from '../link';
import { notFound } from 'next/navigation';
import { posts, getPost, getCategory, getAuthor, formatDate, formatReadingTime, siteUrl } from '../content';
import { articleTopics } from '../market-segments';
import { editorialMetadata, JsonLd, breadcrumbs } from '../blog/seo';
import EditorialCover from '../blog/cover';
import ArticleCard from '../blog/article-card';
import ArticleBlocks from '../blog/article-blocks';
import styles from '../blog/blog.module.css';

export async function generateMetadata({ params: paramsPromise }) {
  const params = await paramsPromise;
  const post = getPost(params.slug);
  if (!post) return {};
  const url = canonicalArabicUrl(postPath(post));
  return editorialMetadata(post.metaTitle || post.title, post.excerpt, postPath(post), {
    ...(post.metaTitle ? { title: { absolute: post.metaTitle } } : {}),
    openGraph: { type: 'article', title: post.metaTitle || post.title, description: post.excerpt, url, locale: 'ar_EG',
      ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}), ...(post.updatedAt ? { modifiedTime: post.updatedAt } : {}),
      authors: [canonicalArabicUrl('/ar/المؤلفون/' + getAuthor(post.authorSlug).urlSlug + '/')],
      ...(post.image ? { images: [{ url: new URL(post.image.src, siteUrl).href, width: post.image.width, height: post.image.height, alt: post.image.alt }] } : {}),
    },
    ...(post.image ? { twitter: { card: 'summary_large_image', title: post.metaTitle, description: post.excerpt, images: [{ url: new URL(post.image.src, siteUrl).href, alt: post.image.alt }] } } : {}),
  });
}

function ArticleContents({ sections, showSources }) {
  return <nav aria-label="محتويات المقال"><ol>{sections.map((section, index) => <li key={section.id}><a href={'#' + section.id}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{section.title}</a></li>)}{showSources && <li><a href="#sources"><span aria-hidden="true">↗</span>المصادر والمراجع</a></li>}</ol></nav>;
}

export default async function ArticlePage({ params: paramsPromise }) {
  const params = await paramsPromise;
  const post = getPost(params.slug);
  if (!post) notFound();
  const category = getCategory(post.categorySlug);
  const author = getAuthor(post.authorSlug);
  const authorPath = '/ar/المؤلفون/' + author.urlSlug + '/';
  const isDubai = post.emirateSlug === 'dubai';
  const path = postPath(post);
  const categoryPath = '/ar/المدونة/تصنيف/' + category.urlSlug + '/';
  const collectionPath = isDubai ? '/ar/المدونة/?emirate=dubai#articles' : categoryPath;
  const trail = isDubai ? [{ name: 'تأسيس الشركات في دبي', path: dubaiServicePath }] : [{ name: 'المجلة', path: '/ar/المدونة/' }, { name: category.title, path: categoryPath }];
  const related = posts.filter(item => item.slug !== post.slug).sort((a, b) => (Number(b.emirateSlug === post.emirateSlug) * 2 + Number(b.categorySlug === post.categorySlug)) - (Number(a.emirateSlug === post.emirateSlug) * 2 + Number(a.categorySlug === post.categorySlug))).slice(0, 3);
  const index = <ArticleContents sections={post.sections} showSources={post.sources.length > 0} />;
  return <>
    <JsonLd data={breadcrumbs([...trail, { name: post.title, path }])} />
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BlogPosting', '@id': canonicalArabicUrl(path + '#article'), headline: post.title, description: post.excerpt, inLanguage: 'ar-EG', mainEntityOfPage: canonicalArabicUrl(path),
      ...(post.publishedAt ? { datePublished: post.publishedAt } : {}), ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
      ...(post.image ? { image: [new URL(post.image.src, siteUrl).href] } : {}),
      author: { '@type': 'Organization', name: author.name, url: canonicalArabicUrl(authorPath) }, publisher: { '@type': 'Organization', name: 'Business Setup UAE', url: siteUrl }, articleSection: isDubai ? ['تأسيس الشركات في دبي', ...post.topicSlugs.map(slug => articleTopics[slug])] : category.title,
      ...(post.sources.length ? { citation: post.sources.map(source => source.url) } : {}),
    }} />
    <article>
      <header className={styles.articleHeader}><div className="ar-container">
        <nav aria-label="مسار التصفح" className={styles.breadcrumb}><Link href="/ar/">الرئيسية العربية</Link>{trail.map(item => <span key={item.path} className={styles.breadcrumbItem}><span aria-hidden="true">/</span><Link href={item.path}>{item.name}</Link></span>)}{isDubai && <><span aria-hidden="true">/</span><span aria-current="page">{post.title}</span></>}</nav>
        <div className={styles.articleHeading}><Link className={styles.categoryTag} href={collectionPath}>{isDubai ? 'دبي · ' + articleTopics[post.topicSlugs[0]] : category.title}</Link><h1>{post.title}</h1><p className={styles.articleIntro}>{post.blocks ? post.takeaway : post.excerpt}</p>
          <div className={styles.byline}><Link href={authorPath} className={styles.authorLink}><span className={styles.avatar} aria-hidden="true">B<span>U</span></span><span><strong>{author.name}</strong><small>{author.role}</small></span></Link><div className={styles.dateLine}>{post.publishedAt && <span>تاريخ النشر: <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></span>}{post.updatedAt && <span>آخر تحديث: <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time></span>}<span>{formatReadingTime(post.readingMinutes)} تقريبًا</span></div></div>
        </div>
      </div></header>
      <div className={'ar-container ' + styles.articleLayout}>
        <aside className={styles.toc} aria-label="فهرس الدليل"><div className={styles.tocDesktop}><p className={styles.eyebrow}>في هذا الدليل</p>{index}<Link href={isDubai ? dubaiServicePath + '#request' : '/ar/تواصل-معنا/'} className={styles.tocCta}>جاهز لخطوتك القادمة؟<strong>خلّينا نتكلم عن مشروعك ←</strong></Link></div><details className={styles.tocMobile}><summary>في هذا الدليل <span aria-hidden="true">+</span></summary>{index}</details></aside>
        <div className={styles.articleBody}>
          {post.blocks ? <ArticleBlocks blocks={post.blocks.slice(1)} /> : <>
            <EditorialCover category={post.categorySlug} className={styles.articleCover} />
            <div className={styles.takeaway}><span>الجواب أولًا</span><p>{post.takeaway}</p></div>
            <p className={styles.articleDisclosure}>دليل تمهيدي للمعلومات العامة. تختلف المتطلبات بحسب النشاط والجهة والحالة؛ راجع الجهة المختصة قبل أي التزام مالي أو قانوني.</p>
            {post.sections.map(section => <section className={styles.proseSection} id={section.id} key={section.id}><h2>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}
            <div className={styles.articleCta}><span className={styles.eyebrow}>حوّل المعرفة إلى خطوة</span><h2>عندك مشروع في بالك؟</h2><p>تعرّف على خدمات التأسيس، ثم شاركنا نشاطك واحتياجاتك لمناقشة المسار المناسب.</p><Link href={post.relatedService} className={styles.button}>استكشف خدمات التأسيس <span aria-hidden="true">←</span></Link></div>
          </>}
          {post.sources.length > 0 && <section id="sources" className={styles.sources}><p className={styles.eyebrow}>للتأكد والقراءة الإضافية</p><h2>المصادر الرسمية</h2><p>استند هذا الدليل إلى الصفحات التالية عند إعداد نسخته بتاريخ {formatDate(post.updatedAt)}. قد تحدّث الجهات متطلباتها لاحقًا.</p><ol>{post.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<span aria-hidden="true">↗</span><small dir="ltr">{new URL(source.url).hostname}</small></a></li>)}</ol><Link href="/ar/سياسة-التحرير/" className={styles.textLink}>سياسة إعداد المحتوى والتصحيح ←</Link></section>}
          <section className={styles.authorBox} aria-label="عن الجهة الناشرة"><span className={styles.avatar} aria-hidden="true">B<span>U</span></span><div><p className={styles.eyebrow}>مسؤولية النشر</p><h2><Link href={authorPath}>{author.name}</Link></h2><p>{author.bio}</p><div className={styles.authorLinks}><Link className={styles.textLink} href={authorPath}>ملف الناشر وجميع أدلته <span aria-hidden="true">←</span></Link><Link className={styles.textLink} href="/ar/سياسة-التحرير/">سياسة التحرير والتصحيح <span aria-hidden="true">↗</span></Link></div></div></section>
          <p className={styles.correction}>لاحظت معلومة تحتاج تصحيحًا؟ <a href={'mailto:info@businesssetupuae.ae?subject=' + encodeURIComponent('تصحيح محتوى: ' + post.title)}>أبلغ فريق التحرير</a> مع رابط الدليل والمصدر المقترح.</p>
        </div>
      </div>
    </article>
    <section className={styles.related}><div className="ar-container"><div className={styles.libraryTop}><div><p className={styles.eyebrow}>كمّل الصورة</p><h2>أدلة قد تفيد خطوتك القادمة</h2></div><Link href={collectionPath} className={styles.textLink}>تصفّح الأدلة ذات الصلة ←</Link></div><div className={styles.cardGrid}>{related.map(item => <ArticleCard post={item} key={item.slug} />)}</div></div></section>
  </>;
}
