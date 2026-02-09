// app/sitemap.js

import blogData from '@/components/data/blog-data';
import allServicesData from '@/components/data/services-data'; // تأكد أن هذا الملف يحتوي على مصفوفة الخدمات
import teamData from '@/components/data/team-data';

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


  return [...staticPages, ...servicePages, ...blogPages, ...teamPages];
}