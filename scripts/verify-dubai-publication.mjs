import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { arabicPostSlugs, canonicalArabicUrl, dubaiGuideSlug, dubaiLicenceFeesPath, dubaiServicePath, costRequestPath, postPath, canonicalArabicPaths } from '../components/arabic/routes.mjs';

const base = process.argv[2] || 'http://127.0.0.1:5047';
const posts = JSON.parse(await fs.readFile('components/arabic/dubai-articles.json', 'utf8'));
const checks = [];
const check = (name, pass, detail) => checks.push({ name, pass: !!pass, ...(detail === undefined ? {} : { detail }) });
const stripScripts = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const guide = posts.find(post => post.urlSlug === dubaiGuideSlug);
const contract = posts.find(post => post.slug === 'dubai-llc-memorandum');
const budget = posts.find(post => post.slug === 'dubai-contracting-budget');
const benefits = posts.find(post => post.slug === 'dubai-formation-benefits');
const licenceFees = posts.find(post => post.path === dubaiLicenceFeesPath);
const costGuide = { slug: 'company-setup-cost-checklist', path: postPath({ urlSlug: arabicPostSlugs['company-setup-cost-checklist'] }) };

const pages = new Map();
for (const path of ['/ar/', dubaiServicePath, costRequestPath, costGuide.path, '/ar/المدونة/', '/ar/الخدمات/', '/ar/المؤلفون/فريق-التحرير/', '/ar/تواصل-معنا/', ...posts.map(postPath)]) {
  const response = await fetch(base + path, { redirect: 'manual' });
  const html = await response.text();
  const visible = stripScripts(html);
  pages.set(path, visible);
  check(`${path} HTTP200, Arabic SSR and one H1`, response.status === 200 && html.includes('<html lang="ar-EG" dir="rtl">') && (visible.match(/<h1\b/g) || []).length === 1);
  check(`${path} self canonical`, html.includes(`rel="canonical" href="${canonicalArabicUrl(path)}"`));
  check(`${path} indexable`, !/<meta name="robots" content="noindex/.test(html));
  check(`${path} fathatan appears on the alif`, !visible.includes('ًا'));
  const invalidLinks = [...visible.matchAll(/<a\b[^>]*href="([^"#]+)"/g)].map(m => decode(m[1])).filter(href => href.startsWith('/ar/')).filter(href => !canonicalArabicPaths.has(decodeURI(new URL(href, base).pathname).replace(/\/+$/, '')));
  check(`${path} internal destinations valid`, !invalidLinks.length, invalidLinks);
  for (const match of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(match[1]); } catch { check(`${path} valid JSONLD`, false); }
  }
}

for (const post of posts) {
  const path = postPath(post);
  const html = pages.get(path);
  const responseHtml = await (await fetch(base + path)).text();
  const schemas = [...responseHtml.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  const article = schemas.find(s => s['@type'] === 'BlogPosting');
  const breadcrumb = schemas.find(s => s['@type'] === 'BreadcrumbList');
  check(`${post.slug} exact SEO title`, decode(html.match(/<title[^>]*>(.*?)<\/title>/s)?.[1] || '') === post.metaTitle);
  check(`${post.slug} exact SEO description`, decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] || '') === post.excerpt);
  check(`${post.slug} article identity`, article?.headline === post.title && article?.mainEntityOfPage === canonicalArabicUrl(path) && article?.author?.['@type'] === 'Organization' && article?.image?.[0] === 'https://businesssetupuae.ae' + post.image.src);
  check(`${post.slug} publication and modification dates`, article?.datePublished === post.publishedAt && article?.dateModified === post.updatedAt && html.includes(`dateTime="${post.publishedAt}"`) && html.includes(`dateTime="${post.updatedAt}"`));
  check(`${post.slug} supplied writer name`, article?.author?.name === 'فريق BSetup UAE');
  check(`${post.slug} Dubai breadcrumb`, breadcrumb?.itemListElement?.length === 3 && breadcrumb.itemListElement[1].item === canonicalArabicUrl(dubaiServicePath) && breadcrumb.itemListElement[2].item === canonicalArabicUrl(path));
  check(`${post.slug} no invented translation`, !/hrefLang="en"/.test(html.split('</head>')[0]));
  check(`${post.slug} no administrative material`, !/بطاقة النشر للمقال|خريطة الربط الداخلي المقترحة|نتائج البحث المقتبس|تحليل المنافسين/.test(html));
  const figureCount = post.blocks.filter(block => block.type === 'image').length;
  check(`${post.slug} expected full-size article illustrations`, (html.match(/<figure\b/g) || []).length === figureCount);
  check(`${post.slug} simplified Word has no table or publishing markers`, !/<table\b/.test(html) && !/>H[123]:|\[H[123]\]|النص البديل للصورة:/.test(html));
  if (post === contract || post === benefits) check(`${post.slug} native numbered list preserved`, /<ol\b[^>]*start="1"/.test(html) && post.blocks.filter(block => block.type === 'ol').reduce((sum, block) => sum + block.items.length, 0) === 5);
  for (const block of post.blocks) {
    if (block.type === 'h2' || block.type === 'h3') check(`${post.slug} ${block.id} heading and anchor`, html.includes(`id="${block.id}"`) && html.includes(block.text));
    if (block.type === 'p') {
      for (const run of block.content) {
        if (run.href) check(`${post.slug} contextual ${run.href}`, decode(html).includes(`href="${run.href}"`));
      }
    }
    if (block.type === 'image') {
      check(`${post.slug} ${block.kind} original ALT and geometry`, html.includes(`alt="${block.alt}"`) && html.includes(`width="${block.width}" height="${block.height}"`));
      for (const image of block.srcSet.split(', ').map(value => value.split(' ')[0])) {
        const response = await fetch(base + image);
        const bytes = new Uint8Array(await response.arrayBuffer());
        check(`${image} WEBP200`, response.status === 200 && response.headers.get('content-type')?.startsWith('image/webp') && String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP');
      }
    }
  }
  const inboundSources = [dubaiServicePath, '/ar/المدونة/', '/ar/المؤلفون/فريق-التحرير/'];
  if (posts.slice(0, 3).includes(post)) inboundSources.push('/ar/');
  for (const source of inboundSources) {
    check(`${post.slug} inbound link from ${source}`, pages.get(source).includes(`href="${path}"`));
  }
  check(`${post.slug} working service request link`, html.includes(`href="${dubaiServicePath}#request"`));
}

for (const [query, expected] of [['emirate=dubai',5], ['emirate=dubai&topic=formation-steps',1], ['emirate=dubai&topic=contracting',1], ['emirate=dubai&topic=contracts',1], ['emirate=dubai&topic=formation-benefits',1], ['emirate=dubai&topic=trade-licences',1]]) {
  const html = await (await fetch(base + '/ar/المدونة/?' + query)).text();
  const cards = (html.match(/class="ar-article-card"/g) || []).length;
  check(`${query} filter content`, cards === expected, cards);
  check(`${query} canonical and noindex`, html.includes(`rel="canonical" href="${canonicalArabicUrl('/ar/المدونة/')}"`) && /<meta name="robots" content="noindex/.test(html));
}

const sitemap = await (await fetch(base + '/sitemap.xml')).text();
for (const path of [dubaiServicePath, costRequestPath, ...posts.map(postPath)]) check(`${path} sitemap exactly once`, sitemap.split(`<loc>${canonicalArabicUrl(path)}</loc>`).length === 2);
const home = pages.get('/ar/');
check('Native homepage retains no Next JS', !home.includes('/_next/static/chunks/')); // Scripts separately verified by browser.
check('Dubai service includes real form entry', pages.get(dubaiServicePath).includes('افتح نموذج طلب الاستشارة') && pages.get(dubaiServicePath).includes('id="request"'));
check('Cost request is a real intake entry without quoted prices', pages.get(costRequestPath).includes('id="cost-request-form"') && pages.get(costRequestPath).includes('id="arabic-request-widget"') && !/\bAED\b|\b\d[\d,]*\s*(درهم|د\.إ)/.test(pages.get(costRequestPath)));
check('Contracting budget preserves first publication', budget.publishedAt === '2026-11-04');
check('Contracting budget keeps the hypothetical example and five comparison questions', pages.get(budget.path).includes('مثال حسابي لتجهيز الميزانية (مثال افتراضي)') && pages.get(budget.path).includes('<ul><li>') && budget.blocks.some(block => block.type === 'ul' && block.items.length === 5));
for (const [source, anchor, target] of [
  [guide, 'مميزات فتح شركة في دبي حسب طبيعة مشروعك', benefits.path],
  [guide, 'نموذج عقد تأسيس شركة ذات مسؤولية محدودة في دبي', contract.path],
  [guide, 'تكلفة تأسيس شركة مقاولات في دبي', budget.path],
  [guide, 'خدمة تأسيس شركة في دبي', dubaiServicePath],
  [budget, 'خطوات تأسيس شركة في دبي', guide.path],
  [budget, 'خدمة تأسيس شركة في دبي', dubaiServicePath],
  [budget, 'نموذج عقد التأسيس', contract.path],
  [budget, 'حاسبة تكلفة تأسيس الشركة على موقعنا', costRequestPath],
  [benefits, 'خطوات فتح شركة في دبي', guide.path],
  [contract, 'دليل تأسيس الشركة في دبي', guide.path],
  [guide, 'أسعار الرخص التجارية في دبي', licenceFees.path],
  [costGuide, 'رسوم إصدار وتجديد الرخصة التجارية', licenceFees.path],
  [licenceFees, 'خطوات تأسيس شركة في دبي', guide.path],
  [licenceFees, 'قراءة عرض تكلفة تأسيس شركة في الإمارات', costGuide.path],
  [licenceFees, 'حاسبة تكلفة تأسيس شركة', costRequestPath],
  [licenceFees, 'خدمة تأسيس شركة في دبي', dubaiServicePath],
]) {
  const body = pages.get(source.path).match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1] || '';
  const anchors = [...body.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
  check(`${source.slug} ${anchor} → ${target}`, anchors.some(([, href, text]) => href === target && decode(text.replace(/<[^>]*>/g, '')) === anchor) && pages.has(target));
}
for (const path of ['/ar/تأسيس-شركة-في-رأس-الخيمة/', '/ar/تأسيس-شركة-مقاولات-في-دبي/', '/ar/تأسيس-شركة-مقاولات-في-أبوظبي/', '/ar/تأسيس-شركة-شحن-في-دبي/', '/ar/تأسيس-شركة-سياحة-في-دبي/', dubaiServicePath + 'المقاولات/', '/ar/مقال-غير-موجود/', '/ar/عقد-التأسيس-دبي/']) {
  const response = await fetch(base + path);
  await response.arrayBuffer();
  check(`${path} no empty generated page`, response.status === 404);
}
await fs.writeFile('output/security/dubai-publication-verification.json', JSON.stringify({ base, at: new Date().toISOString(), checks }, null, 2));
const failed = checks.filter(check => !check.pass);
console.log(JSON.stringify({ checks: checks.length, failed }, null, 2));
assert.equal(failed.length, 0, 'Dubai publication checks failed');
