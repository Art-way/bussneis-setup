import NextLink from '@/components/arabic/link';
import { getCategory, getAuthor, formatDate, formatReadingTime } from '../content';
import EditorialCover from './cover';
import { categoryPath, postPath, dubaiServicePath } from '../routes.mjs';
import { articleTopics } from '../market-segments';

export default function ArticleCard({ post, LinkComponent = NextLink }) {
  const Link = LinkComponent;
  const category = getCategory(post.categorySlug);
  const author = getAuthor(post.authorSlug);
  return <article className="ar-article-card">
    <Link prefetch={false} className="ar-article-card-image" href={postPath(post)} aria-hidden="true" tabIndex={-1}>{post.image ? <img src={post.image.src} srcSet={post.image.srcSet} sizes="(max-width: 640px) 90vw, (max-width: 1050px) 45vw, 380px" width={post.image.width} height={post.image.height} alt={post.image.alt} loading="lazy" decoding="async" /> : <EditorialCover category={post.categorySlug} />}</Link>
    <div className="ar-article-card-body">
      <div className="ar-article-card-meta"><Link prefetch={false} href={post.emirateSlug === 'dubai' ? dubaiServicePath : categoryPath(category.urlSlug)}>{post.emirateSlug === 'dubai' ? `دبي · ${articleTopics[post.topicSlugs[0]]}` : category.title}</Link><span>{formatReadingTime(post.readingMinutes)}</span></div>
      <h3><Link prefetch={false} href={postPath(post)}>{post.title}</Link></h3>
      <p>{post.excerpt}</p>
      <div className="ar-article-card-footer"><Link prefetch={false} href={`/ar/authors/${author.urlSlug}/`}><span className="ar-article-mini-avatar">B<span>U</span></span><span>فريق التحرير</span></Link>{post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}</div>
    </div>
  </article>;
}

export { ArticleCard };
