// In: app/blog/[id]/page.jsx

import blogData from '@/components/data/blog-data';
import { notFound } from 'next/navigation';
import BlogDetailsClient from './blog-details-client';

// Helper function to get image URL safely
const getImageUrl = (img) => {
    if (!img) return '/assets/img/logo-1.png'; // Fallback image
    // If it's an imported object (Next.js), use .src, otherwise use the string directly
    const src = typeof img === 'object' ? img.src : img;
    return `https://businesssetupuae.ae${src.startsWith('/') ? '' : '/'}${src}`;
};

export async function generateMetadata({ params }) {
  const post = blogData.find((blog) => blog.id === params.id);
  if (!post) { notFound(); }

  const imageUrl = getImageUrl(post.image);

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `/blog/${post.id}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `https://businesssetupuae.ae/blog/${post.id}`,
      siteName: 'Business Setup UAE',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author],
    },
  };
}

const Page = ({ params }) => {
  const singleData = blogData.find((blog) => blog.id === params.id);
  
  // هذا التوجيه لصفحة 404 يحدث في السيرفر، لذا لا داعي لتكراره في العميل
  if (!singleData) { notFound(); }

  const imageUrl = getImageUrl(singleData.image);
  const siteDomain = "https://businesssetupuae.ae";

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${siteDomain}/blog/${singleData.id}`
    },
    "headline": singleData.title,
    "description": singleData.summary,
    "image": imageUrl,
    "author": {
        "@type": "Person",
        "name": singleData.author
    },
    "publisher": {
        "@type": "Organization",
        "name": "Business Setup UAE",
        "logo": {
            "@type": "ImageObject",
            "url": `${siteDomain}/assets/img/logo-1.png`
        }
    },
    "datePublished": singleData.datePublished,
    "dateModified": singleData.dateModified,
    // معالجة التعليقات بأمان (في حال لم تكن موجودة)
    "commentCount": singleData.comments ? singleData.comments.length : 0,
    "comment": singleData.comments ? singleData.comments.map(comment => ({
        "@type": "Comment",
        "author": {
            "@type": "Person",
            "name": comment.author
        },
        "datePublished": comment.date,
        "text": comment.text
    })) : []
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <BlogDetailsClient singleData={singleData} />
    </>
  );
};

export default Page;