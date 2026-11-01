import { notFound } from 'next/navigation';
import { categories, getCategory } from '@/components/arabic/content';
import BlogListing from '@/components/arabic/blog/blog-listing';
import { editorialMetadata } from '@/components/arabic/blog/seo';

export const dynamicParams = false;
export const generateStaticParams = () => categories.map(category => ({ slug: category.slug }));
export async function generateMetadata({ params: paramsPromise, searchParams: searchParamsPromise }) {
  const [params, searchParams] = await Promise.all([paramsPromise, searchParamsPromise]);
  const category = getCategory(params.slug);
  if (!category) return {};
  return editorialMetadata(`${category.title} في الإمارات`, category.description, `/ar/blog/category/${category.slug}/`, searchParams?.q ? { robots: { index: false, follow: true } } : {});
}
export default async function CategoryPage({ params: paramsPromise, searchParams: searchParamsPromise }) {
  const [params, searchParams] = await Promise.all([paramsPromise, searchParamsPromise]);
  if (!getCategory(params.slug)) notFound();
  const query = typeof searchParams?.q === 'string' ? searchParams.q.slice(0, 120) : '';
  return <BlogListing categorySlug={params.slug} query={query} />;
}
