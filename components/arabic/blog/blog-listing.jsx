import { canonicalArabicUrl, postPath } from '@/components/arabic/routes.mjs';
import Link from '@/components/arabic/link';
import { categories, posts, getCategory, formatDate, formatReadingTime } from '../content';
import ArticleCard from './article-card';
import EditorialCover from './cover';
import { JsonLd, breadcrumbs } from './seo';
import styles from './blog.module.css';
import { availableEmirates, articleTopics, getEmirate } from '../market-segments';

export default function BlogListing({ categorySlug, query = '', emirateSlug = '', topicSlug = '' }) {
  const category = getCategory(categorySlug);
  const emirate = availableEmirates.find(item => item.slug === emirateSlug);
  const topic = emirate && articleTopics[topicSlug] ? topicSlug : '';
  const filterParams = new URLSearchParams();
  if (emirate) filterParams.set('emirate', emirate.slug);
  if (topic) filterParams.set('topic', topic);
  const filterSuffix = filterParams.size ? '?' + filterParams : '';
  const normalize = value => value.toLocaleLowerCase('ar').replace(/[\u064B-\u065F\u0670\u0640]/g, '').replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي');
  const searchTerms = normalize(query.trim()).split(/\s+/).filter(Boolean).map(term => term.startsWith('ال') && term.length > 3 ? term.slice(2) : term);
  const visiblePosts = posts.filter(post => {
    if (category && post.categorySlug !== category.slug) return false;
    if (emirate && post.emirateSlug !== emirate.slug) return false;
    if (topic && !post.topicSlugs?.includes(topic)) return false;
    const searchableText = normalize([post.title, post.excerpt, getCategory(post.categorySlug)?.title, ...post.sections.flatMap(section => [section.title, ...section.paragraphs]), ...(post.blocks || []).flatMap(block => block.content?.map(run => run.text) || block.items?.flatMap(item => item.map(run => run.text)) || block.rows?.flat() || [block.text || ''])].join(' '));
    return searchTerms.every(term => searchableText.includes(term));
  });
  const countPosts = posts.filter(post => (!emirate || post.emirateSlug === emirate.slug) && (!topic || post.topicSlugs?.includes(topic)));
  const featured = posts[0];
  const path = category ? `/ar/المدونة/تصنيف/${category.urlSlug}/` : '/ar/المدونة/';
  return <>
    <JsonLd data={breadcrumbs([{ name: 'المجلة', path: '/ar/المدونة/' }, ...(category ? [{ name: category.title, path }] : [])])} />
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: category?.title || 'مجلة الأعمال', url: canonicalArabicUrl(path), inLanguage: 'ar-EG', mainEntity: { '@type': 'ItemList', itemListElement: visiblePosts.map((post, index) => ({ '@type': 'ListItem', position: index + 1, url: canonicalArabicUrl(postPath(post)), name: post.title })) } }} />
    <section className={styles.blogHero}>
      <div className="ar-container">
        <nav aria-label="مسار التصفح" className={styles.breadcrumb}><Link href="/ar/">الرئيسية</Link><span>/</span>{category ? <><Link href="/ar/المدونة/">المجلة</Link><span>/</span><span>{category.title}</span></> : <span>مجلة الأعمال</span>}</nav>
        <div className={styles.heroGrid}><div><p className={styles.eyebrow}><span /> {category ? category.kicker : 'مجلة الأعمال · من مصر إلى الإمارات'}</p><h1>{category ? category.title : <>قرارات أوضح.<br /><em>بداية أقوى.</em></>}</h1></div><div className={styles.heroAside}><span className={styles.editorialMark} aria-hidden="true">✳</span><p>{category ? category.description : 'مساحة تفهم فيها الخيارات، وتقارن بهدوء، وتخطط لخطوتك القادمة. أدلة عملية لرحلة تأسيس شركتك في الإمارات.'}</p><Link className={styles.textLink} href="/ar/سياسة-التحرير/">تعرّف على سياسة المحتوى <span aria-hidden="true">↗</span></Link></div></div>
        {!category && !query && !emirate && <article className={styles.featured}>
          <Link href={postPath(featured)} className={styles.featuredImage} aria-hidden="true" tabIndex={-1}>{featured.image ? <img src={featured.image.src} srcSet={featured.image.srcSet} sizes="(max-width: 640px) 90vw, 50vw" width={featured.image.width} height={featured.image.height} alt={featured.image.alt} fetchPriority="high" /> : <EditorialCover category={featured.categorySlug} />}</Link>
          <div className={styles.featuredContent}><div className={styles.featuredLabel}><span>من مقالات دبي</span><span>{articleTopics[featured.topicSlugs[0]]}</span></div><h2><Link href={postPath(featured)}>{featured.title}</Link></h2><p>{featured.excerpt}</p><div className={styles.featuredBottom}><div><Link href="/ar/المؤلفون/فريق-التحرير/">فريق التحرير</Link><span>{featured.publishedAt && <><time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time> · </>}{formatReadingTime(featured.readingMinutes)}</span></div><Link href={postPath(featured)} aria-label={`اقرأ: ${featured.title}`} className={styles.roundArrow}>←</Link></div></div>
        </article>}
      </div>
    </section>
    <section className={styles.library} id="articles">
      <div className="ar-container">
        <div className={styles.libraryTop}><div><p className={styles.eyebrow}>معرفة تبني عليها</p><h2>{query ? 'نتائج البحث' : emirate ? `مقالات ${getEmirate(emirate.slug).name}${topic ? ' · ' + articleTopics[topic] : ''}` : category ? `أدلة ${category.title}` : 'تصفّح حسب خطوتك'}</h2></div><form action={path} method="get" className={styles.search} role="search"><label htmlFor="blog-search" className={styles.visuallyHidden}>ابحث في أدلة الأعمال</label>{emirate && <input type="hidden" name="emirate" value={emirate.slug} />}{topic && <input type="hidden" name="topic" value={topic} />}<input id="blog-search" type="search" name="q" placeholder="عن ماذا تبحث؟" defaultValue={query} maxLength={120} /><button type="submit" aria-label="ابحث في المجلة"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg></button></form></div>
        <nav className={styles.marketFilters} aria-label="تصفية المقالات بحسب الإمارة"><strong>حسب الإمارة</strong><Link href={path + '#articles'} aria-current={!emirate ? 'page' : undefined}>كل المقالات</Link>{availableEmirates.map(item => <Link key={item.slug} href={path + '?emirate=' + item.slug + '#articles'} aria-current={emirate?.slug === item.slug ? 'page' : undefined}>{item.name}</Link>)}</nav>
        {emirate && <nav className={styles.marketFilters} aria-label="تصفية مقالات دبي بحسب الموضوع"><strong>موضوع المقال</strong><Link href={path + '?emirate=dubai#articles'} aria-current={!topic ? 'page' : undefined}>كل موضوعات دبي</Link>{Object.entries(articleTopics).map(([slug,label]) => <Link key={slug} href={path + '?emirate=dubai&topic=' + slug + '#articles'} aria-current={topic === slug ? 'page' : undefined}>{label}</Link>)}</nav>}
        <nav className={styles.categories} aria-label="تصنيفات المجلة"><Link href={'/ar/المدونة/' + filterSuffix + '#articles'} aria-current={!category ? 'page' : undefined}>كل الأدلة <span>{countPosts.length}</span></Link>{categories.map(item => <Link key={item.slug} href={`/ar/المدونة/تصنيف/${item.urlSlug}/${filterSuffix}#articles`} aria-current={category?.slug === item.slug ? 'page' : undefined}>{item.title}<span>{countPosts.filter(post => post.categorySlug === item.slug).length}</span></Link>)}</nav>
        {query && <p className={styles.resultNote}>{visiblePosts.length} نتائج لعبارة «{query}» <Link href={path + filterSuffix}>مسح البحث</Link></p>}
        {visiblePosts.length ? <div className={styles.cardGrid}>{visiblePosts.map(post => <ArticleCard key={post.slug} post={post} />)}</div> : <div className={styles.empty}><span aria-hidden="true">⌕</span><h3>لنجرّب كلمة أخرى</h3><p>ما لقينا دليلاً يطابق البحث. جرّب «التأسيس» أو «التكلفة»، أو تصفّح كل الأدلة.</p><Link className={styles.button} href={path + filterSuffix}>عرض كل الأدلة ←</Link></div>}
      </div>
    </section>
    <section className={styles.trustStrip}><div className="ar-container"><span className={styles.trustIcon} aria-hidden="true">↗</span><div><h2>وضوح المعلومة جزء من وضوح القرار.</h2><p>مصادر رسمية ظاهرة، وهوية للناشر، وتاريخ نشر وتحديث لكل دليل.</p></div><Link href="/ar/سياسة-التحرير/">كيف نعدّ المحتوى؟ <span aria-hidden="true">←</span></Link></div></section>
  </>;
}
