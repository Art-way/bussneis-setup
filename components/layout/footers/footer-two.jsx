// In: components/layout/footers/footer-two.jsx

import Social from "@/components/data/social";
import Link from "next/link";

const FooterTwo = () => {
    return (
        <>
            <div className="footer__two" data-background="/assets/img/shape/footer-bg-1.png">
                
                <div className="container" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
                    <div className="row">

                        {/* --- العمود الأول: About Widget (معدّل ليأخذ مساحة أقل) --- */}
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

                        {/* --- العمود الثاني: Our Services (باستخدام تنسيق القالب الأصلي) --- */}
                        <div className="col-lg-3 col-md-6 mb-40">
                            <div className="footer__two-widget footer-border">
                                <h4>Our Services</h4>
                                <div className="post__item">
                                    <div className="post__item-title">
                                        <h6><Link href="/uae-mainland-company-setup">Mainland Setup</Link></h6>
                                        <span>Full UAE Market Access</span>
                                    </div>
                                </div>
                                <div className="post__item">
                                    <div className="post__item-title">
                                        <h6><Link href="/uae-free-zones">Free Zone Setup</Link></h6>
                                        <span>100% Foreign Ownership</span>
                                    </div>
                                </div>
                                <div className="post__item">
                                    <div className="post__item-title">
                                        <h6><Link href="/services/pro-services-uae">PRO Services</Link></h6>
                                        <span>Visas & Gov Liaison</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* --- العمود الثالث: Quick Links (باستخدام تنسيق القالب الأصلي) --- */}
                        <div className="col-lg-2 col-md-6 mb-40">
                            <div className="footer__two-widget footer-border">
                                <h4>Quick Links</h4>
                                <div className="post__item">
                                    <div className="post__item-title">
                                        <h6><Link href="/about-us">About Us</Link></h6>
                                    </div>
                                </div>
                                <div className="post__item">
                                    <div className="post__item-title">
                                        <h6><Link href="/blog">Blog</Link></h6>
                                    </div>
                                </div>
                                <div className="post__item">
                                    <div className="post__item-title">
                                        <h6><Link href="/contact">Contact Us</Link></h6>
                                    </div>
                                </div>
                                <div className="post__item">
                                    <div className="post__item-title">
                                        <h6><Link href="/faq">FAQs</Link></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* --- العمود الرابع: Head Office (يبقى كما هو) --- */}
                        <div className="col-lg-3 col-md-6 mb-40">
                            <div className="footer__two-widget footer-border">
                                <h4>Head Office</h4>
                                <div className="footer__two-widget-location">
                                    <div className="footer__two-widget-location-item">
                                        <div className="footer__two-widget-location-item-icon">
                                            <i className="far fa-map-marker-alt"></i>
                                        </div>
                                        <div className="footer__two-widget-location-item-info">
                                            <p>Office 2008, Iris Bay Tower, Business Bay, Dubai, UAE</p>
                                        </div>
                                    </div>
                                    <h6 className="mt-20">Branch Office</h6>
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

                {/* --- قسم حقوق النشر (يبقى كما هو) --- */}
                <div className="copyright__two">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <p>Copyright 2025 © <Link href="/">Business Setup UAE</Link> - All Rights Reserved</p>
                            </div>
                        </div>
                    </div>
                </div>		
            </div>          
        </>
    );
};

export default FooterTwo;