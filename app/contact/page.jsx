// In: app/contact/page.jsx

import ContactUs from '@/components/pages/contacts/contact';

// --- ADDED: Metadata for the Contact Us page ---
export const metadata = {
  title: "Contact Us",
  description: "Get in touch with our expert consultants for a free consultation on company formation in Dubai and the UAE. Find our office location, phone number, and email.",
  alternates: {
    canonical: "/contact",
  },
};

// This page component remains simple, as the main logic is in the client component it calls.
const ContactPage = () => {
    return (
        <>
            <ContactUs />            
        </>
    );
};

export default ContactPage;