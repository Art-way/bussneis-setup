"use client"
import { useEffect } from 'react';
import "./globals.css";
import SwitchTab from '@/components/pages/common/dark-light';

export default function RootLayout({ children }) {
    useEffect(() => {
        require('bootstrap/dist/js/bootstrap.min.js');
    }, []);

    return (
        <html lang="en">
            {/* The <head> tag can now be empty. Next.js will add the icon automatically. */}
            <head>
            </head>
            <body>
                <SwitchTab />
                {children}
            </body>
        </html>
    );
}