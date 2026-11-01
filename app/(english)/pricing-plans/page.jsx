import PricingPages from "@/components/pages/pricing-plans";
export const metadata = {
  title: "Business Setup Packages & Pricing Plans",
  description: "Transparent pricing for Free Zone, Mainland, and Offshore company formation in the UAE. Get a customized quote today.",
  alternates: {
    canonical: "/pricing-plans",
  },
};
const Pricing = () => {
    return (
        <>
            <PricingPages />            
        </>
    );
};

export default Pricing;