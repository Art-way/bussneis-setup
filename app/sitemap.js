// app/sitemap.js

import blogData from '@/components/data/blog-data';
import allServicesData from '@/components/data/services-data'; // تأكد أن هذا الملف يحتوي على مصفوفة الخدمات
import teamData from '@/components/data/team-data';
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
    '/ar/services',
    '/ar/contact',
    '/ar/blog',
    '/ar/authors',
    '/ar/editorial-policy',
  ];

  const arabicStaticPages = arabicStaticRoutes.map((route) => ({
    url: `${baseUrl}${route}/`,
    changeFrequency: 'monthly',
    priority: route === '/ar' ? 1 : 0.8,
  }));

  const arabicServicePages = arabicServices.map((service) => ({
    url: `${baseUrl}/ar/services/${service.slug}/`,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const arabicCategoryPages = categories.map((category) => ({
    url: `${baseUrl}/ar/blog/category/${category.slug}/`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const arabicBlogPages = posts.map((post) => ({
    url: `${baseUrl}/ar/blog/${post.slug}/`,
    ...(post.updatedAt || post.publishedAt
      ? { lastModified: post.updatedAt || post.publishedAt }
      : {}),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const arabicAuthorPages = authors.map((author) => ({
    url: `${baseUrl}/ar/authors/${author.slug}/`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...blogPages,
    ...teamPages,
    ...arabicStaticPages,
    ...arabicServicePages,
    ...arabicCategoryPages,
    ...arabicBlogPages,
    ...arabicAuthorPages,
  ];
}
