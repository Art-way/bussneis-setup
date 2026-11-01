import Link from 'next/link';

const Consulting = () => {
    return (
        <div className="consulting__area section-padding">
            {/* Decorative shapes from the original template */}
            <img className="consulting__area-shape dark-n" src="assets/img/shape/consulting.png" alt="decorative shape" />
            <img className="consulting__area-shape light-n" src="assets/img/shape/consulting-dark.png" alt="decorative shape" />
            
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-xl-7 col-lg-6 lg-mb-30">
                        <div className="consulting__area-image dark__image">
                            {/* You can replace this image with one that visually represents choices or a Dubai landmark */}
                            <img src="assets/img/pages/consulting.jpg" alt="A business professional making a decision" />
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-6">
                        <div className="consulting__area-right">
                            <div className="consulting__area-right-title">
                                <span className="subtitle-two">Making The Right Choice</span>
                                <h2>Mainland vs. Free Zone: Understand the Difference</h2>
                                <p>Your choice of jurisdiction is the most important decision you&apos;ll make. It impacts your ownership structure, business scope, and long-term costs. We&apos;re here to provide clarity.</p>
                            </div>
                            <div className="consulting__area-right-list">
                                <span><i className="far fa-check"></i>Mainland offers unrestricted access to the local market.</span>
                                <span><i className="far fa-check"></i>Free Zones offer 100% ownership and tax benefits.</span>
                            </div>
                            {/* This button now links to your high-value comparison guide */}
                            <Link className="btn-six" href="/blog/mainland-vs-free-zone-which-is-right-for-your-business">Read Our Comparison Guide<i className="far fa-chevron-double-right"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Consulting;