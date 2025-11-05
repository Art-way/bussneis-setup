// In: app/sitemap.js (The New, Intelligent Version)

import blogData from '@/components/data/blog-data';
import allServicesData from '@/components/data/services-data';
// --- 1. استيراد قائمة الروابط المختصرة ---
import { getAllServiceSlugs } from '@/components/data/service-slugs.js';

export default function sitemap() {
  const baseUrl = 'https://businesssetupuae.ae';

  // --- 2. الحصول على قائمة الروابط المختصرة (مثل 'mainland-company-setup') ---
  const specialServiceSlugs = getAllServiceSlugs().map(item => item.source.replace('/', ''));

  // الصفحات الثابتة (تبقى كما هي)
  const staticPages = [
    '/',
    '/about-us',
    '/contact',
    '/faq',
    '/services', // الصفحة الرئيسية للخدمات
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  // صفحات المدونة الديناميكية (تبقى كما هي)
  const blogPages = blogData.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.dateModified).toISOString(),
  }));

  // --- 3. بناء روابط الخدمات بذكاء ---
  const servicePages = allServicesData.map((service) => {
    let serviceUrl;

    // التحقق إذا كانت الخدمة لها رابط مختصر
    if (specialServiceSlugs.includes(service.slug)) {
      // إذا كان لها رابط مختصر، استخدمه
      serviceUrl = `${baseUrl}/${service.slug}`;
    } else {
      // إذا لم يكن لها رابط مختصر، استخدم المسار الكامل
      serviceUrl = `${baseUrl}/services/${service.slug}`;
    }

    return {
      url: serviceUrl,
      lastModified: new Date().toISOString(),
    };
  });
  
  // دمج جميع الصفحات في خريطة واحدة
  return [...staticPages, ...servicePages, ...blogPages];
}