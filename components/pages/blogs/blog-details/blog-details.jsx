import Link from 'next/link';
import BlogSidebar from '../blog-sidebar/blog-sidebar';

// This is the modular renderer, similar to the one on our service pages.
// It can be expanded with more case statements for different block types.
const RenderSection = ({ section }) => {
    switch (section.type) {
        case 'intro':
            return (
                <div className="row mb-60">
                    <div className="col-12">
                        <span className="subtitle-one">{section.subtitle}</span>
                        <h2 className="mb-20">{section.title}</h2>
                        <p>{section.description}</p>
                    </div>
                </div>
            );
        case 'textBlock':
            return (
                 <div className="services__details-left-content mb-40">
                    <h2>{section.title}</h2>
                    {section.content}
                </div>
            );
        case 'stepByStep':
             return (
                <div className="work__area mb-40">
                     <div className="row mb-70"><div className="col-xl-12"><div className="work__area-title t-center"><span className="subtitle-two">{section.subtitle}</span><h2>{section.title}</h2></div></div></div>
                    <div className="row">
                        {section.steps.map((step, stepIndex) => (
                            <div className="col-xl-4 col-md-6 mb-30" key={stepIndex}>
                                <div className="work__area-item" style={{minHeight: '100%'}}>
                                    <span>{step.number}</span>
                                    <h6>{step.title}</h6>
                                    <p>{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'ctaBlock':
             return (
                 <div className="cta-block-dark">
                    <div className="container"><div className="row align-items-center"><div className="col-lg-8 col-md-7"><h2>{section.title}</h2><p>{section.description}</p></div><div className="col-lg-4 col-md-5 text-md-end"><Link className="btn-cta-special" href="/contact"><span>GET FREE</span><span>CONSULTATION</span></Link></div></div></div>
                </div>       
            );
        default:
            return null;
    }
}

const BlogSingleMain = ({ singleData }) => {
    // Check if the post has the new 'sections' array for modular content
    const hasModularContent = singleData.sections && singleData.sections.length > 0;

    return (
        <div className="blog__details section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-xl-8 col-lg-8 lg-mb-50">
                        {hasModularContent ? (
                            // IF it has modular content, render it using the new system
                            <div className="blog__details-left">
                                {singleData.sections.map((section, index) => (
                                    <div className="section-block" key={index}>
                                        <RenderSection section={section} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // ELSE, fall back to the original simple blog post style for standard posts
                            <div className="blog__details-left">
                                <img className="img__full mb-40" src={singleData.image.src} alt={singleData.title} />
                                <div className="blog__details-left-meta">
                                    <div className="blog__details-left-meta-content">
                                        <span>Date :</span>
                                        <h6>March {singleData.date}, 2024</h6>
                                    </div>
                                    <div className="blog__details-left-meta-content">
                                        <span>Category:</span>
                                        <h6>Guides</h6>
                                    </div>
                                </div>
                                <h3 className="mb-20">{singleData.title}</h3>
                                <p>{singleData.des}</p>
                                {/* You can add more simple content here if needed for standard posts */}
                            </div>
                        )}
                        
                        {/* The comment and contact form can be shown on all blog posts */}
                        <div className="blog__details-left-contact mt-60">
                            <h5>Leave a Comment</h5>
                            <p className="mb-30">Your email address will not be published. Required fields are marked *</p>
                            <div className="blog__details-left-contact-form">
                                <form action="#">	
                                    <div className="row">
                                        <div className="col-sm-6 mb-30"> 
                                            <input type="text" name="name" placeholder="Full Name *" required />
                                        </div>
                                        <div className="col-sm-6 sm-mb-30">
                                            <input type="email" name="email" placeholder="Email Address *" required />											
                                        </div>
                                        <div className="col-sm-12 mb-30"> 
                                            <textarea name="message" placeholder="Type your comments...."></textarea>
                                        </div>
                                        <div className="col-lg-12">										
                                            <button className="btn-one" type="submit">Post Comment</button>
                                        </div>
                                    </div>							
                                </form>	
                            </div>						
                        </div>    
                    </div>

                    {/* The sidebar is always displayed */}
                    <div className="col-xl-4 col-lg-4">
                        <BlogSidebar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogSingleMain;