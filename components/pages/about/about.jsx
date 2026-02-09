import Link from "next/link";
import Count from "../common/count";

const AboutMain = () => {
    // Updated data object with relevant content for your business
    const aboutContent = {
        image_1: '/assets/img/about/about-7.jpg',
        image_2: '/assets/img/about/about-8.jpg',
        subtitle: 'Who We Are',
        title: 'Your Trusted Partner for Business Success in the UAE',
        description: 'Business Setup UAE was founded with a clear mission: to simplify the company formation process for entrepreneurs and businesses from around the world. We are a team of expert consultants with deep-rooted experience in the UAE\'s legal and corporate landscape. We understand the challenges you face, and we are dedicated to providing clear, efficient, and reliable solutions that pave the way for your success.',
        btn_text: 'Get in Touch With Our Experts',
        btn_href: '/contact', // Changed to link to the contact page
        shape_1: '/assets/img/shape/about-1.png',
        shape_2: '/assets/img/shape/about-2.png',
    }
    return (
        <>
            <div className="about__company section-padding">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xxl-7 col-xl-6 xl-mb-30">
                            <div className="about__company-left">
                                <div className="about__company-left-image dark__image">
                                    {/* Updated alt tags for SEO */}
                                    <img src={aboutContent.image_1} alt="A team of business consultants in a meeting" />
                                    <img src={aboutContent.image_2} alt="Close-up of a business license document" />
                                </div>
                                <div className="about__company-left-experience">
                                    {/* Updated counter to be more relevant */}
                                    <h2><Count number={1200} />+</h2>
                                    <h6>Successful Company Formations</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-5 col-xl-6">
                            <div className="about__company-right">
                                <div className="about__company-right-title">							
                                    <span className="subtitle-one">{aboutContent.subtitle}</span>
                                    <h2>{aboutContent.title}</h2>
                                    <p>{aboutContent.description}</p>
                                    <Link className="btn-one" href={aboutContent.btn_href}>{aboutContent.btn_text}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img className="about__one-shape-1" src={aboutContent.shape_1} alt="decorative shape" />
                <img className="about__one-shape-2" src={aboutContent.shape_2} alt="decorative shape" />
            </div>
        </>
    );
};

export default AboutMain;