"use client";
import Link from 'next/link';
import logo1 from "../../../public/assets/img/logo-3.png"; // Placeholder for light logo
import logo2 from "../../../public/assets/img/logo-5.png"; // Placeholder for dark logo
import logo3 from "../../../public/assets/img/logo-4.png"; // Placeholder for light logo variation
import MainMenu from './header-menu';
import Search from './search';
import { useState } from 'react';
import MobileMenuOne from './menu_sidebar/menu-two';

const HeaderTwo = () => {
    const [menuSidebar, setMenuSidebar] = useState(false);
    const [search, setSearch] = useState(false);
    return (
        <>
            <div className="header__two">
                {/* Topbar can be removed or kept based on your preference */}
                <div className="header__two-topbar">
                    <div className="container">
                        <div className="row align-items-center borders">
                            <div className="col-xl-6 col-sm-8">
                                <div className="header__two-topbar-left sm-t-center">
                                    <Link href="tel:+971507706746"><i className="far fa-phone-alt"></i> Call Us: +971 50 770 6746</Link>
                                </div>
                            </div>
                            <div className="col-xl-6 col-sm-4">
                               <div className="header__two-topbar-left sm-t-center t-right">
                                    <Link href="mailto:info@businesssetupuae.ae"><i className="far fa-envelope"></i> info@businesssetupuae.ae</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="auto__container pl-35 pr-35">
                    <div className="header__area-menubar two">
                        <div className="header__area-menubar-left">
                            <div className="header__area-menubar-left-logo">
                                <Link href='/'>
                                    {/* Replace these with your actual logo files */}
                                    <img className='one' src={logo1.src} alt='Business Setup UAE Logo' />
                                    <img className="two" src={logo2.src} alt="Business Setup UAE Logo" />
                                    <img className="light" src={logo3.src} alt="Business Setup UAE Logo" />
                                </Link>
                            </div>
                        </div>
                        <div className="header__area-menubar-center two">
                            <div className="header__area-menubar-center-menu two menu-responsive">
                                <MainMenu />
                            </div>
                        </div>
                        <div className="header__area-menubar-right">
                            <div className="header__area-menubar-right-box">
                                <div className="header__area-menubar-right-box-search">
                                    <div className="search">	
                                        <span className="header__area-menubar-right-box-search-icon open" onClick={() => setSearch(true)}>
                                            <i className="fal fa-search"></i>
                                        </span>
                                    </div>
                                    <Search isOpen={search} setIsOpen={setSearch} />
                                </div>
                                <div className="header__area-menubar-right-box-contact">
                                    <div className="header__area-menubar-right-box-contact-icon">
                                        <i className="fal fa-envelope-open-text"></i>
                                    </div>
                                    <div className="header__area-menubar-right-box-contact-info">
                                        <span className="text-four">Need Help?</span>
                                        <h6><Link href="mailto:info@businesssetupuae.ae">info@businesssetupuae.ae</Link></h6>
                                    </div>
                                </div>
                                <div className="header__area-menubar-right-responsive-menu menu__bar">
                                    <i className="flaticon-menu" onClick={() => setMenuSidebar(true)}></i>
                                </div>
                            </div>
                        </div>
                        <div className="header__area-menubar-right-btn">
                            <Link className="btn-six" href="/contact">Get a Quote<i className="far fa-chevron-double-right"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
            <MobileMenuOne isOpen={menuSidebar} setIsOpen={setMenuSidebar} />
        </>
    );
};

export default HeaderTwo;