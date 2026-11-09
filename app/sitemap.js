// app/sitemap.js

import blogData from '@/components/data/blog-data';
import allServicesData from '@/components/data/services-data'; // تأكد أن هذا الملف يحتوي على مصفوفة الخدمات
import teamData from '@/components/data/team-data';
import { categoryPath, arabicLegalPaths, postPath, servicePath, dubaiServicePath, costRequestPath } from '@/components/arabic/routes.mjs';
import { regionalProfiles } from '@/components/arabic/regional-services.mjs';
import { categories, posts, authors } from '@/components/arabic/content';
import { services as arabicServices } from '@/components/arabic/services';

export default function sitemap() {
  const baseUrl = 'https://businesssetupuae.ae';

  
  const staticRoutes = [
    '', 
    '/about-us',
    '/contact',
    '/faq',
    '/services', 
    '/testimonial',
    '/blog', 
    '/team',
    '/privacy-policy',
    '/terms-and-conditions',
    '/pricing-plans',
  ];

  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}/`, 
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));


  const servicePages = allServicesData.map((service) => ({
    url: `${baseUrl}/services/${service.slug}/`, // توحيد المسار + إضافة السلاش
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));


  const blogPages = blogData.map((post) => ({
    
    url: `${baseUrl}/blog/${post.id}/`, 
    lastModified: post.dateModified ? new Date(post.dateModified).toISOString() : new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  
  const teamPages = teamData.map((member) => ({
    url: `${baseUrl}/team/${member.id}/`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));


  const arabicStaticRoutes = [
    '/ar',
    '/ar/الخدمات',
    dubaiServicePath.replace(/\/$/, ''),
    costRequestPath.replace(/\/$/, ''),
    ...regionalProfiles.map(profile => profile.path.replace(/\/$/, '')),
    '/ar/تواصل-معنا',
    '/ar/المدونة',
    '/ar/authors',
    '/ar/سياسة-التحرير',
    ...Object.values(arabicLegalPaths).map(path => path.slice(0, -1)),
  ];

  const arabicStaticPages = arabicStaticRoutes.map((route) => ({
    url: `${baseUrl}${route}/`,
    changeFrequency: 'monthly',
    priority: route === '/ar' ? 1 : 0.8,
  }));

  const arabicServicePages = arabicServices.map((service) => ({
    url: `${baseUrl}${servicePath(service)}`,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const arabicCategoryPages = categories.map((category) => ({
    url: `${baseUrl}${categoryPath(category.urlSlug)}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const arabicBlogPages = posts.map((post) => ({
    url: `${baseUrl}${postPath(post)}`,
    ...(post.updatedAt || post.publishedAt
      ? { lastModified: post.updatedAt || post.publishedAt }
      : {}),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const arabicAuthorPages = authors.map((author) => ({
    url: `${baseUrl}/ar/authors/${author.urlSlug}/`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const arabicPages = [
    ...arabicStaticPages,
    ...arabicServicePages,
    ...arabicCategoryPages,
    ...arabicBlogPages,
    ...arabicAuthorPages,
  ].map(page => ({ ...page, url: new URL(page.url).href }));

  return [
    ...staticPages,
    ...servicePages,
    ...blogPages,
    ...teamPages,
    ...arabicPages,
  ];
}
