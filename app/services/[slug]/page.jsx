"use client"
import { useParams, useRouter } from "next/navigation";
import SEO from "@/components/data/seo";
import allServicesData from "@/components/data/services-data.jsx"; 
import HeaderTwo from "@/components/layout/headers/header-two";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import FooterTwo from "@/components/layout/footers/footer-two";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";
import WhatsAppButton from "@/components/pages/common/whatsapp-button";
import Link from "next/link";

// Intelligent Section Renderer
const RenderSection = ({ section, slug }) => {
    switch (section.type) {
        case 'intro':
            return (
                <div className="row">
                    <div className="col-12">
                        <span className="subtitle-one">{section.subtitle}</span>
                        <h2 className="mb-20">{section.title}</h2>
                        <p>{section.description}</p>
                        <Link className="btn-one mt-20" href="/contact">Get a Free Consultation</Link>
                    </div>
                </div>
            );
        case 'textBlock':
            return (
                <div className="services__details-left-content">
                    <h2>{section.title}</h2>
                    {section.content}
                </div>
            );
        case 'iconGrid':
            return (
                <div className="solutions__two">
                    <div className="row">
                        <div className="col-xl-12 mb-30">
                            <div className="work__area-title t-center">
                                <span className="subtitle-two">{section.subtitle}</span>
                                <h2>{section.title}</h2>
                            </div>
                        </div>
                        {section.points.map((item, pointIndex) => (
                            <div className="col-xl-4 col-md-6 mb-30" key={pointIndex}>
                                <div className="solutions__two-item">
                                    <div className="solutions__two-item-icon"><i className={item.icon} style={{fontSize: '50px'}}></i></div>
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
                case 'clusterNavigation':
    // بناء مصفوفة العناصر مع الفواصل الرسومية بينها
    const clustersWithConnectors = section.clusters.reduce((acc, cluster, index) => {
        // إضافة بطاقة العنصر الأساسية
        acc.push(
            <div className="col-xl-5 col-md-6 mb-30" key={cluster.link}>
                <Link href={cluster.link} className="cluster__navigation-item">
                    <h4>{cluster.title}</h4>
                    <p>{cluster.description}</p>
                    <span className="cluster-arrow">→</span>
                </Link>
            </div>
        );

        // إضافة فاصل رسومي بعد العنصر الأول في الصف على شاشات سطح المكتب
        if (index % 2 === 0 && index < section.clusters.length - 1) {
            acc.push(
                <div key={`connector-${index}`} className="col-xl-2 col-md-0 d-none d-xl-flex cluster-connector-col">
                  
                </div>
            );
        }
        
        return acc;
    }, []);

    return (
        <div className="cluster__navigation">
            <div className="row mb-60">
                <div className="col-xl-12">
                    <div className="work__area-title t-center">
                        <span className="subtitle-one">{section.subtitle || "Explore"}</span>
                        <h2>{section.title}</h2>
                        <p>{section.description}</p>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center align-items-center">
                {clustersWithConnectors}
            </div>
        </div>
    );
        case 'stepByStep':
            return (
                <div className="work__area">
                    <div className="row mb-70">
                        <div className="col-xl-12">
                            <div className="work__area-title t-center">
                                <span className="subtitle-two">{section.subtitle}</span>
                                <h2>{section.title}</h2>
                            </div>
                        </div>
                    </div>
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
        case 'testimonial':
            return (
                 <div className="testimonial__two">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="testimonial__two-item">
                                <div className="testimonial__two-item-top">
                                    <img src="/assets/img/icon/quotes.png" alt="quote icon" />
                                    <div className="testimonial__two-item-top-reviews">
                                        <h6>Client Feedback</h6>
                                        <ul>
                                            {[...Array(section.rating)].map((_, i) => <li key={i}><i className="fas fa-star"></i></li>)}
                                        </ul>
                                    </div>
                                </div>
                                <p>{section.review}</p>
                                <div className="testimonial__two-item-bottom">
                                    <div className="testimonial__two-item-bottom-name">
                                        <h5>{section.author}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        case 'faq':
            const accordionId = `accordion-faq-${slug}`;
            return (
                <div className="faq-area">
                    <div className="row mb-60">
                        <div className="col-xl-12">
                            <div className="faq-area-title t-center">
                                <span className="subtitle-one">{section.subtitle}</span>
                                <h2>{section.title}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div id={accordionId}>
                                {section.questions.map((q, qIndex) => (
                                    <div className="faq__area-item" key={qIndex}>
                                        <h6 className="icon page collapsed" data-bs-toggle="collapse" data-bs-target={`#collapse-${slug}-${qIndex}`}>{q.title}</h6>
                                        <div id={`collapse-${slug}-${qIndex}`} className="faq__area-item-body collapse" data-bs-parent={`#${accordionId}`}>
                                            <p>{q.answer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
        case 'comparisonTable':
            return (
                <div className="work__area">
                    <div className="row mb-70">
                        <div className="col-xl-12">
                            <div className="work__area-title t-center">
                                <span className="subtitle-two">{section.subtitle}</span>
                                <h2>{section.title}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    {section.headers.map((header, i) => <th key={i}>{header}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {section.rows.map((row, i) => (
                                    <tr key={i}>
                                        {row.map((cell, j) => <td key={j}>{cell}</td>)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );

        // UPDATED: Renders the new dark CTA block
        case 'ctaBlock':
            return (
                 <div className="cta-block-dark">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-8 col-md-7">
                                <h2>{section.title}</h2>
                                <p>{section.description}</p>
                            </div>
                            <div className="col-lg-4 col-md-5 text-md-end">
                                <Link className="btn-cta-special" href="/contact">
                                    <span>GET FREE</span>
                                    <span>CONSULTATION</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>       
            );
        default:
            return null;
    }
};

const ServiceTemplatePage = ({ serviceContent }) => {
    if (!serviceContent) {
        const router = useRouter();
        if (typeof window !== 'undefined') { router.replace("/404-error"); }
        return null;
    }

    const { pageTitle, breadcrumbTitle, sections, schema } = serviceContent;

    return (
        <>
            <SEO pageTitle={pageTitle} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            
            <HeaderTwo />
            <BreadCrumb title={breadcrumbTitle} innerTitle="Our Services" />

            <div className="services__details section-padding">
                <div className="container">
                    {sections.map((section, index) => (
                        <div className="section-block" key={index}>
                             <RenderSection section={section} slug={serviceContent.slug} />
                        </div>
                    ))}
                </div>
            </div>

            <div className='all-footer'>
                <FooterTwo />
            </div>
            <WhatsAppButton />
            <ScrollToTop />
        </>
    );
};

// This function now fetches the data for the page
const Page = () => {
    const params = useParams();
    const serviceContent = allServicesData.find((service) => service.slug === params.slug);
    return <ServiceTemplatePage serviceContent={serviceContent} />;
};

export default Page;