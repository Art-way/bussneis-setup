import Social from "@/components/data/social";
import Link from "next/link";
import logo2 from "../../../public/assets/img/logo-2.png"; // Your dark mode/footer logo

const FooterTwo = () => {
    return (
        <>
            {/* The main footer container */}
            <div className="footer__two" data-background="assets/img/shape/footer-bg-1.png">
                
                {/* Main Footer Widgets - We removed the subscription area */}
                <div className="container" style={{ paddingTop: '180px', paddingBottom: '80px' }}>
                    <div className="row">

                        {/* Column 1: About Widget */}
                        <div className="col-xl-5 col-lg-5 col-md-6 lg-mb-30">
                            <div className="footer__two-widget">
                                <div className="footer__two-widget-about">
                                    <Link href="/">
                                        <img className="all_f_logo" src={logo2.src} alt="Business Setup UAE" style={{ maxWidth: '200px' }} />
                                    </Link>
                                    <p className="mt-30">Your expert partner for company formation and corporate services in the UAE. We provide clear, efficient, and reliable solutions for entrepreneurs and businesses worldwide.</p>
                                    <div className="footer__two-widget-about-social">
                                        <Social />
                                    </div>							
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Head Office Widget */}
                        <div className="col-xl-3 col-lg-3 col-md-6 md-mb-30">
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

                        {/* Column 3: Main Silos / Core Services Widget */}
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="footer__two-widget footer-border">
                                <h4>Our Core Services</h4>
                                {/* Using the post__item structure for a "nice format" as requested */}
                                <div className="post__item">
                                    <div className="post__item-title">
                                        <h6><Link href="/services/mainland-company-formation">Mainland Company Setup</Link></h6>
                                        <span>Full access to the UAE local market.</span>
                                    </div>
                                </div>
                                <div className="post__item">
                                    <div className="post__item-title">
                                        <h6><Link href="/services/free-zone-company-formation">Free Zone Company Setup</Link></h6>
                                        <span>100% foreign ownership and tax benefits.</span>
                                    </div>
                                </div>
                                <div className="post__item">
                                    <div className="post__item-title">
                                        <h6><Link href="/services">Corporate Services</Link></h6>
                                        <span>Ongoing support for your business operations.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Copyright Area */}
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