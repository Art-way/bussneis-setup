import { notFound } from 'next/navigation';
import { arabicPageRoutes } from '@/components/arabic/routes.mjs';

// Keep public URLs Arabic while using dynamic parameter values. The installed
// Next segment-key encoder rejects non-Latin static filesystem segment names.
// Each existing view remains a Server Component, with its own metadata.
const views = {
  services: () => import('@/components/arabic/views/services'),
  service: () => import('@/components/arabic/views/service'),
  dubai: () => import('@/components/arabic/views/dubai'),
  emirate: () => import('@/components/arabic/views/emirate'),
  'cost-request': () => import('@/components/arabic/views/cost-request'),
  contact: () => import('@/components/arabic/views/contact'),
  blog: () => import('@/components/arabic/views/blog'),
  post: () => import('@/components/arabic/views/post'),
  category: () => import('@/components/arabic/views/category'),
  authors: () => import('@/components/arabic/views/authors'),
  author: () => import('@/components/arabic/views/author'),
  'editorial-policy': () => import('@/components/arabic/views/editorial-policy'),
};

export const dynamicParams = false;
export function generateStaticParams() {
  return arabicPageRoutes.map(route => ({ path: route.path.slice('/ar/'.length).split('/').filter(Boolean) }));
}

async function resolveView(paramsPromise) {
  const { path } = await paramsPromise;
  if (!Array.isArray(path)) notFound();
  const pathname = `/ar/${path.map(segment => decodeURI(segment).normalize('NFC')).join('/')}/`;
  const route = arabicPageRoutes.find(item => item.path === pathname);
  if (!route) notFound();
  return { view: await views[route.view](), params: Promise.resolve({ slug: route.slug }) };
}

export async function generateMetadata({ params, searchParams }) {
  const resolved = await resolveView(params);
  return resolved.view.generateMetadata
    ? resolved.view.generateMetadata({ params: resolved.params, searchParams })
    : resolved.view.metadata;
}

export default async function ArabicPage({ params, searchParams }) {
  const resolved = await resolveView(params);
  const View = resolved.view.default;
  return <View params={resolved.params} searchParams={searchParams} />;
}
