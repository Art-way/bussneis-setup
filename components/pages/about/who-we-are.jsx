import React from 'react';
import bgImage from "../../../public/assets/img/about/about-solution.jpg";
import image from "../../../public/assets/img/about/about-9.jpg";
import shape from "../../../public/assets/img/shape/about-solution.png";
import Count from '../common/count';
import Link from 'next/link';

const WhoWeAre = () => {
    return (
        <>
            {/* "Our Mission & Values" Section */}
            <div className="company__two section-padding pt-0">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-7 lg-mb-30">
                            <div className="company__two-left">
                                <div className="company__two-left-title">
                                    <span className="subtitle-one">Our Mission & Values</span>
                                    <h2>Your Success is Our Business</h2>
                                    <p>Our mission is to empower entrepreneurs by making business setup in the UAE transparent, efficient, and accessible. We are committed to providing honest advice and unwavering support, ensuring every client's journey is a success story. We operate on principles of integrity, expertise, and a client-first approach.</p>
                                </div>
                                <div className="company__two-left-skill">
                                    <div className="company__two-left-skill-item">
                                        <h2><Count number={98} />%</h2>
                                        <h6>Client Satisfaction Rate</h6>
                                    </div>
                                    <div className="company__two-left-skill-item">
                                        <h2><Count number={40} />+</h2>
                                        <h6>Free Zones Covered</h6>
                                    </div>
                                </div>
                                {/* The button can link to your main services page */}
                                <Link className="btn-two" href="/corporate-services">Explore Our Services<i className="far fa-chevron-double-right"></i></Link>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-5">
                            <div className="company__two-right dark__image t-right">
                                <img className="img__full" src={image.src} alt="Business consultants collaborating on a project" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>    

            {/* "Call to Action" Section */}
            <div className="about__solution" style={{backgroundImage: `url(${bgImage.src})`}}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-8">
                            <div className="about__solution-left xl-t-center">
                                <h2>Let's Build Your UAE Business, Together.</h2>
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <div className="about__solution-right t-right xl-t-center">						
                                <Link className="btn-one" href="/contact">Get Your Free Consultation<i className="far fa-chevron-double-right"></i></Link>
                                <img className="about__solution-right-shape left-right-animate" src={shape.src} alt="decorative shape" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        </>
    );
};

export default WhoWeAre;