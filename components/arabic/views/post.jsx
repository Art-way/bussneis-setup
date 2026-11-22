import { canonicalArabicUrl, categoryPath, postPath } from '../routes.mjs';
import Link from '../link';
import { notFound } from 'next/navigation';
import { categories, posts, getPost, getCategory, getAuthor, formatDate, siteUrl } from '../content';
import { arabicServiceNavigation } from '../navigation';
import { articleTopics } from '../market-segments';
import { editorialMetadata, JsonLd, breadcrumbs } from '../blog/seo';
import ArticleCard from '../blog/article-card';
import ArticleBlocks from '../blog/article-blocks';
import ArticleSidebarForm from '../blog/article-sidebar-form';
import styles from '../blog/blog.module.css';

// Set the owner's Arabic form embed URL here when it is supplied.
const sidebarFormEmbedUrl = null;

export async function generateMetadata({ params: paramsPromise }) {
  const params = await paramsPromise;
  const post = getPost(params.slug);
  if (!post) return {};
  const url = canonicalArabicUrl(postPath(post));
  return editorialMetadata(post.metaTitle || post.title, post.excerpt, postPath(post), {
    ...(post.metaTitle ? { title: { absolute: post.metaTitle } } : {}),
    openGraph: { type: 'article', title: post.metaTitle || post.title, description: post.excerpt, url, locale: 'ar_EG',
      ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}), ...(post.updatedAt ? { modifiedTime: post.updatedAt } : {}),
      authors: [canonicalArabicUrl('/ar/authors/' + getAuthor(post.authorSlug).urlSlug + '/')],
      ...(post.image ? { images: [{ url: new URL(post.image.src, siteUrl).href, width: post.image.width, height: post.image.height, alt: post.image.alt }] } : {}),
    },
    ...(post.image ? { twitter: { card: 'summary_large_image', title: post.metaTitle, description: post.excerpt, images: [{ url: new URL(post.image.src, siteUrl).href, alt: post.image.alt }] } } : {}),
  });
}

function ArticleContents({ sections, showSources }) {
  return <nav aria-label="محتويات المقال"><ol>{sections.map((section, index) => <li key={section.id}><a href={'#' + section.id}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{section.title}</a></li>)}{showSources && <li><a href="#sources"><span aria-hidden="true">↗</span>المصادر والمراجع</a></li>}</ol></nav>;
}

function ArticleSidebar({ categorySlug, requestHref }) {
  return <aside className={styles.articleSidebar} aria-label="تصنيفات المدونة وخدمات الموقع">
    <ArticleSidebarForm embedUrl={sidebarFormEmbedUrl} requestHref={requestHref} />
    <nav className={styles.sidebarSection} aria-labelledby="sidebar-categories">
      <h2 id="sidebar-categories">تصنيفات المدونة</h2>
      <ul>{categories.filter(category => posts.some(post => post.categorySlug === category.slug)).map(category => <li key={category.slug}>
        <Link prefetch={false} className={category.slug === categorySlug ? styles.sidebarActive : undefined} href={categoryPath(category.urlSlug)}>
          {category.title}<span aria-hidden="true">←</span>
        </Link>
      </li>)}</ul>
    </nav>
    <nav className={styles.sidebarSection} aria-labelledby="sidebar-services">
      <h2 id="sidebar-services">خدمات الموقع</h2>
      <ul>{arabicServiceNavigation.map(service => <li key={service.path}>
        <Link prefetch={false} href={service.path}>{service.title}<span aria-hidden="true">←</span></Link>
      </li>)}</ul>
      <Link prefetch={false} href="/ar/الخدمات/" className={styles.sidebarAllServices}>عرض كل الخدمات <span aria-hidden="true">←</span></Link>
    </nav>
  </aside>;
}

function ArticleConsultation({ consultation }) {
  return <section id="article-consultation" className={`${styles.articleCta} ${styles.consultationCta}`} aria-labelledby="article-consultation-title">
    <span className={styles.eyebrow}>استشارة مع فريق BSetup UAE</span>
    <h2 id="article-consultation-title">{consultation.title}</h2>
    <p>{consultation.description}</p>
    <Link prefetch={false} href={consultation.href} className="ar-button">اطلب استشارة <span aria-hidden="true">←</span></Link>
  </section>;
}

export default async function ArticlePage({ params: paramsPromise }) {
  const params = await paramsPromise;
  const post = getPost(params.slug);
  if (!post?.blocks) notFound();
  const category = getCategory(post.categorySlug);
  const author = getAuthor(post.authorSlug);
  const authorPath = '/ar/authors/' + author.urlSlug + '/';
  const path = postPath(post);
  const categoryUrl = categoryPath(category.urlSlug);
  const categoryCrumb = { name: category.title, path: categoryUrl };
  const blogCrumb = { name: 'مدونة', path: '/ar/blog/' };
  const trail = [blogCrumb, categoryCrumb];
  const related = posts.filter(item => item.slug !== post.slug).sort((a, b) => (Number(b.emirateSlug === post.emirateSlug) * 2 + Number(b.categorySlug === post.categorySlug)) - (Number(a.emirateSlug === post.emirateSlug) * 2 + Number(a.categorySlug === post.categorySlug))).slice(0, 3);
  const index = <ArticleContents sections={post.sections} showSources={post.sources.length > 0} />;
  const contents = <details className={`${styles.toc} ${styles.inlineContents}`}><summary>محتويات المقال <span aria-hidden="true">+</span></summary>{index}</details>;
  return <>
    <JsonLd data={breadcrumbs([...trail, { name: post.title, path }], { includeHome: false })} />
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BlogPosting', '@id': canonicalArabicUrl(path + '#article'), headline: post.title, description: post.excerpt, inLanguage: 'ar-EG', mainEntityOfPage: canonicalArabicUrl(path),
      ...(post.publishedAt ? { datePublished: post.publishedAt } : {}), ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
      ...(post.image ? { image: [new URL(post.image.src, siteUrl).href] } : {}),
      author: { '@type': 'Organization', name: author.name, url: canonicalArabicUrl(authorPath) }, publisher: { '@type': 'Organization', name: 'BSetup UAE', url: siteUrl }, articleSection: post.emirateSlug === 'dubai' ? ['تأسيس الشركات في دبي', ...post.topicSlugs.map(slug => articleTopics[slug])] : category.title,
      ...(post.sources.length ? { citation: post.sources.map(source => source.url) } : {}),
    }} />
    <article>
      <header className={styles.articleHeader}><div className="ar-container">
        <nav aria-label="مسار التصفح" className={styles.breadcrumb}>
          {trail.map((item, i) => <span key={item.path} className={styles.breadcrumbItem}>{i > 0 && <span aria-hidden="true">/</span>}<Link href={item.path}>{item.name}</Link></span>)}
          <span aria-hidden="true">/</span><span aria-current="page">{post.title}</span>
        </nav>
        <div className={styles.articleHeading}>
          <h1>{post.title}</h1>
          <p className={styles.articleIntro}>{post.takeaway}</p>
          <p className={styles.revisionLine}>آخر تعديل <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time></p>
        </div>
      </div></header>
      <div className={`ar-container ${styles.articleLayout} ${styles.articleWithSidebar}`}>
        <div className={styles.articleBody}>
          <ArticleBlocks blocks={post.blocks.slice(1)} afterFirstHeading={contents} />
          {post.sources.length > 0 && <section id="sources" className={styles.sources}><p className={styles.eyebrow}>للتأكد والقراءة الإضافية</p><h2>المصادر الرسمية</h2><p>استند هذا الدليل إلى الصفحات التالية عند إعداد نسخته بتاريخ {formatDate(post.updatedAt)}. قد تحدّث الجهات متطلباتها لاحقاً.</p><ol>{post.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<span aria-hidden="true">↗</span><small dir="ltr">{new URL(source.url).hostname}</small></a></li>)}</ol><Link href="/ar/سياسة-التحرير/" className={styles.textLink}>سياسة إعداد المحتوى والتصحيح ←</Link></section>}
          <section className={styles.authorBox} aria-label="عن الجهة الناشرة"><span className={styles.avatar} aria-hidden="true">B<span>U</span></span><div><p className={styles.eyebrow}>مسؤولية النشر</p><h2><Link href={authorPath}>{author.name}</Link></h2><p>{author.bio}</p><div className={styles.authorLinks}><Link className={styles.textLink} href={authorPath}>ملف الناشر وجميع أدلته <span aria-hidden="true">←</span></Link><Link className={styles.textLink} href="/ar/سياسة-التحرير/">سياسة التحرير والتصحيح <span aria-hidden="true">↗</span></Link></div></div></section>
          <p className={styles.correction}>لاحظت معلومة تحتاج تصحيحاً؟ <a href={'mailto:info@businesssetupuae.ae?subject=' + encodeURIComponent('تصحيح محتوى: ' + post.title)}>أبلغ فريق التحرير</a> مع رابط الدليل والمصدر المقترح.</p>
          {post.consultation && <ArticleConsultation consultation={post.consultation} />}
        </div>
        <ArticleSidebar categorySlug={post.categorySlug} requestHref={post.consultation?.href || post.relatedService} />
      </div>
    </article>
    <section className={styles.related}><div className="ar-container"><div className={styles.libraryTop}><div><p className={styles.eyebrow}>كمّل الصورة</p><h2>أدلة قد تفيد خطوتك القادمة</h2></div><Link href={categoryUrl} className={styles.textLink}>تصفّح الأدلة ذات الصلة ←</Link></div><div className={styles.cardGrid}>{related.map(item => <ArticleCard post={item} key={item.slug} />)}</div></div></section>
  </>;
}
