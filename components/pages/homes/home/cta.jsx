"use client"; // Add this line to make the component interactive
import { useState } from 'react';

const CtaArea = () => {
    // State to manage form inputs and submission status
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        
        try {
            // IMPORTANT: Replace with your actual Formspree URL
            const response = await fetch('YOUR_FORMSPREE_URL_HERE', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    source: 'Homepage CTA Form',
                    ...formData
                }),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '' }); // Clear form on success
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <>
        <div className="cta__area">
            <div className="container">
                <div className="row cta__area-bg align-items-center">
                    <div className="col-xxl-5 col-xl-4">
                        <div className="cta__area-title">
                            {/* Updated Content */}
                            <h2>Request a Free Callback</h2>
                            <span className="text-two">Let our experts answer your questions.</span>
                        </div>
                    </div>
                    <div className="col-xxl-7 col-xl-8 pr-0">
                        <div className="cta__area-form">
                            <form onSubmit={handleSubmit}>
                                <div className="cta__area-form-item md-mb-30">
                                    <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleInputChange} />

                                </div>
                                <div className="cta__area-form-item md-mb-30">
                                    <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleInputChange} />
                                </div>
                                <div className="cta__area-form-item">
                                    <button className="btn-four" type="submit" disabled={status === 'submitting'}>
                                        {status === 'submitting' ? 'Sending...' : 'Request Callback'}
                                        <i className="far fa-chevron-double-right"></i>
                                    </button>
                                </div>
                            </form>
                             {/* Form status messages */}
                             <div className="form-status-messages mt-20">
                                {status === 'success' && <p style={{ color: '#fff', textAlign: 'center' }}>Thank you! We will contact you shortly.</p>}
                                {status === 'error' && <p style={{ color: '#ffbaba', textAlign: 'center' }}>Something went wrong. Please try again.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>            
        </>
    );
};

export default CtaArea;