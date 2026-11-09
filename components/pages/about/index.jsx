"use client"


import HeaderOne from "@/components/layout/headers/header-two";
import BreadCrumb from "../common/breadcrumb";
import AboutMain from "./about";
import FooterTwo from "@/components/layout/footers/footer-two";
import ScrollToTop from "../common/scroll/scroll-to-top";
import WhoWeAre from "./who-we-are";
import History from "./history";

const AboutUs = () => {
    return (
      <>
        
        <HeaderOne />
        <BreadCrumb title="About Us" innerTitle="Company About" />
        <AboutMain />
            <WhoWeAre />
            <History />
        <div className='all-footer'>
            <FooterTwo />
        </div>
            <ScrollToTop />
      </>
    );
};

export default AboutUs;