import React from 'react';

const Work = () => {
    return (
        <div className="work__area section-padding pb-0">
            <div className="container">
                <div className="row mb-70">
                    <div className="col-xl-12">
                        <div className="work__area-title t-center">
                            <span className="subtitle-two">Our Work Process</span>
                            <h2>A Clear Path to Your UAE Company</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-3 col-sm-6 xl-mb-30">
                        <div className="work__area-item">
                            <span>01</span>
                            <h6>Initial Consultation</h6>
                            <p>We start by listening to your business goals to advise on the best path forward for your venture.</p>
                            <img className="work__area-item-arrow sm-display-n dark-n" src="assets/img/icon/arrow-1.png" alt="arrow shape" />
                            <img className="work__area-item-arrow sm-display-n light-n" src="assets/img/icon/arrow-1-dark.png" alt="arrow shape" />
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 sm-mb-30">
                        <div className="work__area-item">
                            <span>02</span>
                            <h6>Jurisdiction & Structure</h6>
                            <p>We help you choose the ideal setup: Mainland for local access, or Free Zone for 100% ownership.</p>
                            <img className="work__area-item-arrow xl-display-n dark-n" src="assets/img/icon/arrow-2.png" alt="arrow shape" />
                            <img className="work__area-item-arrow xl-display-n light-n" src="assets/img/icon/arrow-2-dark.png" alt="arrow shape" />
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 sm-mb-30">
                        <div className="work__area-item">
                            <span>03</span>
                            <h6>License & Documentation</h6>
                            <p>Our expert team handles all the required paperwork and government approvals on your behalf.</p>
                            <img className="work__area-item-arrow xl-display-n dark-n" src="assets/img/icon/arrow-1.png" alt="arrow shape" />
                            <img className="work__area-item-arrow xl-display-n light-n" src="assets/img/icon/arrow-1-dark.png" alt="arrow shape" />
                            <img className="work__area-item-arrow display-n xl-display-b sm-display-n dark-n" src="assets/img/icon/arrow-2.png" alt="arrow shape" />
                            <img className="work__area-item-arrow display-n xl-display-b sm-display-n light-n" src="assets/img/icon/arrow-2-dark.png" alt="arrow shape" />
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6">
                        <div className="work__area-item">
                            <span>04</span>
                            <h6>Visa & Bank Account</h6>
                            <p>We complete the process by securing your residence visa and corporate bank account.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Work;