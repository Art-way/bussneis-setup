import { canonicalArabicUrl, postPath } from '../routes.mjs';
import Link from '../link';
import { notFound } from 'next/navigation';
import { categories, posts, getPost, getCategory, getAuthor, formatDate, formatReadingTime, siteUrl } from '../content';
import { arabicServiceNavigation } from '../navigation';
import { articleTopics } from '../market-segments';
import { editorialMetadata, JsonLd, breadcrumbs } from '../blog/seo';
import EditorialCover from '../blog/cover';
import ArticleCard from '../blog/article-card';
import ArticleBlocks, { Inline } from '../blog/article-blocks';
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

function ArticleSidebar({ categorySlug }) {
  return <aside className={styles.articleSidebar} aria-label="تصنيفات المدونة وخدمات الموقع">
    <nav className={styles.sidebarSection} aria-labelledby="sidebar-categories">
      <h2 id="sidebar-categories">تصنيفات المدونة</h2>
      <ul>{categories.map(category => <li key={category.slug}>
        <Link prefetch={false} className={category.slug === categorySlug ? styles.sidebarActive : undefined} href={`/ar/المدونة/تصنيف/${category.urlSlug}/`}>
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
  if (!post) notFound();
  const category = getCategory(post.categorySlug);
  const author = getAuthor(post.authorSlug);
  const authorPath = '/ar/المؤلفون/' + author.urlSlug + '/';
  const isDubai = post.emirateSlug === 'dubai';
  const path = postPath(post);
  const categoryPath = '/ar/المدونة/تصنيف/' + category.urlSlug + '/';
  const categoryCrumb = { name: category.title, path: categoryPath };
  const blogCrumb = { name: 'المدونة', path: '/ar/المدونة/' };
  const trail = [blogCrumb, categoryCrumb];
  const related = posts.filter(item => item.slug !== post.slug).sort((a, b) => (Number(b.emirateSlug === post.emirateSlug) * 2 + Number(b.categorySlug === post.categorySlug)) - (Number(a.emirateSlug === post.emirateSlug) * 2 + Number(a.categorySlug === post.categorySlug))).slice(0, 3);
  const index = <ArticleContents sections={post.sections} showSources={post.sources.length > 0} />;
  const contents = isDubai ? <details className={`${styles.toc} ${styles.inlineContents}`}><summary>محتويات المقال <span aria-hidden="true">+</span></summary>{index}</details> : null;
  return <>
    <JsonLd data={breadcrumbs([...trail, { name: post.title, path }], { includeHome: !isDubai })} />
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BlogPosting', '@id': canonicalArabicUrl(path + '#article'), headline: post.title, description: post.excerpt, inLanguage: 'ar-EG', mainEntityOfPage: canonicalArabicUrl(path),
      ...(post.publishedAt ? { datePublished: post.publishedAt } : {}), ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
      ...(post.image ? { image: [new URL(post.image.src, siteUrl).href] } : {}),
      author: { '@type': 'Organization', name: author.name, url: canonicalArabicUrl(authorPath) }, publisher: { '@type': 'Organization', name: 'BSetup UAE', url: siteUrl }, articleSection: isDubai ? ['تأسيس الشركات في دبي', ...post.topicSlugs.map(slug => articleTopics[slug])] : category.title,
      ...(post.sources.length ? { citation: post.sources.map(source => source.url) } : {}),
    }} />
    <article>
      <header className={styles.articleHeader}><div className="ar-container">
        <nav aria-label="مسار التصفح" className={styles.breadcrumb}>
          {!isDubai && <Link href="/ar/">الرئيسية العربية</Link>}
          {trail.map((item, i) => <span key={item.path} className={styles.breadcrumbItem}>{(!isDubai || i > 0) && <span aria-hidden="true">/</span>}<Link href={item.path}>{item.name}</Link></span>)}
          {isDubai && <><span aria-hidden="true">/</span><span aria-current="page">{post.title}</span></>}
        </nav>
        <div className={styles.articleHeading}>
          {!isDubai && <Link className={styles.categoryTag} href={categoryPath}>{category.title}</Link>}
          <h1>{post.title}</h1>
          <p className={styles.articleIntro}>{post.blocks ? post.takeaway : post.excerpt}</p>
          {isDubai ? <p className={styles.revisionLine}>آخر تعديل <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time></p> :
            <div className={styles.byline}><Link href={authorPath} className={styles.authorLink}><span className={styles.avatar} aria-hidden="true">B<span>U</span></span><span><strong>{author.name}</strong><small>{author.role}</small></span></Link><div className={styles.dateLine}>{post.publishedAt && <span>تاريخ النشر: <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></span>}{post.updatedAt && <span>آخر تحديث: <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time></span>}<span>{formatReadingTime(post.readingMinutes)} تقريباً</span></div></div>}
        </div>
      </div></header>
      <div className={`ar-container ${styles.articleLayout} ${isDubai ? styles.dubaiArticleLayout : ''}`}>
        {!isDubai && <aside className={styles.toc} aria-label="فهرس الدليل"><div className={styles.tocDesktop}><p className={styles.eyebrow}>في هذا الدليل</p>{index}<Link href="/ar/تواصل-معنا/" className={styles.tocCta}>جاهز لخطوتك القادمة؟<strong>خلّينا نتكلم عن مشروعك ←</strong></Link></div><details className={styles.tocMobile}><summary>في هذا الدليل <span aria-hidden="true">+</span></summary>{index}</details></aside>}
        <div className={styles.articleBody}>
          {post.blocks ? <ArticleBlocks blocks={post.blocks.slice(1)} afterFirstHeading={contents} /> : <>
            <EditorialCover category={post.categorySlug} className={styles.articleCover} />
            <div className={styles.takeaway}><span>الجواب أولاً</span><p>{post.takeaway}</p></div>
            <p className={styles.articleDisclosure}>دليل تمهيدي للمعلومات العامة. تختلف المتطلبات بحسب النشاط والجهة والحالة؛ راجع الجهة المختصة قبل أي التزام مالي أو قانوني.</p>
            {post.sections.map(section => <section className={styles.proseSection} id={section.id} key={section.id}><h2>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.followUp && <p><Inline content={section.followUp} /></p>}</section>)}
            <div className={styles.articleCta}><span className={styles.eyebrow}>حوّل المعرفة إلى خطوة</span><h2>عندك مشروع في بالك؟</h2><p>تعرّف على خدمات التأسيس، ثم شاركنا نشاطك واحتياجاتك لمناقشة المسار المناسب.</p><Link href={post.relatedService} className={styles.button}>استكشف خدمات التأسيس <span aria-hidden="true">←</span></Link></div>
          </>}
          {post.sources.length > 0 && <section id="sources" className={styles.sources}><p className={styles.eyebrow}>للتأكد والقراءة الإضافية</p><h2>المصادر الرسمية</h2><p>استند هذا الدليل إلى الصفحات التالية عند إعداد نسخته بتاريخ {formatDate(post.updatedAt)}. قد تحدّث الجهات متطلباتها لاحقاً.</p><ol>{post.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<span aria-hidden="true">↗</span><small dir="ltr">{new URL(source.url).hostname}</small></a></li>)}</ol><Link href="/ar/سياسة-التحرير/" className={styles.textLink}>سياسة إعداد المحتوى والتصحيح ←</Link></section>}
          <section className={styles.authorBox} aria-label="عن الجهة الناشرة"><span className={styles.avatar} aria-hidden="true">B<span>U</span></span><div><p className={styles.eyebrow}>مسؤولية النشر</p><h2><Link href={authorPath}>{author.name}</Link></h2><p>{author.bio}</p><div className={styles.authorLinks}><Link className={styles.textLink} href={authorPath}>ملف الناشر وجميع أدلته <span aria-hidden="true">←</span></Link><Link className={styles.textLink} href="/ar/سياسة-التحرير/">سياسة التحرير والتصحيح <span aria-hidden="true">↗</span></Link></div></div></section>
          <p className={styles.correction}>لاحظت معلومة تحتاج تصحيحاً؟ <a href={'mailto:info@businesssetupuae.ae?subject=' + encodeURIComponent('تصحيح محتوى: ' + post.title)}>أبلغ فريق التحرير</a> مع رابط الدليل والمصدر المقترح.</p>
          {post.consultation && <ArticleConsultation consultation={post.consultation} />}
        </div>
        {isDubai && <ArticleSidebar categorySlug={post.categorySlug} />}
      </div>
    </article>
    <section className={styles.related}><div className="ar-container"><div className={styles.libraryTop}><div><p className={styles.eyebrow}>كمّل الصورة</p><h2>أدلة قد تفيد خطوتك القادمة</h2></div><Link href={categoryPath} className={styles.textLink}>تصفّح الأدلة ذات الصلة ←</Link></div><div className={styles.cardGrid}>{related.map(item => <ArticleCard post={item} key={item.slug} />)}</div></div></section>
  </>;
}
