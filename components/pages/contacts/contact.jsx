"use client"
import { useState } from 'react';
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-two";
import BreadCrumb from "../common/breadcrumb";
import FooterTwo from "@/components/layout/footers/footer-two";
import ScrollToTop from "../common/scroll/scroll-to-top";

const ContactUs = () => {
    // State for the contact form
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            const response = await fetch('YOUR_FORMSPREE_URL_HERE', { // <-- PASTE YOUR FORMSPREE URL
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, source: 'Contact Us Page' }),
            });
            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };
    
    // JSON-LD Schema for Local Business
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Business Setup UAE",
        "image": "https://businesssetupuae.ae/assets/img/logo-1.png", // Replace with your logo URL
        "@id": "https://businesssetupuae.ae/",
        "url": "https://businesssetupuae.ae/contact",
        "telephone": "+971-50-770-6746",
        "email": "info@businesssetupuae.ae",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Office 2008, Iris Bay Tower, Business Bay",
            "addressLocality": "Dubai",
            "addressCountry": "AE"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 25.1876, // Approximate coordinates for Iris Bay Tower
            "longitude": 55.2647
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "09:00",
            "closes": "17:00"
        }
    };


    return (
        <>
            <SEO pageTitle="Contact Us" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <HeaderOne />
            <BreadCrumb title="Contact Us" innerTitle="Get In Touch" />
            <div className="contact__page section-padding pb-0">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-5 col-lg-5 order-last order-lg-first">
                            <div className="contact__page-form">
                                <h3 className="mb-30">Send Us a Message</h3>
                                <form onSubmit={handleSubmit}>	
                                    <div className="row">
                                        <div className="col-sm-12 mb-20"> 
                                            <div className="contact__page-form-item contact-item">
                                                <span className="fal fa-user"></span>
                                                <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleInputChange} />
                                            </div>										
                                        </div>
                                        <div className="col-sm-12 mb-20">
                                            <div className="contact__page-form-item contact-item">
                                                <span className="far fa-envelope-open"></span>
                                                <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleInputChange} />											
                                            </div>									
                                        </div>
                                        <div className="col-sm-12 mb-30"> 
                                            <div className="contact__page-form-item contact-item">
                                                <span className="far fa-comments"></span>
                                                <textarea name="message" placeholder="Your message..." required value={formData.message} onChange={handleInputChange}></textarea>
                                            </div>										
                                        </div>
                                        <div className="col-lg-12">										
                                            <div className="contact__page-form-item">
                                                <button className="btn-one" type="submit" disabled={status === 'submitting'}>
                                                    {status === 'submitting' ? 'Sending...' : 'Submit Now'}
                                                    <i className="far fa-chevron-double-right"></i>
                                                </button>
                                            </div>										
                                        </div>
                                    </div>
                                    {status === 'success' && <p className="form-success-message mt-20">Thank you for your message! We'll get back to you soon.</p>}
                                    {status === 'error' && <p className="form-error-message mt-20">An error occurred. Please try again.</p>}
                                </form>                        
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-7 lg-mb-30">
                            <div className="contact__page-info">
                                <h2 className="mb-60 lg-mb-30">Contact Information</h2>
                                <div className="contact__page-info-item">
                                    <h6>Head Office<span>:</span></h6>
                                    <span>Office 2008, Iris Bay Tower, Business Bay, Dubai, UAE</span>
                                </div>
                                <div className="contact__page-info-item">
                                    <h6>Branch Office<span>:</span></h6>
                                    <span>Office 105, Emaar Square, Downtown Dubai, UAE</span>
                                </div>
                                <div className="contact__page-info-item">
                                    <h6>Email Address <span>:</span></h6>
                                    <span>
                                        <a href="mailto:info@businesssetupuae.ae">info@businesssetupuae.ae</a>
                                    </span>
                                </div>
                                <div className="contact__page-info-item">
                                    <h6>Phone Number<span>:</span></h6>
                                    <span>
                                        <a href="tel:+971507706746">+971 50 770 6746</a>
                                    </span>
                                </div>
                                <div className="contact__page-info-item">
                                    <h6>Working Hours<span>:</span></h6>
                                    <span>Monday - Friday: 9:00 AM - 5:00 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contact__page-map">
                {/* Updated Google Maps iframe src for Iris Bay Tower, Dubai */}
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14442.054011859358!2d55.241021787158246!3d25.185899800000012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69001c8d0399%3A0x8f6d40395efc45af!2sIris%20Bay%20Tower!5e0!3m2!1sen!2sca!4v1762205900735!5m2!1sen!2sca" loading="lazy"></iframe>
            </div>
            <div className='all-footer'>
                <FooterTwo />
            </div>
            <ScrollToTop />
        </>
    );
};

export default ContactUs;