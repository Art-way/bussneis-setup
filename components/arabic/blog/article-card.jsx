import NextLink from '@/components/arabic/link';
import { getCategory, getAuthor, formatDate, formatReadingTime } from '../content';
import EditorialCover from './cover';

export default function ArticleCard({ post, LinkComponent = NextLink }) {
  const Link = LinkComponent;
  const category = getCategory(post.categorySlug);
  const author = getAuthor(post.authorSlug);
  return <article className="ar-article-card">
    <Link prefetch={false} className="ar-article-card-image" href={`/ar/blog/${post.slug}/`} aria-hidden="true" tabIndex={-1}><EditorialCover category={post.categorySlug} /></Link>
    <div className="ar-article-card-body">
      <div className="ar-article-card-meta"><Link prefetch={false} href={`/ar/blog/category/${category.slug}/`}>{category.title}</Link><span>{formatReadingTime(post.readingMinutes)}</span></div>
      <h3><Link prefetch={false} href={`/ar/blog/${post.slug}/`}>{post.title}</Link></h3>
      <p>{post.excerpt}</p>
      <div className="ar-article-card-footer"><Link prefetch={false} href={`/ar/authors/${author.slug}/`}><span className="ar-article-mini-avatar">B<span>U</span></span><span>فريق التحرير</span></Link><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></div>
    </div>
  </article>;
}

export { ArticleCard };
