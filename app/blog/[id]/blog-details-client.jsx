// In: app/blog/[id]/blog-details-client.jsx

"use client"; // This is a Client Component

import { useRouter } from "next/navigation";
import BlogDetails from '@/components/pages/blogs/blog-details';

const BlogDetailsClient = ({ singleData }) => {
    const router = useRouter();

    // Client-side check for navigation errors
    if (!singleData) {
        if (typeof window !== 'undefined') {
            router.push("/404-error");
        }
        return null;
    }

    // The BlogDetails component handles the actual display
    return (
        <BlogDetails singleData={singleData} />
    );
};

export default BlogDetailsClient;