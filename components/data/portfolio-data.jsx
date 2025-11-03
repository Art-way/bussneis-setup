import image1 from "../../public/assets/img/portfolio/portfolio-1.jpg";
import image2 from "../../public/assets/img/portfolio/portfolio-2.jpg";
import image3 from "../../public/assets/img/portfolio/portfolio-3.jpg";
import image4 from "../../public/assets/img/portfolio/portfolio-4.jpg";
import image5 from "../../public/assets/img/portfolio/portfolio-5.jpg";
import image6 from "../../public/assets/img/portfolio/portfolio-6.jpg";

const portfolioData = [
    {        
        id: 'mainland-company-setup',
        title: 'Mainland Setup',
        subtitle: 'Market Access',
        image: image1, // Using the required imported image
        link: '/mainland-company-setup',
        category: "business", // Kept for potential compatibility with filter pages
    },
    {        
        id: 'free-zone-company-setup',
        title: 'Free Zone Setup',
        subtitle: '100% Ownership',
        image: image2, // Using the required imported image
        link: '/free-zone-company-setup',
        category: "business",
    },
    {        
        id: 'offshore-company-setup',
        title: 'Offshore Setup',
        subtitle: 'Asset Protection',
        image: image3, // Using the required imported image
        link: '/offshore-company-setup',
        category: "corporate",
    },
    {        
        id: 'corporate-services',
        title: 'Corporate Services',
        subtitle: 'Ongoing Support',
        image: image4, // Using the required imported image
        link: '/corporate-services',
        category: "corporate",
    },
    // The original items using image5 and image6 are removed,
    // but the imports are kept at the top as requested.
];

export default portfolioData;