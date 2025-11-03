import shape1 from "../../../../public/assets/img/shape/about.png";
import shape2 from "../../../../public/assets/img/shape/about-dark.png";
import image1 from "../../../../public/assets/img/about/about-3.jpg";
import image2 from "../../../../public/assets/img/about/about-4.jpg";
import Count from "../../common/count";
import Link from "next/link";

const About = () => {
    // Updated data object with relevant content for your business
    const aboutData = {
        subtitle: 'About Business Setup UAE',
        title: 'Your Trusted Partner for UAE Company Formation',
        description: 'We are a team of dedicated business setup consultants passionate about helping entrepreneurs and established companies navigate the landscape of company formation in the UAE. Our goal is to provide clear, efficient, and reliable solutions tailored to your unique business needs.',
        count: 10,
        exp: 'Years of Combined Experience in the UAE Market',
        btn_title: 'Learn More About Us',
        btn_link: '/about-us',
    }

    return (
        <div className="about__two dark__image section-padding">
            <img className="about__two-shape dark-n" src={shape1.src} alt="decorative shape" />
            <img className="about__two-shape light-n" src={shape2.src} alt="decorative shape" />
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-xl-7 col-lg-6 lg-mb-30">
                        <div className="row">
                            <div className="col-6">
                                {/* Updated alt tags for SEO */}
                                <img src={image1.src} alt="Business meeting in a Dubai office" />
                            </div>
                            <div className="col-6 mt-95 sm-mt-55">
                                <img src={image2.src} alt="Modern Dubai cityscape" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-6">
                        <div className="about__two-right">
                            <div className="about__two-right-title">
                                <span className="subtitle-two">{aboutData.subtitle}</span>
                                <h2>{aboutData.title}</h2>
                                <p>{aboutData.description}</p>
                            </div>
                            <div className="about__two-right-experience">
                                <div className="about__two-right-experience-counter">
                                    <h1><Count number={aboutData.count}/>+</h1>
                                </div>
                                <div>
                                    <h6>{aboutData.exp}</h6>
                                </div>
                            </div>
                            {/* SIMPLIFIED BUTTON SECTION: Removed the specific author/avatar part */}
                            <div className="about__two-right-btn">
                                <div>
                                    <Link className="btn-six" href={aboutData.btn_link}>{aboutData.btn_title}<i className="far fa-chevron-double-right"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;