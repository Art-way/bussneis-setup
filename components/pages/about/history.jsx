import image from '../../../public/assets/img/about/history-1.jpg';

export default function History() {
    return (
        <section className="company__history section-padding">
            <div className="container">
                <div className="row mb-70">
                    <div className="col-xl-12">
                        <div className="company__history-title t-center">
                            <span className="subtitle-one">Our Experience</span>
                            <h2>Supporting UAE Business Setup Since 2021</h2>
                        </div>
                    </div>
                </div>
                <div className="company__history-area dark__image">
                    <div className="company__history-area-item">
                        <div className="company__history-area-item-left">
                            <img src={image.src} alt="Business planning and document preparation" />
                        </div>
                        <div className="company__history-area-item-right">
                            <div className="company__history-area-item-right-content">
                                <div className="company__history-area-item-right-content-date">
                                    <span>Since 2021</span>
                                    <h3>Experience Behind Your Next Step</h3>
                                </div>
                                <p>BSetup UAE brings UAE business setup experience dating to 2021 to company formation and related business support. We help entrepreneurs organise their activity, licensing route, documents and service requirements.</p>
                                <p>We discuss the activity, licensing authority, documents and related applications for your project before preparing a service offer.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
