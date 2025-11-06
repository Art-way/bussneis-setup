// In: app/blog/[id]/page.jsx

// This is the Server Component for a single blog post.

import blogData from '@/components/data/blog-data';
import { notFound } from 'next/navigation';
import BlogDetailsClient from './blog-details-client'; // Import the new client component

// --- This function generates dynamic SEO & Metadata on the server ---
export async function generateMetadata({ params }) {
  const post = blogData.find((blog) => blog.id === params.id);
  if (!post) { notFound(); }

  return {
    title: post.title,
    description: post.summary, // Use the summary for the meta description
    alternates: {
      canonical: `/blog/${post.id}`,
    },
    // --- ADDED: Open Graph tags for better social sharing ---
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `https://businesssetupuae.ae/blog/${post.id}`,
      siteName: 'Business Setup UAE',
      images: [
        {
          url: `https://businesssetupuae.ae${post.image.src}`, // Must be an absolute URL
          width: 800,
          height: 600,
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
  // 1. Fetch data on the server
  const singleData = blogData.find((blog) => blog.id === params.id);
  if (!singleData) { notFound(); }

  // 2. --- Build the definitive BlogPosting Schema on the server ---
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
    "image": `${siteDomain}${singleData.image.src}`, // Full image URL
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

  // 3. Render the page, injecting the schema and passing data to the client component
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