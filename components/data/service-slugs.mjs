// components/data/service-slugs.js

const serviceSlugs = [
    'uae-free-zones',
    'uae-mainland-company-setup',
    'business-setup-services',
    'uae-residence-visas',
    'dubai-free-zones',
    'dubai-mainland-company-setup',
    'abu-dhabi-free-zones',
    'abu-dhabi-mainland-company-setup',
    'sharjah-free-zones',
    'sharjah-mainland-company-setup',
    'northern-emirates-free-zones',
    'northern-emirates-mainland-setup',
    'uae-investor-visa',
    'uae-employment-visa',
    'uae-dependent-visa',
    'uae-golden-visa',
    'dmcc-free-zone',
    'jafza-free-zone',
    'difc-free-zone',
    'meydan-free-zone',
    'dubai-silicon-oasis-free-zone',
    'hamriyah-free-zone',
    'dubai-free-zones-comparison',
    'free-zone-setup-packages',
    'mainland-trade-license-uae',
    'llc-company-formation-dubai-mainland',
    'offshore-company-formation'
];

// غيرنا الوظيفة لتناسب التوجيه (Redirect) بدلاً من إعادة الكتابة
export const getServiceRedirects = () => {
    return serviceSlugs.map(slug => ({
        source: `/${slug}`, // الرابط القديم المباشر
        destination: `/services/${slug}/`, 
        permanent: true, // توجيه 301 دائم
    }));
};