// In: components/pages/common/TextPageComponent.jsx

import SEO from "@/components/data/seo";
import HeaderTwo from "@/components/layout/headers/header-two";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import FooterTwo from "@/components/layout/footers/footer-two";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";

const TextPageComponent = ({ title, breadcrumbTitle, children }) => {
    return (
        <>
            <SEO pageTitle={title} />
            <HeaderTwo />
            <BreadCrumb title={title} innerTitle={breadcrumbTitle || "Company"} />

            <div className="text-page-container section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="text-page-content">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='all-footer'>
                <FooterTwo />
            </div>
            <ScrollToTop />
        </>
    );
};

export default TextPageComponent;