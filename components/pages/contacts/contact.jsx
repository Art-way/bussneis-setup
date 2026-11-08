// In: components/pages/contacts/contact.jsx
"use client";

import HeaderOne from "@/components/layout/headers/header-two";
import BreadCrumb from "../common/breadcrumb";
import FooterTwo from "@/components/layout/footers/footer-two";
import ScrollToTop from "../common/scroll/scroll-to-top";
import WhatsAppButton from "@/components/pages/common/whatsapp-button";

// استيراد مكون الفورم الجديد
import ElfsightForm from '@/components/common/ElfsightForm'; 

const ContactUs = () => {
    // تم حذف كل الأكواد المتعلقة بالفورم القديم (useState, handlers)

    // كود السكيما يبقى كما هو - ممتاز
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "BSetup UAE",
        "image": "https://businesssetupuae.ae/assets/brand/bsetup-uae.svg",
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
            "latitude": 25.1876,
            "longitude": 55.2647
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "17:00"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <HeaderOne />
            <BreadCrumb title="Contact Us" innerTitle="Get In Touch" />
            
            {/* تم تعديل هذا القسم لمنع التداخل */}
            <div className="contact__page section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-5 col-lg-5 order-last order-lg-first">
                            <div className="contact__page-form">
                                <h3 className="mb-30">Send Us a Message</h3>
                                <ElfsightForm />
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-7 lg-mb-30">
                            <div className="contact__page-info">
                                <h2 className="mb-60 lg-mb-30">Contact Information</h2>
                                {/* ... معلومات الاتصال تبقى كما هي ... */}
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

            {/* تم تعديل هذا القسم */}
            <div className="contact__page-map" style={{ marginTop: '0', marginBottom: '0' }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14442.054011859358!2d55.241021787158246!3d25.185899800000012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69001c8d0399%3A0x8f6d40395efc45af!2sIris%20Bay%20Tower!5e0!3m2!1sen!2sca!4v1762205900735!5m2!1sen!2sca" loading="lazy"></iframe>
            </div>

            <div className='all-footer'>
                <FooterTwo />
            </div>
            <WhatsAppButton />
            <ScrollToTop />
        </>
    );
};

export default ContactUs;