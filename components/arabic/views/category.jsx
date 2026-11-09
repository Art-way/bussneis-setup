import { categoryPath } from '@/components/arabic/routes.mjs';
import { notFound } from 'next/navigation';
import { getCategory } from '@/components/arabic/content';
import BlogListing from '@/components/arabic/blog/blog-listing';
import { editorialMetadata } from '@/components/arabic/blog/seo';

export async function generateMetadata({ params: paramsPromise, searchParams: searchParamsPromise }) {
  const [params, searchParams] = await Promise.all([paramsPromise, searchParamsPromise]);
  const category = getCategory(params.slug);
  if (!category) return {};
  return editorialMetadata(`${category.title} في الإمارات`, category.description, categoryPath(category.urlSlug), (searchParams?.q || searchParams?.emirate || searchParams?.topic) ? { robots: { index: false, follow: true } } : {});
}
export default async function CategoryPage({ params: paramsPromise, searchParams: searchParamsPromise }) {
  const [params, searchParams] = await Promise.all([paramsPromise, searchParamsPromise]);
  if (!getCategory(params.slug)) notFound();
  const query = typeof searchParams?.q === 'string' ? searchParams.q.slice(0, 120) : '';
  return <BlogListing categorySlug={params.slug} query={query} emirateSlug={typeof searchParams?.emirate === 'string' ? searchParams.emirate : ''} topicSlug={typeof searchParams?.topic === 'string' ? searchParams.topic : ''} />;
}
