// This file controls the cards that appear on the main /services page.
const serviceListingData = [
    {
        id: 'mainland-company-setup',
        icon: <i className="flaticon-city"></i>,
        title: 'Mainland Company Setup',
        description: 'Gain unrestricted access to the local UAE market and the ability to bid on lucrative government contracts.',
        link: '/mainland-company-setup', // Top-level URL
        image: '/assets/img/service/service-1.jpg', 
    },
    {
        id: 'free-zone-company-setup',
        icon: <i className="flaticon-corporate"></i>,
        title: 'Free Zone Company Setup',
        description: 'The most popular choice for international entrepreneurs, offering 100% foreign ownership and significant tax advantages.',
        link: '/free-zone-company-setup', // Top-level URL
        image: '/assets/img/service/service-2.jpg',
    },
    {
        id: 'offshore-company-setup',
        icon: <i className="flaticon-secure-data"></i>,
        title: 'Offshore Company Setup',
        description: 'A strategic tool for international trade, asset protection, and tax planning with complete confidentiality.',
        link: '/offshore-company-setup', // Top-level URL
        image: '/assets/img/service/service-3.jpg',
    },
    {
        id: 'pro-services-uae',
        icon: <i className="flaticon-technical-support"></i>,
        title: 'PRO Services',
        description: 'We handle all your government liaison tasks, including visa processing, renewals, and document clearing.',
        link: '/pro-services-uae', // Top-level URL
        image: '/assets/img/service/service-4.jpg',
    },
    {
        id: 'bank-account-opening',
        icon: <i className="flaticon-money-bag"></i>,
        title: 'Bank Account Opening',
        description: 'Navigate the complexities of UAE banking with our expert assistance and strong relationships with leading banks.',
        link: '/services/bank-account-opening', // Nested URL
        image: '/assets/img/service/service-5.jpg',
    },
    {
        id: 'accounting-services',
        icon: <i className="flaticon-analysis"></i>,
        title: 'Accounting & Tax',
        description: 'Ensure your business stays compliant with VAT and Corporate Tax laws through our professional bookkeeping and advisory.',
        link: '/services/corporate-tax-advisory', // Links to the main tax page
        image: '/assets/img/service/service-6.jpg',
    },
];

export default serviceListingData;