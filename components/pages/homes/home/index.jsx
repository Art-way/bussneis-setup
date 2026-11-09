"use client"

import HeaderTwo from "@/components/layout/headers/header-two";
import FooterTwo from "@/components/layout/footers/footer-two";
import BannerTwo from "./banner";
import SwitchTab from "../../common/dark-light";
import Services from "./services";
import About from "./about";
import Work from "./work";
import Consulting from "./consulting";
import Portfolio from "./portfolio"; // This component is now "Why Choose Us"
import Team from "./team"; // This component is now "Testimonials"
import Blog from "./blog";
import ScrollToTop from "../../common/scroll/scroll-to-top";
import CtaArea from "./cta"; // The CTA Area component was missing from the original layout
import Video from "./video";
import Testimonial from "./testimonial";

import ElfsightForm from '@/components/common/ElfsightForm';

const HomeTwo = ({addClass}) => {
    return (
        <>
            {/* Updated SEO Page Title */}
            
            
            <SwitchTab addClass={addClass} />
            <HeaderTwo />
            <BannerTwo />
            <Services />
            <About />
            <Video />
            {/* The <Video /> component has been removed for a cleaner flow */}
            <Work />
            <Consulting />
            <Portfolio /> {/* This is our "Why Choose Us" section */}
            <Team /> {/* This is our "Testimonials" section */}
        <Testimonial />
            <Blog />
             <CtaArea />
             
            <div className="homepage-form-section section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="work__area-title t-center mb-60">
                                <span className="subtitle-one">Get Started</span>
                                <h2>Request a Free Consultation</h2>
                                <p>Fill out the form below and one of our expert consultants will get back to you shortly.</p>
                            </div>
                            <ElfsightForm />
                        </div>
                    </div>
                </div>
          </div>
            <FooterTwo />
            <ScrollToTop addClass={addClass} />
        </>
    );
};

export default HomeTwo;