// Import only article bodies from the inspected Word block export. No Word
// administrative notes, competitor analysis or publication cards enter a body.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const [exportDir, metadataFile] = process.argv.slice(2);
if (!exportDir || !metadataFile) throw new Error('Usage: node scripts/import-dubai-word.mjs <Word block export directory> <article metadata JSON>');
const blocks = JSON.parse((await fs.readFile(path.join(exportDir, 'document-blocks.json'), 'utf8')).replace(/^\uFEFF/, ''));
const metadata = JSON.parse(await fs.readFile(metadataFile, 'utf8'));
const assetDir = 'public/assets/arabic/dubai';
await fs.mkdir(assetDir, { recursive: true });
const imageRows = blocks.find(block => block.index === 269).rows;
const publicationCardOffsets = [52, 121, 189];
const categorySlugs = ['company-formation', 'costs-planning', 'company-formation'];
const topicSlugs = [['contracts', 'legal-forms'], ['contracting'], ['formation-benefits']];
const imports = [];
const evidence = [];

function inline(block) {
  const result = [];
  let cursor = 0;
  for (const link of block.links) {
    const index = block.text.indexOf(link.text, cursor);
    if (index < 0) throw new Error(`Hyperlink text mismatch at Word block ${block.index}`);
    if (index > cursor) result.push({ text: block.text.slice(cursor, index) });
    const url = new URL(link.url);
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Unsupported Word link');
    result.push({ text: link.text, href: url.hostname === 'businesssetupuae.ae' ? decodeURI(url.pathname) : url.href });
    cursor = index + link.text.length;
  }
  if (cursor < block.text.length) result.push({ text: block.text.slice(cursor) });
  return result;
}

for (const [index, article] of metadata.entries()) {
  const start = blocks.findIndex(block => block.style === 'Heading1' && block.text === article.title);
  if (start < 0) throw new Error(`Word title missing: ${article.title}`);
  const end = blocks.findIndex((block, i) => i > start && block.style === 'Heading1');
  const bodySource = blocks.slice(start + 1, end).filter(block => block.text || block.images.length);
  const card = blocks.slice(publicationCardOffsets[index], start);
  for (const value of [article.meta_title, article.meta_description, article.url]) {
    if (!card.some(block => block.text === value)) throw new Error(`Publication card mismatch: ${value}`);
  }
  const body = [];
  let imageIndex = 0;
  let headingIndex = 0;
  for (const block of bodySource) {
    if (block.style === 'Caption') continue; // Captions belong to their image.
    if (block.images.length) {
      const kind = imageIndex++ ? 'figure' : 'hero';
      const alt = article[`${kind}_alt`];
      if (alt !== imageRows[index * 2 + imageIndex][2]) throw new Error('Word ALT mismatch');
      const stem = `article-${article.id}-${kind}`;
      const imageFile = path.join(exportDir, path.basename(block.images[0]));
      const original = await fs.readFile(imageFile);
      const imageInfo = await sharp(original).metadata();
      const variants = [];
      for (const width of [600, 1200]) {
        const output = `${assetDir}/${stem}-${width}.webp`;
        await sharp(original).resize({ width, withoutEnlargement: true }).webp({ quality: 88, effort: 6 }).toFile(output);
        variants.push({ width, bytes: (await fs.stat(output)).size });
      }
      const image = { src: `/assets/arabic/dubai/${stem}-1200.webp`, srcSet: `/assets/arabic/dubai/${stem}-600.webp 600w, /assets/arabic/dubai/${stem}-1200.webp 1200w`, width: imageInfo.width, height: imageInfo.height, alt, caption: blocks[block.index + 1]?.style === 'Caption' ? blocks[block.index + 1].text : '' };
      body.push({ type: 'image', kind, ...image });
      evidence.push({ article: article.id, originalWordImage: block.images[0], sha256: crypto.createHash('sha256').update(original).digest('hex'), width: imageInfo.width, height: imageInfo.height, variants });
    } else if (block.type === 'tbl') {
      body.push({ type: 'table', headers: block.rows[0], rows: block.rows.slice(1) });
    } else if (/^Heading[23]$/.test(block.style)) {
      body.push({ type: block.style === 'Heading2' ? 'h2' : 'h3', text: block.text, id: `section-${++headingIndex}` });
    } else if (/^\d+\. /.test(block.text)) {
      if (body.at(-1)?.type !== 'ol') body.push({ type: 'ol', items: [] });
      const runs = inline(block);
      runs[0].text = runs[0].text.replace(/^\d+\. /, '');
      body.at(-1).items.push(runs);
    } else {
      body.push({ type: 'p', content: inline(block) });
    }
  }
  if (imageIndex !== 2) throw new Error('Expected two embedded originals per article');
  const firstParagraph = body.find(block => block.type === 'p').content.map(run => run.text).join('');
  const sections = body.filter(block => block.type === 'h2').map(block => ({ id: block.id, title: block.text, paragraphs: [] }));
  const slug = ['dubai-llc-memorandum', 'dubai-contracting-budget', 'dubai-formation-benefits'][index];
  imports.push({ slug, urlSlug: decodeURI(new URL(article.url).pathname.split('/').filter(Boolean).at(-1)), path: decodeURI(new URL(article.url).pathname), title: article.title, metaTitle: article.meta_title, excerpt: article.meta_description, categorySlug: categorySlugs[index], emirateSlug: 'dubai', topicSlugs: topicSlugs[index], intent: article.intent, authorSlug: 'editorial-team', relatedService: '/ar/تأسيس-شركة-في-دبي/', takeaway: firstParagraph, image: body.find(block => block.type === 'image' && block.kind === 'hero'), sections, blocks: body, readingMinutes: Math.ceil(bodySource.map(block => block.text).join(' ').split(/\s+/).length / 180), sources: [] });
}
await fs.writeFile('components/arabic/dubai-articles.json', `${JSON.stringify(imports, null, 2)}\n`);
await fs.writeFile('output/security/dubai-word-import.json', `${JSON.stringify({ articleCount: imports.length, wordBlocks: blocks.length, images: evidence, bodyRanges: imports.map(article => ({ title: article.title, blocks: article.blocks.length, tables: article.blocks.filter(b => b.type === 'table').length, headings: article.sections.length })) }, null, 2)}\n`);
console.log(JSON.stringify({ articles: imports.map(article => ({ path: article.path, blocks: article.blocks.length })), images: evidence.length, totalWebpBytes: evidence.flatMap(item => item.variants).reduce((sum, item) => sum + item.bytes, 0) }, null, 2));
