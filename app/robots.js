// In: app/robots.js

export default function robots() {
  const siteUrl = 'https://businesssetupuae.ae';

  return {
    rules: {
      // قاعدة واحدة تسمح لجميع عناكب البحث (بما في ذلك عناكب الذكاء الاصطناعي)
      userAgent: '*',
      allow: '/',
      // يمكنك إضافة أي مجلدات لا تريد أرشفتها هنا مستقبلاً
      // disallow: '/admin/', 
    },
    // تحديد مكان خريطة الموقع لمساعدة محركات البحث
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}