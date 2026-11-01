import NextLink from 'next/link';
import NativeAnchor from './native-anchor';

// Only the native homepage needs a full document navigation. All other links
// retain Next's normal behavior, including article/service navigation.
export default function ArabicLink({ href, ...props }) {
  const path = typeof href === 'string' ? href.split(/[?#]/, 1)[0] : null;
  if (path === '/ar' || path === '/ar/') return <NativeAnchor href={href} {...props} />;
  return <NextLink href={href} {...props} />;
}
