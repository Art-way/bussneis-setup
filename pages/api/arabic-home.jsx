import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import NativeHomeDocument from '@/components/arabic/native-home-document';

// A supported Pages API server bundle, not App Router output post-processing.
// Read immutable authored resources once; explicit tracing includes these files.
const baseCss = readFileSync(join(process.cwd(), 'app', 'ar', 'arabic.css'), 'utf8');
const cardsCss = readFileSync(join(process.cwd(), 'components', 'arabic', 'blog', 'cards.css'), 'utf8');
const css = `@layer arabic-base{\n${baseCss}\n${cardsCss}\n}`;
const cssHref = `arabic-base-${createHash('sha256').update(css).digest('hex').slice(0, 16)}`;
const scriptSource = readFileSync(join(process.cwd(), 'public', 'assets', 'arabic', 'native-home.js'), 'utf8');
const scriptVersion = createHash('sha256').update(scriptSource).digest('hex').slice(0, 16);
const html = `<!DOCTYPE html>${renderToStaticMarkup(<NativeHomeDocument css={css} cssHref={cssHref} scriptUrl={`/assets/arabic/native-home.js?v=${scriptVersion}`} indexable />)}`;
const htmlBytes = Buffer.byteLength(html);

export const config = { api: { bodyParser: false } };

export default function arabicHome(request, response) {
  // Proxy removes incoming marker values and sets this only for /ar/. There is
  // no private data here; direct API access must not create an indexed duplicate.
  if (request.headers['x-arabic-home-renderer'] !== 'homepage') {
    response.setHeader('X-Robots-Tag', 'noindex, follow');
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('Content-Type', 'text/plain; charset=utf-8');
    response.status(404).end('Not Found');
    return;
  }
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.setHeader('X-Robots-Tag', 'noindex, follow');
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('Allow', 'GET, HEAD');
    response.setHeader('Content-Type', 'text/plain; charset=utf-8');
    response.status(405).end('Method Not Allowed');
    return;
  }
  response.setHeader('X-Robots-Tag', 'index, follow');
  response.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');
  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  response.setHeader('Content-Length', htmlBytes);
  response.status(200).end(request.method === 'HEAD' ? undefined : html);
}
