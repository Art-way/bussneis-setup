// In: app/page.jsx

import HomeTwo from "@/components/pages/homes/home";

// --- ADDED: Metadata for the Home Page ---
export const metadata = {
  // Note: Next.js will automatically use title.template from the root layout if it exists
  title: "Business Setup in Dubai, UAE | Company Formation Experts",
  description: "Expert assistance for company formation in Dubai and the UAE. We offer mainland, free zone, and offshore business setup, PRO services, and visa support. Get your free consultation today.",
  alternates: {
    // The canonical URL for the homepage is the root domain
    canonical: "/",
  },
};

const HomePage = () => {
    return (
        <>
            <HomeTwo addClass="two" />
        </>
    );
};

export default HomePage;