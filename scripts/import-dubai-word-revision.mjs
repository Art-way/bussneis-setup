// Read the semantic H1/H2/H3 publishing markers and native list definitions in
// the supplied revision. No Word HTML is executed or published.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import { canonicalArabicPaths } from '../components/arabic/routes.mjs';

const exportDirectory = process.argv[2];
if (!exportDirectory) throw new Error('Usage: node scripts/import-dubai-word-revision.mjs <Word export directory>');
const source = JSON.parse((await fs.readFile(path.join(exportDirectory, 'document-blocks.json'), 'utf8')).replace(/^\uFEFF/, ''));
const current = JSON.parse(await fs.readFile('components/arabic/dubai-articles.json', 'utf8'));
const cardStarts = source.filter(block => /^بيانات المقال [123]$/.test(block.text)).map(block => block.index);
const headings = source.filter(block => /^H1:\s*/.test(block.text));
const admin = source.find(block => /^H2:\s*تحليل المنافسين/.test(block.text));
if (cardStarts.length !== 3 || headings.length !== 3 || !admin) throw new Error('Expected three publishing cards and an administrative appendix');
const assets = 'public/assets/arabic/dubai';
const report = { sourceFormat: 'Word semantic markers, rich runs and native numbering', articles: [], images: [], inactiveLinks: [], editorialAdjustments: [] };
const imports = [];

// The user explicitly requested an intake form with no displayed price.
// Update only passages that otherwise promise a calculated price/result.
const approvedAdjustments = new Map([
  [119, 'استخدم البنود التالية عند جمع العروض. المقصود تصنيف المصروفات حتى تعرف مصدر كل مبلغ، وليس تقديم تعرفة حكومية ثابتة أو سعر سوق موحد لجميع الشركات.'],
  [138, 'ابدأ من حاسبة تكلفة تأسيس شركة على موقعنا لاختيار الخدمة وموقع التأسيس وكتابة تفاصيل مشروعك، ثم أرسل بيانات التواصل للفريق. لا يعرض النموذج سعرًا تلقائيًا؛ اطلب مراجعة البنود والمشمول والمستثنى والمتطلبات الخاصة بحالتك قبل اعتماد الميزانية.'],
  [177, 'استخدم حاسبة تكلفة تأسيس شركة لتجهيز طلب مراجعة التكلفة. اختر الخدمة والإمارة، وأضف وصف نشاط المقاولات والشركاء والمقر وطريقة التشغيل في خانة التفاصيل، ثم أرسل الطلب مع بيانات التواصل. لا تظهر نتيجة سعرية داخل الصفحة.'],
  [178, 'اذكر المعدات والكوادر الفنية وسيولة المشروع ضمن تفاصيل طلبك عند الحاجة. عند وصول عرض مفصل، راجع ما يشمله وما يستثنيه، ثم أضف متطلبات التشغيل غير المشمولة في قائمة مستقلة؛ حتى لا تحسب البند نفسه مرتين.'],
  [256, 'ابدأ من حاسبة تكلفة تأسيس شركة على موقعنا لإرسال احتياجاتك إلى الفريق وطلب مراجعة تكلفة تناسب حالتك، دون عرض سعر تلقائي. بعد الحصول على عرض مفصل، أضف مصروفات التشغيل الخاصة بمشروعك وقارن قيمة الوجود في دبي بإجمالي الالتزامات المتوقعة.'],
]);

function inline(block) {
  const adjusted = approvedAdjustments.get(block.index);
  if (adjusted) {
    if (![119, 178].includes(block.index) && !block.runs.some(run => run.url?.includes('/حاسبة-تكلفة-تأسيس-شركة/'))) throw new Error('Calculator paragraph changed; re-review the approved adjustment');
    report.editorialAdjustments.push({ sourceIndex: block.index, sourceText: block.text, publishedText: adjusted, reason: block.index === 119 ? 'The new document has paragraphs instead of a table' : 'User requested a no-price intake form rather than numeric estimates' });
    const anchor = 'حاسبة تكلفة تأسيس شركة';
    const at = adjusted.indexOf(anchor);
    return at >= 0 ? [{ text: adjusted.slice(0, at) }, { text: anchor, href: '/ar/حاسبة-تكلفة-تأسيس-شركة/' }, { text: adjusted.slice(at + anchor.length) }] : [{ text: adjusted }];
  }
  const runs = [];
  for (const run of block.runs) {
    const item = { text: run.text };
    if (run.bold) item.bold = true;
    if (run.italic) item.italic = true;
    if (run.url) {
      const url = new URL(run.url);
      if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Unsupported hyperlink protocol');
      if (url.hostname === 'businesssetupuae.ae') {
        const local = decodeURI(url.pathname).normalize('NFC');
        if (canonicalArabicPaths.has(local.replace(/\/+$/, ''))) item.href = `${local}${url.search}${url.hash}`;
        else {
          item.pendingHref = `${local}${url.search}${url.hash}`;
          report.inactiveLinks.push({ sourceIndex: block.index, text: run.text, path: item.pendingHref });
        }
      } else item.href = url.href;
    }
    const previous = runs.at(-1);
    if (previous && previous.href === item.href && previous.pendingHref === item.pendingHref && previous.bold === item.bold && previous.italic === item.italic) previous.text += item.text;
    else runs.push(item);
  }
  if (runs.map(run => run.text).join('') !== block.text) throw new Error('Rich text extraction mismatch');
  return runs;
}

for (let index = 0; index < 3; index++) {
  const h1 = headings[index];
  const card = source.slice(cardStarts[index], h1.index);
  const field = prefix => {
    const block = card.find(block => block.text.startsWith(prefix));
    if (!block) throw new Error(`Missing publication field: ${prefix}`);
    return block.text.slice(prefix.length).trim();
  };
  const title = h1.text.replace(/^H1:\s*/, '');
  const metaTitle = field('عنوان نتائج البحث:');
  const excerpt = field('وصف نتائج البحث:');
  const suppliedAuthor = field('اسم الكاتب والناشر:');
  const url = card.find(block => /^https:\/\/businesssetupuae\.ae\/ar\//.test(block.text))?.text;
  if (!url) throw new Error('Missing canonical URL');
  const articlePath = decodeURI(new URL(url).pathname);
  const previous = current.find(post => post.path === articlePath);
  if (!previous) throw new Error(`A route change needs explicit migration: ${articlePath}`);
  const bodyEnd = index < 2 ? cardStarts[index + 1] : admin.index;
  const bodySource = source.slice(h1.index + 1, bodyEnd).filter(block => block.text.trim() || block.images.length);
  const body = [];
  let imageIndex = 0;
  let headingIndex = 0;
  for (const block of bodySource) {
    if (/^النص البديل للصورة:/.test(block.text)) continue;
    if (block.type !== 'p') throw new Error('Unexpected table in the simplified revision');
    if (block.images.length) {
      if (block.images.length !== 1 || imageIndex >= 2) throw new Error('Unexpected image count');
      const picture = block.images[0];
      const kind = imageIndex++ === 0 ? 'hero' : 'figure';
      const original = await fs.readFile(path.join(exportDirectory, path.basename(picture.path)));
      const info = await sharp(original).metadata();
      if (info.width !== 1200 || info.height !== 1200) throw new Error('Expected 1200x1200 original square image');
      const altInstruction = source[block.index + 1]?.text.match(/^النص البديل للصورة:\s*(.*)$/)?.[1];
      if (!picture.alt || picture.alt !== altInstruction) throw new Error('Embedded image ALT differs from the Word publishing instruction');
      const stem = `article-${index + 1}-${kind}-square`;
      const variants = [];
      for (const width of [600, 1200]) {
        const output = `${assets}/${stem}-${width}.webp`;
        await sharp(original).resize({ width, withoutEnlargement: true }).webp({ quality: 88, effort: 6 }).toFile(output);
        variants.push({ width, bytes: (await fs.stat(output)).size });
      }
      body.push({ type: 'image', kind, src: `/assets/arabic/dubai/${stem}-1200.webp`, srcSet: `/assets/arabic/dubai/${stem}-600.webp 600w, /assets/arabic/dubai/${stem}-1200.webp 1200w`, width: 1200, height: 1200, alt: picture.alt, caption: '' });
      report.images.push({ article: previous.slug, kind, sourceImage: picture.path, sourceSha256: crypto.createHash('sha256').update(original).digest('hex'), variants });
    } else if (/^H[23]:/.test(block.text)) {
      const [, level, text] = block.text.match(/^H([23]):\s*(.*)$/);
      if (!block.runs.every(run => !run.text.trim() || run.bold)) throw new Error('Word heading expected to be bold');
      body.push({ type: `h${level}`, text, id: `section-${++headingIndex}` });
    } else if (block.numId) {
      if (block.level !== '0' || block.numberFormat !== 'decimal') throw new Error('Unsupported native list definition');
      if (body.at(-1)?.type !== 'ol' || body.at(-1).sourceListId !== block.numId) body.push({ type: 'ol', sourceListId: block.numId, start: block.numberStart, items: [] });
      body.at(-1).items.push(inline(block));
    } else body.push({ type: 'p', content: inline(block) });
  }
  if (imageIndex !== 2 || body[0]?.type !== 'p') throw new Error('Article must have an opening answer and two images');
  const sections = body.filter(block => block.type === 'h2').map(block => ({ id: block.id, title: block.text, paragraphs: [] }));
  const takeaway = body[0].content.map(run => run.text).join('');
  const wordCount = [title, ...body.flatMap(block => block.text || block.content?.map(run => run.text) || block.items?.flatMap(item => item.map(run => run.text)) || [])].join(' ').split(/\s+/).filter(Boolean).length;
  imports.push({ ...previous, title, metaTitle, excerpt, takeaway, image: body.find(block => block.type === 'image' && block.kind === 'hero'), sections, blocks: body, readingMinutes: Math.ceil(wordCount / 180) });
  report.articles.push({ path: articlePath, suppliedAuthor, sourceStart: h1.index, sourceEnd: bodyEnd, wordCount, headings: body.filter(block => /^h[23]$/.test(block.type)).length, listItems: body.filter(block => block.type === 'ol').reduce((sum, block) => sum + block.items.length, 0), internalLinks: body.flatMap(block => block.content || block.items?.flat() || []).filter(run => run.href?.startsWith('/ar/')).length });
}
await fs.writeFile('components/arabic/dubai-articles.json', `${JSON.stringify(imports, null, 2)}\n`);
await fs.writeFile('output/security/dubai-word-revision-import.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ articles: report.articles, illustrations: report.images.length, totalWebpBytes: report.images.flatMap(image => image.variants).reduce((sum, variant) => sum + variant.bytes, 0), inactiveLinks: report.inactiveLinks }, null, 2));
