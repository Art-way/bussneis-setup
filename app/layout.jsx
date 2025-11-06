// In: app/layout.jsx

"use client"
import { useEffect } from 'react';
import "./globals.css";
import SwitchTab from '@/components/pages/common/dark-light';

// We no longer need 'next/head' here

export default function RootLayout({ children }) {
    useEffect(() => {
        require('bootstrap/dist/js/bootstrap.min.js');
    }, []);

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Business Setup UAE",
      "url": "https://businesssetupuae.ae",
      "logo": "https://businesssetupuae.ae/assets/img/logo-1.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+971-50-770-6746",
        "contactType": "Customer Service"
      }
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "https://businesssetupuae.ae",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://businesssetupuae.ae/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    return (
        <html lang="en">
            <head>
              {/* --- CORRECTED: Injecting global schemas directly into the <head> tag --- */}
              <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
              />
              <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
              />
            </head>
            <body>
                <SwitchTab />
                {children}
            </body>
        </html>
    );
}