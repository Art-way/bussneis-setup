import { NextResponse } from 'next/server';
import { authors, categories, posts } from './components/arabic/content';
import { services } from './components/arabic/services';
import { arabicNotFoundDocument } from './components/arabic/not-found-document';

// Next.js 14.1 loses the root layout when a multi-root page throws notFound().
// Return a complete static error document with HTTP 404 for missing Arabic routes.
// This list is derived from the same records used to render pages and the sitemap.
const arabicRoutes = new Set([
  '/ar',
  '/ar/services',
  '/ar/contact',
  '/ar/blog',
  '/ar/authors',
  '/ar/editorial-policy',
  ...services.map(({ slug }) => `/ar/services/${slug}`),
  ...posts.map(({ slug }) => `/ar/blog/${slug}`),
  ...categories.map(({ slug }) => `/ar/blog/category/${slug}`),
  ...authors.map(({ slug }) => `/ar/authors/${slug}`),
]);

export function proxy(request) {
  const pathname = request.nextUrl.pathname.replace(/\/+$/, '');
  const headers = new Headers(request.headers);
  // This marker identifies our homepage rewrite; it is not an authentication
  // mechanism. Strip caller-supplied values on public Arabic requests.
  headers.delete('x-arabic-home-renderer');
  if (pathname === '/ar') {
    const destination = request.nextUrl.clone();
    destination.pathname = '/api/arabic-home/';
    headers.set('x-arabic-home-renderer', 'homepage');
    return NextResponse.rewrite(destination, { request: { headers } });
  }
  if (arabicRoutes.has(pathname)) {
    return NextResponse.next({ request: { headers } });
  }

  return new NextResponse(arabicNotFoundDocument, {
    status: 404,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, follow',
      'Cache-Control': 'no-store',
    },
  });
}

export const config = { matcher: ['/ar/:path*'] };
