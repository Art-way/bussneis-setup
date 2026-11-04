import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import sharp from 'sharp';

const directory = process.argv[2];
if (!directory) throw new Error('Usage: node scripts/verify-dubai-word-revision.mjs <Word export directory>');
const word = JSON.parse((await fs.readFile(`${directory}/document-blocks.json`, 'utf8')).replace(/^\uFEFF/, ''));
const imported = JSON.parse(await fs.readFile('components/arabic/dubai-articles.json', 'utf8'));
const provenance = JSON.parse(await fs.readFile('output/security/dubai-word-revision-import.json', 'utf8'));
const changes = new Map(provenance.editorialAdjustments.map(change => [change.sourceIndex, change.publishedText]));
const checks = [];
const check = (name, pass, detail) => checks.push({ name, pass: !!pass, detail });
for (let i = 0; i < imported.length; i++) {
  const post = imported[i];
  const range = provenance.articles[i];
  const source = word.slice(range.sourceStart + 1, range.sourceEnd).filter(block => block.text.trim() && !/^النص البديل للصورة:/.test(block.text));
  const expected = source.map(block => changes.get(block.index) || block.text.replace(/^H[23]:\s*/, ''));
  const actual = post.blocks.flatMap(block => block.type === 'image' ? [] : block.text ? [block.text] : block.type === 'ol' ? block.items.map(item => item.map(run => run.text).join('')) : [block.content.map(run => run.text).join('')]);
  check(`${post.slug} complete source order and exact text except five disclosed adjustments`, JSON.stringify(expected) === JSON.stringify(actual), { source: expected.length, actual: actual.length });
  check(`${post.slug} native list item content and order`, JSON.stringify(source.filter(block => block.numId).map(block => block.text)) === JSON.stringify(post.blocks.filter(block => block.type === 'ol').flatMap(block => block.items.map(item => item.map(run => run.text).join('')))));
  check(`${post.slug} all source headings retain their semantic levels`, source.filter(block => /^H[23]:/.test(block.text)).every(block => post.blocks.some(item => item.type === `h${block.text[1]}` && item.text === block.text.replace(/^H[23]:\s*/, ''))));
  const sourceLinks = source.flatMap(block => block.runs.filter(run => run.url).map(run => ({ text: run.text, url: new URL(run.url).href })));
  const links = post.blocks.flatMap(block => block.content || block.items?.flat() || []).filter(run => run.href).map(run => ({ text: run.text, url: new URL(run.href, 'https://businesssetupuae.ae').href }));
  check(`${post.slug} all Word body links preserved`, JSON.stringify(sourceLinks) === JSON.stringify(links), { count: links.length });
  check(`${post.slug} no tables, labels or pending links`, post.blocks.every(block => block.type !== 'table') && !post.blocks.some(block => /^H[123]:/.test(block.text || '') || block.content?.some(run => run.pendingHref)));
  for (const image of post.blocks.filter(block => block.type === 'image')) {
    const metadata = await sharp(`public${image.src}`).metadata();
    check(`${post.slug} ${image.kind} square original geometry and valid WebP`, metadata.format === 'webp' && metadata.width === 1200 && metadata.height === 1200 && image.width === 1200 && image.height === 1200);
  }
}
check('Exactly five context edits for no-price form and removed table wording', provenance.editorialAdjustments.length === 5);
check('Six new images and all source internal destinations active', provenance.images.length === 6 && provenance.inactiveLinks.length === 0);
await fs.writeFile('output/security/word-revision-source-verification.json', JSON.stringify({ checks }, null, 2));
console.log(JSON.stringify({ checks: checks.length, failures: checks.filter(check => !check.pass) }, null, 2));
assert.equal(checks.filter(check => !check.pass).length, 0);
