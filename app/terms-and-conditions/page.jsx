// In: app/terms-and-conditions/page.jsx

import TextPageComponent from "@/components/pages/common/TextPageComponent";

// --- IMPORTANT: This is placeholder text. Replace it with your actual Terms & Conditions. ---
const TermsContent = () => (
    <>
        <h2>Terms and Conditions</h2>
        <p><strong>Effective Date: November 6, 2025</strong></p>
        <p>
            Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the https://businesssetupuae.ae website (the "Service") operated by Business Setup UAE ("us", "we", or "our").
        </p>
        <p>
            Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service. By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
        </p>
        
        <h3>1. Scope of Services</h3>
        <p>
            Business Setup UAE provides business consultancy services, including but not limited to, company formation in UAE mainland, free zones, and offshore jurisdictions; visa processing assistance; corporate bank account opening assistance; and other related PRO services.
        </p>
        <p>
            All information provided on our website or during consultations is for general informational and guidance purposes only. It does not constitute legal, financial, or tax advice. We are a business consultancy firm and not a law firm. You are solely responsible for seeking independent professional advice before making any business decisions.
        </p>
        
        <h3>2. Client Obligations</h3>
        <p>As a client, you agree to:</p>
        <ul>
            <li>Provide accurate, complete, and current information as requested by us for the provision of services.</li>
            <li>Cooperate fully with us and any government authority in all matters relating to the services.</li>
            <li>Be solely responsible for the business activities, financial management, and legal compliance of your company once it is established.</li>
            <li>Pay all fees and charges associated with our services as per the agreed-upon quotation and payment schedule.</li>
        </ul>

        <h3>3. Fees and Payments</h3>
        <p>
            All fees for our services will be detailed in a formal quotation provided to you. Fees are exclusive of any government charges, third-party fees, or taxes unless explicitly stated otherwise. Government fees are subject to change without prior notice, and any such changes will be passed on to the client.
        </p>

        <h3>4. Intellectual Property</h3>
        <p>
            The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Business Setup UAE and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Business Setup UAE.
        </p>

        <h3>5. Limitation of Liability</h3>
        <p>
            In no event shall Business Setup UAE, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content.
        </p>
        <p>
            Our liability is limited to the value of the fees paid for our services. We are not responsible for decisions made by government authorities or banks regarding your applications.
        </p>

        <h3>6. Governing Law</h3>
        <p>
            These Terms shall be governed and construed in accordance with the laws of the United Arab Emirates, as applicable in the Emirate of Dubai, without regard to its conflict of law provisions. Any disputes arising from these Terms or the use of our services shall be subject to the exclusive jurisdiction of the courts of Dubai.
        </p>

        <h3>7. Changes to Terms</h3>
        <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
        </p>
        
        <h3>8. Contact Us</h3>
        <p>If you have any questions about these Terms, please contact us:</p>
      <ul>
            <li><strong>By Email:</strong> info@businesssetupuae.ae</li>
            <li><strong>By Phone:</strong> +971 50 770 6746</li>
            <li><strong>By Mail:</strong> Your Full Office Address, e.g., Office 2008, Iris Bay Tower, Business Bay, Dubai, UAE</li>
        </ul>
    </>
);


const TermsAndConditionsPage = () => {
    return (
        <TextPageComponent title="Terms and Conditions">
            <TermsContent />
        </TextPageComponent>
    );
};

export default TermsAndConditionsPage;