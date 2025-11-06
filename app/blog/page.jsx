// In: app/blog/page.jsx

import BlogGrid from "@/components/pages/blogs/blog";
import blogData from '@/components/data/blog-data'; // Import data for schema

// --- ADDED: Metadata for the main Blog page ---
export const metadata = {
    title: "Blog & Insights | Business Setup in Dubai & UAE",
    description: "Read the latest articles and insights on UAE business laws, company formation, market trends, and practical advice for entrepreneurs from the experts at Business Setup UAE.",
    alternates: {
      canonical: "/blog",
    },
    other: {
      "script[type='application/ld+json']": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Business Setup UAE Blog",
        "description": "Insights on UAE business laws, company formation, and market trends.",
        "blogPost": blogData.slice(0, 10).map(post => ({ // Limiting to 10 for performance
          "@type": "BlogPosting",
          "headline": post.title,
          "url": `https://businesssetupuae.ae/blog/${post.id}`,
          "image": `https://businesssetupuae.ae${post.image.src}`,
          "datePublished": post.datePublished,
          "dateModified": post.dateModified,
          "author": {
            "@type": "Person",
            "name": post.author
          },
           "publisher": {
              "@type": "Organization",
              "name": "Business Setup UAE",
              "logo": {
                  "@type": "ImageObject",
                  "url": `https://businesssetupuae.ae/assets/img/logo-1.png`
              }
          },
        }))
      })
    }
};

const Blog = () => {
    return (
        <>
            <BlogGrid />
        </>
    );
};

export default Blog;