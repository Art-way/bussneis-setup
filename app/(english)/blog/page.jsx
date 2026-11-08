// In: app/blog/page.jsx

import BlogGrid from "@/components/pages/blogs/blog";
import blogData from '@/components/data/blog-data';

// 1. الميتا تاج القياسية (SEO Metadata)
export const metadata = {
    title: "Blog & Insights | Business Setup in Dubai & UAE",
    description: "Read the latest articles and insights on UAE business laws, company formation, market trends, and practical advice for entrepreneurs from the experts at BSetup UAE.",
    alternates: {
      canonical: "/blog",
    },
};

const Blog = () => {
    // 2. بناء السكيما داخل المكون (Server Component)
    const siteDomain = "https://businesssetupuae.ae";
    
    const blogListingSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "BSetup UAE Blog",
        "description": "Insights on UAE business laws, company formation, and market trends.",
        "url": `${siteDomain}/blog`,
        "publisher": {
            "@type": "Organization",
            "name": "BSetup UAE",
            "logo": {
                "@type": "ImageObject",
                "url": `${siteDomain}/assets/brand/bsetup-uae-og.png`
            }
        },
        // نأخذ أول 10 مقالات فقط لتقليل حجم الصفحة
        "blogPost": blogData.slice(0, 10).map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "url": `${siteDomain}/blog/${post.id}`,
            // التحقق مما إذا كانت الصورة كائناً (Next.js import) أو نصاً
            "image": typeof post.image === 'object' 
                ? `${siteDomain}${post.image.src}` 
                : `${siteDomain}${post.image}`,
            "datePublished": post.datePublished,
            "dateModified": post.dateModified,
            "author": {
                "@type": "Person",
                "name": post.author
            }
        }))
    };

    return (
        <>
            {/* حقن السكيما هنا */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListingSchema) }}
            />
            <BlogGrid />
        </>
    );
};

export default Blog;