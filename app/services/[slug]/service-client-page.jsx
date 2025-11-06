// In: app/services/[slug]/service-client-page.jsx

"use client"; // This directive is crucial. It marks this as a Client Component.

import { useRouter } from "next/navigation";
import HeaderTwo from "@/components/layout/headers/header-two";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import FooterTwo from "@/components/layout/footers/footer-two";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";
import WhatsAppButton from "@/components/pages/common/whatsapp-button";
import Link from "next/link";
import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import serviceListingData from "@/components/data/service-listing-data.jsx";
import Head from 'next/head';

// Intelligent Section Renderer (This stays inside the client component)
const RenderSection = ({ section, slug }) => {
    switch (section.type) {
        case 'intro':
    const [name, setName] = useState('');
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState('');
    const [service, setService] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        const formData = { name, phone, email, service };

        try {
            const response = await fetch("https://formspree.io/f/YOUR_UNIQUE_ID", { // IMPORTANT: PASTE YOUR FORMSPREE URL
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setName(''); setPhone(''); setEmail(''); setService('');
            } else { setStatus('error'); }
        } catch (error) { setStatus('error'); }
    };

    return (
        <div className="service-intro-section">
            <div className="row align-items-center">
                <div className="col-lg-7 mb-40">
                    <span className="subtitle-one">{section.subtitle}</span>
                    <h2 className="mb-20">{section.title}</h2>
                    <p className="mb-30">{section.description}</p>
                </div>
                <div className="col-lg-5 mb-40">
                    <div className="intro-form lets-talk-form">
                        <h3>Let's Talk</h3>
                        <p>Free Consultation</p>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
                            <PhoneInput placeholder="Mobile" value={phone} onChange={setPhone} defaultCountry="AE" required />
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <select value={service} onChange={(e) => setService(e.target.value)} required>
                                <option value="" disabled>What Services?</option>
                                {serviceListingData.map(s => (<option key={s.id} value={s.title}>{s.title}</option>))}
                            </select>
                            <button type="submit" className="btn-one" disabled={status === 'submitting'}>{status === 'submitting' ? 'Sending...' : 'Submit'}</button>
                            {status === 'success' && <p className="form-status success">Thank you! Your submission has been received.</p>}
                            {status === 'error' && <p className="form-status error">Something went wrong. Please try again.</p>}
                        </form>
                    </div>
                </div>
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
                // تم إضافة كلاس جديد للتحكم بالتصميم
                <div className="solutions__two redesigned-grid">
                    <div className="row">
                        <div className="col-xl-12 mb-50">
                            <div className="work__area-title t-center">
                                <span className="subtitle-one">{section.subtitle}</span>
                                <h2>{section.title}</h2>
                            </div>
                        </div>
                        {section.points.map((item, pointIndex) => (
                            <div className="col-xl-4 col-md-6 mb-30" key={pointIndex}>
                                <div className="solutions__two-item">
                                    <div className="solutions__two-item-icon"><i className={item.icon}></i></div>
                                    {/* --- FIXED: h4 -> h3 --- */}
                                    <h3>{item.title}</h3>
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
                    <h3>{cluster.title}</h3>
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
        // Added 'redesigned-steps' class for custom styling
        <div className="work__area redesigned-steps">
            <div className="container">
                <div className="row mb-70">
                    <div className="col-xl-12">
                        <div className="work__area-title t-center">
                            <span className="subtitle-one">{section.subtitle}</span>
                            <h2>{section.title}</h2>
                        </div>
                    </div>
                </div>
                {/* Added 'justify-content-center' to center the items if they are less than a full row */}
                <div className="row justify-content-center">
                    {section.steps.map((step, stepIndex) => (
                        // Changed column size to col-xl-4 to better space out 3 items, and col-lg-6 for 2 items on medium screens
                        <div className="col-xl-4 col-lg-6 col-md-8 mb-40" key={stepIndex}>
                            <div className="work__area-item">
                                {/* The number is now inside its own styled span */}
                                <div className="step-number"><span>{step.number}</span></div>
                                <h3 className="work-step-title">{step.title}</h3>
                                <p>{step.description}</p>

                                {/* --- Logic for displaying arrows --- */}
                                {/* Show right arrow after item 1 and 2 on large screens */}
                                {stepIndex < 2 && (
                                    <>
                                        <img className="work__area-item-arrow d-none d-xl-block dark-n" src="/assets/img/icon/arrow-1.png" alt="arrow shape" />
                                        <img className="work__area-item-arrow d-none d-xl-block light-n" src="/assets/img/icon/arrow-1-dark.png" alt="arrow shape" />
                                    </>
                                )}
                              
                            </div>
                        </div>
                    ))}
                </div>
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
                                        <h3>Client Feedback</h3>
                                        <ul>
                                            {[...Array(section.rating)].map((_, i) => <li key={i}><i className="fas fa-star"></i></li>)}
                                        </ul>
                                    </div>
                                </div>
                                <p>{section.review}</p>
                                <div className="testimonial__two-item-bottom">
                                    <div className="testimonial__two-item-bottom-name">
                                        <h4>{section.author}</h4>
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
                                        <h3 className="icon page collapsed" data-bs-toggle="collapse" data-bs-target={`#collapse-${slug}-${qIndex}`}>{q.title}</h3>
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
        // --- KEY CHANGE: The main div is now outside the container ---
        <div className="cta-block-dark">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-8 col-md-7">
                        {/* The h2 will now be styled by the new CSS */}
                        <h2 className="cta-title">{section.title}</h2> 
                        <p className="cta-description">{section.description}</p>
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



// Main Presentation Component
const ServiceTemplatePage = ({ serviceContent }) => {
    const ctaSection = serviceContent.sections.find(sec => sec.type === 'ctaBlock');
    const mainSections = serviceContent.sections.filter(sec => sec.type !== 'ctaBlock');
    const { breadcrumbTitle } = serviceContent;

    return (
        <div className="service-page-wrapper">
            <HeaderTwo />
            <BreadCrumb title={breadcrumbTitle} innerTitle="Our Services" />
            <div className="services__details section-padding">
                <div className="container">
                    {mainSections.map((section, index) => (
                        <div className="section-block" key={index}>
                             <RenderSection section={section} slug={serviceContent.slug} />
                        </div>
                    ))}
                </div>
            </div>
             {ctaSection && <RenderSection section={ctaSection} slug={serviceContent.slug} />}
            <div className='all-footer'>
                <FooterTwo />
            </div>
            <WhatsAppButton />
            <ScrollToTop />
        </div>
    );
};


// The default export of this file is the client-side logic wrapper
const ServiceClientPage = ({ serviceContent }) => {
    const router = useRouter();

    if (!serviceContent && typeof window !== 'undefined') {
        router.push('/404-error');
        return null;
    }
    
    // Fallback in case serviceContent is temporarily null during rendering
    if (!serviceContent) {
        return null;
    }

    // Extract the schema from the props
    const serviceSchema = serviceContent.schema;

    return (
        <>
            {/* Inject the schema script into the head of the document */}
            <Head>
                <script
                    type-="application/ld+json" // The dash is intentional to avoid JSX parsing issues, it renders correctly
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
                    key="service-schema" // A unique key is good practice
                />
            </Head>

            {/* Render the rest of your page content */}
            <ServiceTemplatePage serviceContent={serviceContent} />
        </>
    );
};

export default ServiceClientPage;