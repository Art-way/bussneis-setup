import Link from "next/link";
import Image from "next/image";

import ResponsiveMenu from "../responsive-menu";

const MobileMenuTwo = ({ isOpen, setIsOpen }) => {
    return (
        <div className={`menu__bar-popup two ${isOpen ? "show" : ""}`}>
            <div className="menu__bar-popup-top">
                <div className="logo">
                    <Link href="/"><Image src="/assets/brand/bsetup-uae-light.svg" alt="BSetup UAE" width={200} height={55} priority /></Link>
                </div>
                <div className="close" onClick={() => setIsOpen(false)}>
                    <i className="fal fa-times"></i>
                </div>
            </div>
            <div className="responsive-menu mean-container">
                <div className="mean-bar">
                    <div className="mean-nav">
                        <ResponsiveMenu />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenuTwo;