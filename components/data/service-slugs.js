// This file is 100% safe. It has no imports and no JSX.
// Its only job is to provide a list of slugs for next.config.mjs.

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
    'mainland-trade-license-uae',
    
    // Add new slugs here as you create them
];

export const getAllServiceSlugs = () => {
    return serviceSlugs.map(slug => ({
        source: `/${slug}`,
        destination: `/services/${slug}`,
    }));
};