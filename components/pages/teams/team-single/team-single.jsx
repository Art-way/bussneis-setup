"use client"; // Add this to enable state for the form
import Link from "next/link";
import { useState } from "react";
import SkillBarItem from "../../common/skill-bar";

const TeamSingleMain = ({teamDetails}) => {
    // State for the contact form
    const [formData, setFormData] = useState({ name: '', email: '', service: '' });
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
                body: JSON.stringify({
                    ...formData,
                    recipient_name: teamDetails.name, // To know who the email is for
                    source: 'Team Member Contact Form',
                }),
            });
            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', service: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };
    
    return (
        <div className="team__single section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-xl-5 col-lg-5 lg-mb-30">
                        <div className="team__single-left">
                            <div className="team__single-left-thumb dark__image">
                                <img src={teamDetails.image.src} alt={teamDetails.name} /> {/* Dynamic Alt Tag */}
                                <div className="team__single-left-thumb-social">
                                    <ul>
                                        {teamDetails?.social_link.map((social, id) => (
                                            <li key={id}><Link href={social.link} target={social.target}>{social.icon}</Link></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="team__single-left-info">
                                <span>{teamDetails?.position}</span>
                                <h3>{teamDetails?.name}</h3>
                                <div className="team__single-left-info-contact">
                                    <div className="team__single-left-info-contact-item">
                                        <i className="far fa-envelope"></i>
                                        <div className="team__single-left-info-contact-item-info">
                                            <span>Email Me</span>
                                            <h5><Link href={`mailto:${teamDetails?.mail}`}>{teamDetails?.mail}</Link></h5>
                                        </div>
                                    </div>
                                    <div className="team__single-left-info-contact-item">
                                        <i className="fal fa-phone-alt"></i>
                                        <div className="team__single-left-info-contact-item-info">
                                            <span>Call Me</span>
                                            <h5><Link href={`tel:${teamDetails?.phone}`}>{teamDetails?.phone}</Link></h5>
                                        </div>
                                    </div>
                                    <div className="team__single-left-info-contact-item mb-45">
                                        <i className="far fa-map-marker-alt"></i>
                                        <div className="team__single-left-info-contact-item-info">
                                            <span>Office Location</span>
                                            <h5><Link href="#" target="_blank">Business Bay, Dubai, UAE</Link></h5>
                                        </div>
                                    </div>
                                </div>
                            </div>						
                        </div>
                    </div>
                    <div className="col-xl-7 col-lg-7">
                        <div className="team__single-right">
                            <div className="team__single-right-experience">
                                <h3>Area of Expertise</h3>
                                <p>With a deep understanding of the UAE's corporate law and regulatory environment, {teamDetails.name.split(' ')[0]} specializes in guiding international entrepreneurs through the complexities of company formation. Their focus is on creating seamless, compliant, and strategic business structures that align with our clients' long-term goals.</p>
                                <h3>Approach to Client Success</h3>
                                <p>The approach is client-centric, focusing on clear communication and transparent processes. By understanding each client's unique business model, {teamDetails.name.split(' ')[0]} provides tailored advice that simplifies decision-making, whether it's choosing between a mainland or free zone setup, selecting the right business activities, or navigating visa and banking procedures.</p>
                            </div>
                            <div className="team__single-right-skill">
                                <h3>Professional Skills</h3>
                                <div className="skill__area">
                                    <div className="skill__area-item">
                                        <div className="skill__area-item-content">
                                            <span className="text-two">Mainland Company Law</span>
                                        </div>
                                        <div className="skill__area-item-inner">
                                            <SkillBarItem countUp={95} />
                                        </div>
                                    </div>
                                    <div className="skill__area-item">
                                        <div className="skill__area-item-content">
                                            <span className="text-two">Free Zone Regulations</span>
                                        </div>
                                        <div className="skill__area-item-inner">
                                            <SkillBarItem countUp={98} />
                                        </div>
                                    </div>
                                    <div className="skill__area-item">
                                        <div className="skill__area-item-content">
                                            <span className="text-two">Client Strategy & Advisory</span>
                                        </div>
                                        <div className="skill__area-item-inner">
                                            <SkillBarItem countUp={92} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="team__single-right-form">
                                <h4>Contact {teamDetails.name.split(' ')[0]}</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-30">
                                            <div className="contact__two-right-form-item contact-item">
                                                <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 md-mb-30">
                                            <div className="contact__two-right-form-item contact-item">
                                                <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleInputChange}/>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-30">
                                            <div className="team__single-right-form-select">
                                                <select name="service" required value={formData.service} onChange={handleInputChange}>
                                                    <option value="">Select Service of Interest</option>
                                                    <option value="Mainland Setup">Mainland Company Setup</option>
                                                    <option value="Free Zone Setup">Free Zone Company Setup</option>
                                                    <option value="PRO Services">PRO Services</option>
                                                    <option value="Bank Account">Bank Account Opening</option>
                                                    <option value="Other">Other Inquiry</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="contact__two-right-form-item">
                                                <button className="btn-one" type="submit" disabled={status === 'submitting'}>
                                                    {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                     {status === 'success' && <p className="form-success-message mt-20">Thank you! Your message has been sent.</p>}
                                     {status === 'error' && <p className="form-error-message mt-20">Something went wrong. Please try again.</p>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamSingleMain;