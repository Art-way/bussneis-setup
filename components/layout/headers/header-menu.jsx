import Link from 'next/link';
import React from 'react';

const MainMenu = () => {
    return (
        <>    
            <ul>
                <li><Link href='/'>Home</Link></li>
                <li><Link href='/about-us'>About Us</Link></li>

                <li className='menu-item-has-children'><Link href='#'>Business Setup</Link>
                    <ul className='sub-menu'>
                        <li><Link href='/mainland-company-setup'>Mainland Company Setup</Link></li>
                        <li><Link href='/free-zone-company-setup'>Free Zone Company Setup</Link></li>
                        <li><Link href='/offshore-company-setup'>Offshore Company Setup</Link></li>
                    </ul>
                </li>
                <li className='menu-item-has-children'><Link href='/corporate-services'>Services</Link>
                    <ul className='sub-menu'>
                        <li><Link href='/pro-services-uae'>PRO Services</Link></li>
                        <li><Link href='/services/bank-account-opening'>Bank Account Opening</Link></li>
                        <li><Link href='/services/accounting-services'>Accounting Services</Link></li>
                        <li><Link href='/services/corporate-tax-advisory'>Corporate Tax Advisory</Link></li>
                        <li><Link href='/services/golden-visa-uae'>Golden Visa</Link></li>
                    </ul>
                </li>
                 <li className='menu-item-has-children'><Link href='#'>Resources</Link>
                    <ul className='sub-menu'>
                        <li><Link href='/how-to-start-a-business-in-dubai'>How to Start a Business</Link></li>
                        <li><Link href='/mainland-vs-free-zone'>Mainland vs Free Zone</Link></li>
                        <li><Link href='/blog'>Blog</Link></li>
                        <li><Link href='/faq'>FAQs</Link></li>
                    </ul>
                </li>
            </ul>  
        </>
    );
};

export default MainMenu;