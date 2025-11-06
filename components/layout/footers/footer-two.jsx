// In: components/layout/footers/footer-two.jsx

import Social from "@/components/data/social";
import Link from "next/link";

const FooterTwo = () => {
    return (
        <>
            <div className="footer__two" data-background="/assets/img/shape/footer-bg-1.png">
                
                <div className="container" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
                    <div className="row">

                        {/* --- العمود الأول: About Widget --- */}
                        <div className="col-lg-4 col-md-6 mb-40">
                            <div className="footer__two-widget">
                                <div className="footer__two-widget-about">
                                    <Link href="/">
                                        <img className="all_f_logo" src="/assets/img/logo-2.png" alt="Business Setup UAE" style={{ maxWidth: '200px' }} />
                                    </Link>
                                    <p className="mt-30">Your expert partner for company formation and corporate services in the UAE. We provide clear, efficient, and reliable solutions for entrepreneurs and businesses worldwide.</p>
                                    <div className="footer__two-widget-about-social">
                                        <Social />
                                    </div>							
                                </div>
                            </div>
                        </div>

                        {/* --- العمود الثاني: Our Services --- */}
                        <div className="col-lg-3 col-md-6 mb-40">
                            <div className="footer__two-widget footer-border">
                                {/* --- FIXED: h4 -> h2 --- */}
                                <h2 className="footer-widget-title">Our Services</h2>
                                <div className="post__item">
                                    <div className="post__item-title">
                                        {/* --- FIXED: h6 -> h3 --- */}
                                        <h3 className="footer-item-title"><Link href="/uae-mainland-company-setup">Mainland Setup</Link></h3>
                                        <span>Full UAE Market Access</span>
                                    </div>
                                </div>
                                <div className="post__item">
                                    <div className="post__item-title">
                                        <h3 className="footer-item-title"><Link href="/uae-free-zones">Free Zone Setup</Link></h3>
                                        <span>100% Foreign Ownership</span>
                                    </div>
                                </div>
                                <div className="post__item">
                                    <div className="post__item-title">
                                        <h3 className="footer-item-title"><Link href="/services/pro-services-uae">PRO Services</Link></h3>
                                        <span>Visas & Gov Liaison</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* --- العمود الثالث: Quick Links --- */}
                        <div className="col-lg-2 col-md-6 mb-40">
                            <div className="footer__two-widget footer-border">
                                <h2 className="footer-widget-title">Quick Links</h2>
                                <div className="post__item">
                                    <div className="post__item-title">
                                        <h3 className="footer-item-title"><Link href="/about-us">About Us</Link></h3>
                                    </div>
                                </div>
                                <div className="post__item">
                                    <div className="post__item-title">
                                        <h3 className="footer-item-title"><Link href="/blog">Blog</Link></h3>
                                    </div>
                                    
                                </div>
                                <div className="post__item">
                                    <div className="post__item-title">
                                        <h3 className="footer-item-title"><Link href="/contact">Contact Us</Link></h3>
                                    </div>
                                </div>
                                <div className="post__item">
                                    <div className="post__item-title">
                                        <h3 className="footer-item-title"><Link href="/faq">FAQs</Link></h3>
                                        
                                    </div>
                                </div>
                     
                            </div>
                        </div>
                    
                        {/* --- العمود الرابع: Head Office --- */}
                        <div className="col-lg-3 col-md-6 mb-40">
                            <div className="footer__two-widget footer-border">
                                <h2 className="footer-widget-title">Head Office</h2>
                                <div className="footer__two-widget-location">
                                    <div className="footer__two-widget-location-item">
                                        <div className="footer__two-widget-location-item-icon">
                                            <i className="far fa-map-marker-alt"></i>
                                        </div>
                                        <div className="footer__two-widget-location-item-info">
                                            <p>Office 2008, Iris Bay Tower, Business Bay, Dubai, UAE</p>
                                        </div>
                                    </div>
                                    {/* --- FIXED: h6 -> h3 --- */}
                                   <h2 className="footer-widget-title">Branch Office</h2>
                                    <div className="footer__two-widget-location-item">
                                        <div className="footer__two-widget-location-item-icon">
                                            <i className="far fa-map-marker-alt"></i>
                                        </div>
                                        <div className="footer__two-widget-location-item-info">
                                            <p>Office 105, Emaar Square, Downtown Dubai, UAE</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* --- قسم حقوق النشر --- */}
                <div className="copyright__two">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <p>Copyright 2025 © <Link href="/">Business Setup UAE</Link> - All Rights Reserved | <Link href="/terms-and-conditions">Terms & Conditions</Link> | <Link href="/privacy-policy">Privacy Policy</Link></p> 
                            </div>
                        </div>
                    </div>
                </div>		
            </div>          
        </>
    );
};

export default FooterTwo;