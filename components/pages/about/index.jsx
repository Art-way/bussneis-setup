"use client"

import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-two";
import BreadCrumb from "../common/breadcrumb";
import AboutMain from "./about";
import FooterTwo from "@/components/layout/footers/footer-two";
import ScrollToTop from "../common/scroll/scroll-to-top";
import WhoWeAre from "./who-we-are";
import History from "./history";
import WhatsAppButton from "@/components/pages/common/whatsapp-button";
const AboutUs = () => {
    return (
      <>
        <SEO pageTitle="About Us" />
        <HeaderOne />
        <BreadCrumb title="About Us" innerTitle="Company About" />
        <AboutMain />
            <WhoWeAre />
            <History />
        <div className='all-footer'>
            <FooterTwo />
        </div>
         <WhatsAppButton />
            <ScrollToTop />
      </>
    );
};

export default AboutUs;