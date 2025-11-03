import React from 'react';
import image1 from "../../../public/assets/img/about/history-1.jpg";
import image2 from "../../../public/assets/img/about/history-2.jpg";
import image3 from "../../../public/assets/img/about/history-3.jpg";
import image4 from "../../../public/assets/img/about/history-4.jpg";
import image5 from "../../../public/assets/img/about/history-5.jpg";

const History = () => {
    return (
        <div className="company__history section-padding">
            <div className="container">
                <div className="row mb-70">
                    <div className="col-xl-12">
                        <div className="company__history-title t-center">
                            <span className="subtitle-one">Our Journey</span>
                            <h2>Milestones of Success & Expertise</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="company__history-area dark__image">
                            {/* Milestone 1 */}
                            <div className="company__history-area-item">
                                <div className="company__history-area-item-left">
                                    <img src={image1.src} alt="Founding team planning business setup" />
                                </div>
                                <div className="company__history-area-item-right">
                                    <div className="company__history-area-item-right-content mb-50 xl-mb-30">
                                        <div className="company__history-area-item-right-content-date">
                                            <span>2014</span>
                                            <h5>Foundation & Vision</h5>
                                        </div>
                                        <p>Business Setup UAE was founded with a clear mission: to make company formation in the Emirates simple, fast, and transparent for entrepreneurs worldwide.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Milestone 2 */}
                            <div className="company__history-area-items">
                                <div className="company__history-area-items-left order-last order-lg-first">
                                    <div className="company__history-area-items-left-content mb-50 xl-mb-30">
                                        <div className="company__history-area-items-left-content-date">
                                            <span>2018</span>
                                            <h5>Embracing VAT Implementation</h5>
                                        </div>
                                        <p>As the UAE introduced VAT, we expanded our services to include VAT registration and advisory, successfully guiding hundreds of clients through the new tax landscape.</p>
                                    </div>
                                </div>
                                <div className="company__history-area-items-right">
                                    <div className="company__history-area-items-right-image">
                                        <img src={image2.src} alt="VAT advisory and consultation session" />
                                    </div>
                                </div>
                            </div>
                            {/* Milestone 3 */}
                            <div className="company__history-area-item">
                                <div className="company__history-area-item-left">
                                    <div className="company__history-area-item-left-image">
                                        <img src={image3.src} alt="Consultant explaining mainland ownership laws" />
                                    </div>
                                </div>
                                <div className="company__history-area-item-right">
                                    <div className="company__history-area-item-right-content mb-50 xl-mb-30">
                                        <div className="company__history-area-item-right-content-date">
                                            <span>2020</span>
                                            <h5>Navigating New Ownership Laws</h5>
                                        </div>
                                        <p>We became leading advisors on the landmark law allowing 100% foreign ownership for mainland companies, helping investors maximize their opportunities.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Milestone 4 */}
                            <div className="company__history-area-items">
                                <div className="company__history-area-items-left order-last order-lg-first">
                                    <div className="company__history-area-items-left-content mb-50 xl-mb-30">
                                        <div className="company__history-area-items-left-content-date">
                                            <span>2023</span>
                                            <h5>Corporate Tax Expertise</h5>
                                        </div>
                                        <p>With the introduction of Corporate Tax, we launched a dedicated tax advisory wing, solidifying our role as a full-service consultancy for our clients.</p>
                                    </div>
                                </div>
                                <div className="company__history-area-items-right">
                                    <div className="company__history-area-items-right-image">
                                        <img src={image4.src} alt="Corporate tax planning meeting" />
                                    </div>
                                </div>
                            </div>
                            {/* Milestone 5 */}
                            <div className="company__history-area-item">
                                <div className="company__history-area-item-left">
                                    <div className="company__history-area-item-left-image">
                                        <img src={image5.src} alt="Celebrating business setup success with a client" />
                                    </div>
                                </div>
                                <div className="company__history-area-item-right">
                                    <div className="company__history-area-item-right-content">
                                        <div className="company__history-area-item-right-content-date">
                                            <span>Today</span>
                                            <h5>A Legacy of Success</h5>
                                        </div>
                                        <p>Having successfully registered over 1,200 companies, we continue our commitment to providing world-class service and expert guidance for all business setup needs in the UAE.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;