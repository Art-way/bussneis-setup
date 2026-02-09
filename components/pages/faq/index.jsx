"use client"

import HeaderOne from "@/components/layout/headers/header-two";
import BreadCrumb from "../common/breadcrumb";
import FaqArea from "./faq";
import FooterTwo from "@/components/layout/footers/footer-two";
import ScrollToTop from "../common/scroll/scroll-to-top";
import WhatsAppButton from "@/components/pages/common/whatsapp-button";
const Faq = () => {
    return (
        <>        
            <HeaderOne />
            <BreadCrumb title='Question & Ans.' innerTitle="FAQ's" />
            <div className='section-padding'>
                <FaqArea />
            </div>
            <div className='all-footer'>
                <FooterTwo />
            </div>
             <WhatsAppButton />
            <ScrollToTop />
        </>
    );
};

export default Faq;