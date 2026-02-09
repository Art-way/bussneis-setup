"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const ResponsiveMenu = () => {
    // State for the first level of sub-menus
    const [activeMenu, setActiveMenu] = useState(null);
    const active = (value) => setActiveMenu(value === activeMenu ? null : value),
    activeIcon = (value) => (activeMenu == value ? "mean-clicked" : ""),
    activeSubMenu = (value) =>
    value == activeMenu ? { display: "block" } : { display: "none" };

    // State for the second level of sub-menus (nested)
    const [activeMenus, setActiveMenus] = useState(null);
    const actives = (value) => setActiveMenus(value === activeMenus ? null : value),
    activeIcons = (value) => (activeMenus == value ? "mean-clicked" : ""),
    activeSubMenus = (value) =>
    value == activeMenus ? { display: "block" } : { display: "none" };

  return (
    <>    
    <ul>
        <li><Link href='/'>Home</Link></li>
        <li><Link href='/about-us'>About Us</Link></li>

        <li className='menu-item-has-children'>
            <Link href='#'>Business Setup</Link>
            <ul className='sub-menu' style={activeSubMenu("business-setup")}>
                
                <li className='menu-item-has-children'><Link href='/services/uae-mainland-company-setup/'>Mainland Setup</Link>
                    <ul className='sub-menu' style={activeSubMenus("mainland-setup")}>
						<li><Link href='/services/dubai-mainland-company-setup/'>Dubai Mainland</Link></li>
						<li><Link href='/services/abu-dhabi-mainland-company-setup/'>Abu Dhabi Mainland</Link></li>
						<li><Link href='/services/sharjah-mainland-company-setup/'>Sharjah Mainland</Link></li>
					</ul>
                    <a className={`mean-expand ${activeIcons("mainland-setup")}`} onClick={() => actives("mainland-setup")}></a>
				</li>

                <li className='menu-item-has-children'><Link href='/services/uae-free-zones/'>Free Zone Setup</Link>
                    <ul className='sub-menu' style={activeSubMenus("freezone-setup")}>
						<li><Link href='/services/dubai-free-zones/'>Dubai Free Zones</Link></li>
						<li><Link href='/services/abu-dhabi-free-zones/'>Abu Dhabi Free Zones</Link></li>
						<li><Link href='/services/sharjah-free-zones/'>Sharjah Free Zones</Link></li>
						<li><Link href='/services/northern-emirates-free-zones/'>Northern Emirates</Link></li>
					</ul>
                    <a className={`mean-expand ${activeIcons("freezone-setup")}`} onClick={() => actives("freezone-setup")}></a>
				</li>

                <li><Link href='/services/offshore-company-formation/'>Offshore Formation</Link></li>
            </ul>
            <a className={`mean-expand ${activeIcon("business-setup")}`} onClick={() => active("business-setup")}></a>
        </li>

		<li className='menu-item-has-children'><Link href='/services'>Services</Link>
            <ul className='sub-menu' style={activeSubMenu("services")}>
				<li><Link href='/services/pro-services-uae/'>PRO Services</Link></li>
                <li><Link href='/services/corporate-bank-account-opening/'>Bank Account Opening</Link></li>
                <li><Link href='/services/uae-residence-visas/'>Visa Services</Link></li>
                <li><Link href='/services/uae-golden-visa/'>Golden Visa</Link></li>
                <li><Link href='/services/business-license-renewal/'>License Renewal</Link></li>
			</ul>
            <a className={`mean-expand ${activeIcon("services")}`} onClick={() => active("services")}></a>
		</li>

        <li className='menu-item-has-children'><Link href='#'>Resources</Link>
            <ul className='sub-menu' style={activeSubMenu("resources")}>
                <li><Link href='/blog/uae-company-formation-steps/'>How to Start a Business</Link></li>
                <li><Link href='/blog/mainland-vs-free-zone-which-is-right-for-your-business/'>Mainland vs Free Zone</Link></li>
                <li><Link href='/blog/'>Blog</Link></li>
                <li><Link href='/faq/'>FAQs</Link></li>
            </ul>
            <a className={`mean-expand ${activeIcon("resources")}`} onClick={() => active("resources")}></a>
        </li>
        
        <li><Link href='/contact/'>Contact Us</Link></li>
    </ul>  
    </>
  );
};

export default ResponsiveMenu;