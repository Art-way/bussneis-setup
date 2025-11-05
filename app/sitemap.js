// In: app/sitemap.js

import blogData from '@/components/data/blog-data';
import allServicesData from '@/components/data/services-data';
import { getAllServiceSlugs } from '@/components/data/service-slugs.js';
// --- 1. استيراد بيانات الفريق ---
import teamData from '@/components/data/team-data';

export default function sitemap() {
  const baseUrl = 'https://businesssetupuae.ae';

  const specialServiceSlugs = getAllServiceSlugs().map(item => item.source.replace('/', ''));

  // الصفحات الثابتة
  const staticPages = [
    '/',
    '/about-us',
    '/contact',
    '/faq',
    '/services',
    '/testimonial',
    '/blog',
    '/team', // --- 2. إضافة صفحة الفريق الرئيسية ---
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  // صفحات المدونة الديناميكية
  const blogPages = blogData.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.dateModified).toISOString(),
  }));

  // بناء روابط الخدمات بذكاء
  const servicePages = allServicesData.map((service) => {
    let serviceUrl;
    if (specialServiceSlugs.includes(service.slug)) {
      serviceUrl = `${baseUrl}/${service.slug}`;
    } else {
      serviceUrl = `${baseUrl}/services/${service.slug}`;
    }
    return {
      url: serviceUrl,
      lastModified: new Date().toISOString(),
    };
  });
  
  // --- 3. بناء روابط صفحات أعضاء الفريق ---
  const teamPages = teamData.map((member) => ({
    url: `${baseUrl}/team/${member.id}`,
    lastModified: new Date().toISOString(), // استخدام التاريخ الحالي
  }));

  // دمج جميع الصفحات في خريطة واحدة
  return [...staticPages, ...servicePages, ...blogPages, ...teamPages];
}