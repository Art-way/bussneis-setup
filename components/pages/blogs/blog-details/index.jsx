// In: components/pages/blogs/blog-details/index.jsx

"use client";

import BlogSingleMain from "./blog-details";
import BreadCrumb from "../../common/breadcrumb-blog";
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-two";
import FooterTwo from "@/components/layout/footers/footer-two";
import ScrollToTop from "../../common/scroll/scroll-to-top";

const BlogDetails = ({ singleData, schema }) => { // يستقبل السكيما هنا
    const firstThreeWords = singleData?.title.split(' ').slice(0, 6).join(' ') + '...';
    return (
        <>
            <SEO pageTitle={singleData?.title} />
            
            {/* --- هنا يتم حقن السكيما في الصفحة --- */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            
            <HeaderOne />
            <BreadCrumb title={firstThreeWords} innerTitle={singleData?.title} />
            <BlogSingleMain singleData={singleData} />
            <div className='all-footer'>
                <FooterTwo />
            </div>
            <ScrollToTop />
        </>
    );
};

export default BlogDetails;