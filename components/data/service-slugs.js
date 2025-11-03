// This file is 100% safe. It has no imports and no JSX.
// Its only job is to provide a list of slugs for next.config.mjs.

const serviceSlugs = [
    'free-zone-company-setup',
    'mainland-company-setup',
    'offshore-company-setup',
    'uae-residence-visa',
    'corporate-services',
    'mainland-vs-free-zone',
    // Add new slugs here as you create them
];

export const getAllServiceSlugs = () => {
    return serviceSlugs.map(slug => ({
        source: `/${slug}`,
        destination: `/services/${slug}`,
    }));
};