import BlogListing from '@/components/arabic/blog/blog-listing';
import { editorialMetadata } from '@/components/arabic/blog/seo';

export async function generateMetadata({ searchParams: searchParamsPromise }) {
  const searchParams = await searchParamsPromise;
  return editorialMetadata('مجلة الأعمال: دليلك لتأسيس شركة في الإمارات', 'أدلة تمهيدية للمستثمر المصري حول تأسيس الشركات في الإمارات، والمناطق الحرة، والتكاليف وخطوات ما بعد التأسيس.', '/ar/المدونة/', searchParams?.q ? { robots: { index: false, follow: true } } : {});
}

export default async function BlogPage({ searchParams: searchParamsPromise }) {
  const searchParams = await searchParamsPromise;
  const query = typeof searchParams?.q === 'string' ? searchParams.q.slice(0, 120) : '';
  return <BlogListing query={query} />;
}
