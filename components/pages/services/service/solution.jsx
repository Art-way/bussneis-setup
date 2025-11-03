import React from 'react';
import Link from 'next/link'; // Import the Link component

const Solution = () => {
    return (
        <div className="solutions__two section-padding">
            <div className="container">
                <div className="row">
                    {/* Title Section */}
                    <div className="col-xl-3 col-lg-6 lg-mb-30">
                        <div className="solutions__two-title">
                            <span className="subtitle-one">Our Expertise</span>
                            <h2>Core Service Pillars</h2>
                            <p>We provide end-to-end solutions, from initial company formation to ongoing operational support.</p>
                        </div>
                    </div>
                    {/* Service Pillar 1: Business Setup */}
                    <div className="col-xl-3 col-md-6 xl-mb-30">
                        <Link href="/mainland-vs-free-zone">
                            <div className="solutions__two-item">
                                <div className="solutions__two-item-icon">
                                    <img src="/assets/img/icon/solutions-1.png" alt="Business Setup Icon" />
                                </div>
                                <h4>Business Setup</h4>
                                <p>Expert guidance on Mainland, Free Zone, and Offshore company formation to match your business goals.</p>                        
                            </div>
                        </Link>
                    </div>
                    {/* Service Pillar 2: Visa Services */}
                    <div className="col-xl-3 col-md-6 md-mb-30">
                        <Link href="/uae-residence-visa">
                            <div className="solutions__two-item">
                                <div className="solutions__two-item-icon">
                                    <img src="/assets/img/icon/solutions-2.png" alt="Visa Services Icon" />
                                </div>
                                <h4>Visa Services</h4>
                                <p>Comprehensive support for investor, employment, family, and Golden Visas across the UAE.</p>                        
                            </div>
                        </Link>
                    </div>
                    {/* Service Pillar 3: Corporate Support */}
                    <div className="col-xl-3 col-md-6">
                        <Link href="/corporate-services">
                            <div className="solutions__two-item">
                                <div className="solutions__two-item-icon">
                                    <img src="/assets/img/icon/solutions-3.png" alt="Corporate Support Icon" />
                                </div>
                                <h4>Corporate Support</h4>
                                <p>Ongoing services including bank assistance, PRO, accounting, and tax advisory to ensure compliance.</p>                        
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Solution;