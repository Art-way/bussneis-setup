// In: app/blog/[id]/blog-details-client.jsx

"use client";

import BlogDetails from '@/components/pages/blogs/blog-details';

const BlogDetailsClient = ({ singleData }) => {
    // البيانات مضمونة الوصول هنا لأن السيرفر قام بالتحقق منها مسبقاً
    return (
        <BlogDetails singleData={singleData} />
    );
};

export default BlogDetailsClient;