import { NextResponse } from 'next/server';
import { arabicSectionPaths, canonicalArabicPaths, legacyArabicRedirects } from './components/arabic/routes.mjs';
import { arabicNotFoundDocument } from './components/arabic/not-found-document';

// Keep a complete branded 404 across the independent language root layouts.
function arabicNotFound() {
  return new NextResponse(arabicNotFoundDocument, {
    status: 404,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, follow',
      'Cache-Control': 'no-store',
    },
  });
}

export function proxy(request) {
  let decodedPath;
  try {
    // decodeURI keeps reserved encoded separators such as %2F intact.
    decodedPath = decodeURI(request.nextUrl.pathname).replace(/\/+$/, '');
  } catch {
    return arabicNotFound();
  }
  const pathname = decodedPath.normalize('NFC');
  const replacement = legacyArabicRedirects.get(pathname);
  if (replacement || canonicalArabicPaths.has(pathname)) {
    const destination = request.nextUrl.clone();
    const targetPath = replacement || `${pathname}/`;
    destination.pathname = targetPath;
    const isListing = targetPath === arabicSectionPaths.blog || targetPath.startsWith('/ar/category/');
    // Listing controls have no effect on articles or services. Remove them
    // during the same redirect as an old path, while retaining tracking data.
    if (!isListing) {
      for (const parameter of ['q', 'emirate', 'topic']) {
        if (destination.searchParams.has(parameter)) destination.searchParams.delete(parameter);
      }
    }
    if (replacement || decodedPath !== pathname || destination.search !== request.nextUrl.search) {
      return NextResponse.redirect(destination, 308);
    }
  }
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
  if (canonicalArabicPaths.has(pathname)) {
    return NextResponse.next({ request: { headers } });
  }

  return arabicNotFound();
}

export const config = { matcher: ['/ar/:path*'] };
