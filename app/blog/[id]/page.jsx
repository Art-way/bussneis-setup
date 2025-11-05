// In: app/blog/[id]/page.jsx

"use client";

import { useParams, useRouter } from "next/navigation";
import blogData from '@/components/data/blog-data';
import BlogDetails from '@/components/pages/blogs/blog-details';

const BlogDetail = () => {
    const params = useParams();
    const router = useRouter();
    const siteDomain = "https://businesssetupuae.ae"; // هذا هو نطاق موقعك

    const singleData = blogData.find((blog) => blog.id === params.id);

    if (!singleData) {
        if (typeof window !== 'undefined') {
            router.push("/404-error");
        }
        return null;
    }

    // --- بناء سكيما SEO المثالية ---
    const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteDomain}/blog/${singleData.id}`
        },
        "headline": singleData.title,
        "description": singleData.summary,
        "image": `${siteDomain}${singleData.image.src}`, // يجب أن يكون رابط الصورة كاملاً
        "author": {
            "@type": "Person",
            "name": singleData.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "Business Setup UAE",
            "logo": {
                "@type": "ImageObject",
                "url": `${siteDomain}/assets/img/logo-1.png` // رابط شعار موقعك كاملاً
            }
        },
        "datePublished": singleData.datePublished,
        "dateModified": singleData.dateModified,
        // --- إضافة سكيما التعليقات ---
        "commentCount": singleData.comments.length,
        "comment": singleData.comments.map(comment => ({
            "@type": "Comment",
            "author": {
                "@type": "Person",
                "name": comment.author
            },
            "datePublished": comment.date,
            "text": comment.text
        }))
    };

    // تمرير البيانات والسكيما إلى المكون المسؤول عن العرض
    return (
        <BlogDetails singleData={singleData} schema={schema} />
    );
};

export default BlogDetail;