import { canonicalArabicUrl } from '@/components/arabic/routes.mjs';
import Link from '@/components/arabic/link';
import { categories, posts, getCategory, formatDate, formatReadingTime } from '../content';
import ArticleCard from './article-card';
import EditorialCover from './cover';
import { JsonLd, breadcrumbs } from './seo';
import styles from './blog.module.css';

export default function BlogListing({ categorySlug, query = '' }) {
  const category = getCategory(categorySlug);
  const normalize = value => value.toLocaleLowerCase('ar').replace(/[\u064B-\u065F\u0670\u0640]/g, '').replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي');
  const searchTerms = normalize(query.trim()).split(/\s+/).filter(Boolean).map(term => term.startsWith('ال') && term.length > 3 ? term.slice(2) : term);
  const visiblePosts = posts.filter(post => {
    if (category && post.categorySlug !== category.slug) return false;
    const searchableText = normalize([post.title, post.excerpt, getCategory(post.categorySlug)?.title, ...post.sections.flatMap(section => [section.title, ...section.paragraphs])].join(' '));
    return searchTerms.every(term => searchableText.includes(term));
  });
  const featured = posts[0];
  const path = category ? `/ar/المدونة/تصنيف/${category.urlSlug}/` : '/ar/المدونة/';
  return <>
    <JsonLd data={breadcrumbs([{ name: 'المجلة', path: '/ar/المدونة/' }, ...(category ? [{ name: category.title, path }] : [])])} />
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: category?.title || 'مجلة الأعمال', url: canonicalArabicUrl(path), inLanguage: 'ar-EG', mainEntity: { '@type': 'ItemList', itemListElement: visiblePosts.map((post, index) => ({ '@type': 'ListItem', position: index + 1, url: canonicalArabicUrl(`/ar/المدونة/${post.urlSlug}/`), name: post.title })) } }} />
    <section className={styles.blogHero}>
      <div className="ar-container">
        <nav aria-label="مسار التصفح" className={styles.breadcrumb}><Link href="/ar/">الرئيسية</Link><span>/</span>{category ? <><Link href="/ar/المدونة/">المجلة</Link><span>/</span><span>{category.title}</span></> : <span>مجلة الأعمال</span>}</nav>
        <div className={styles.heroGrid}><div><p className={styles.eyebrow}><span /> {category ? category.kicker : 'مجلة الأعمال · من مصر إلى الإمارات'}</p><h1>{category ? category.title : <>قرارات أوضح.<br /><em>بداية أقوى.</em></>}</h1></div><div className={styles.heroAside}><span className={styles.editorialMark} aria-hidden="true">✳</span><p>{category ? category.description : 'مساحة تفهم فيها الخيارات، وتقارن بهدوء، وتخطط لخطوتك القادمة. أدلة عملية لرحلة تأسيس شركتك في الإمارات.'}</p><Link className={styles.textLink} href="/ar/سياسة-التحرير/">تعرّف على سياسة المحتوى <span aria-hidden="true">↗</span></Link></div></div>
        {!category && !query && <article className={styles.featured}>
          <Link href={`/ar/المدونة/${featured.urlSlug}/`} className={styles.featuredImage} aria-hidden="true" tabIndex={-1}><EditorialCover category={featured.categorySlug} /></Link>
          <div className={styles.featuredContent}><div className={styles.featuredLabel}><span>نقطة البداية</span><span>دليل تمهيدي</span></div><h2><Link href={`/ar/المدونة/${featured.urlSlug}/`}>{featured.title}</Link></h2><p>{featured.excerpt}</p><div className={styles.featuredBottom}><div><Link href="/ar/المؤلفون/فريق-التحرير/">فريق التحرير</Link><span><time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time> · {formatReadingTime(featured.readingMinutes)}</span></div><Link href={`/ar/المدونة/${featured.urlSlug}/`} aria-label={`اقرأ: ${featured.title}`} className={styles.roundArrow}>←</Link></div></div>
        </article>}
      </div>
    </section>
    <section className={styles.library} id="articles">
      <div className="ar-container">
        <div className={styles.libraryTop}><div><p className={styles.eyebrow}>معرفة تبني عليها</p><h2>{query ? 'نتائج البحث' : category ? `أدلة ${category.title}` : 'تصفّح حسب خطوتك'}</h2></div><form action={path} method="get" className={styles.search} role="search"><label htmlFor="blog-search" className={styles.visuallyHidden}>ابحث في أدلة الأعمال</label><input id="blog-search" type="search" name="q" placeholder="عن ماذا تبحث؟" defaultValue={query} maxLength={120} /><button type="submit" aria-label="ابحث في المجلة"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg></button></form></div>
        <nav className={styles.categories} aria-label="تصنيفات المجلة"><Link href="/ar/المدونة/#articles" aria-current={!category ? 'page' : undefined}>كل الأدلة <span>{posts.length}</span></Link>{categories.map(item => <Link key={item.slug} href={`/ar/المدونة/تصنيف/${item.urlSlug}/#articles`} aria-current={category?.slug === item.slug ? 'page' : undefined}>{item.title}<span>{posts.filter(post => post.categorySlug === item.slug).length}</span></Link>)}</nav>
        {query && <p className={styles.resultNote}>{visiblePosts.length} نتائج لعبارة «{query}» <Link href={path}>مسح البحث</Link></p>}
        {visiblePosts.length ? <div className={styles.cardGrid}>{visiblePosts.map(post => <ArticleCard key={post.slug} post={post} />)}</div> : <div className={styles.empty}><span aria-hidden="true">⌕</span><h3>لنجرّب كلمة أخرى</h3><p>ما لقينا دليلًا يطابق البحث. جرّب «التأسيس» أو «التكلفة»، أو تصفّح كل الأدلة.</p><Link className={styles.button} href={path}>عرض كل الأدلة ←</Link></div>}
      </div>
    </section>
    <section className={styles.trustStrip}><div className="ar-container"><span className={styles.trustIcon} aria-hidden="true">↗</span><div><h2>وضوح المعلومة جزء من وضوح القرار.</h2><p>مصادر رسمية ظاهرة، وهوية للناشر، وتاريخ نشر وتحديث لكل دليل.</p></div><Link href="/ar/سياسة-التحرير/">كيف نعدّ المحتوى؟ <span aria-hidden="true">←</span></Link></div></section>
  </>;
}
