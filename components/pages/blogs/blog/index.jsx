"use client"


import HeaderOne from "@/components/layout/headers/header-two";
import BreadCrumb from "../../common/breadcrumb";
import BlogGridMain from "./blog-grid";
import FooterTwo from "@/components/layout/footers/footer-two";
import ScrollToTop from "../../common/scroll/scroll-to-top";


const BlogGrid = () => {
    return (
        <>
            
            <HeaderOne />
            <BreadCrumb title="Blog" innerTitle="Blog" />
            <BlogGridMain />
            <div className='all-footer'>
                <FooterTwo />
            </div>
            <ScrollToTop />
        </>
    );
};

export default BlogGrid;