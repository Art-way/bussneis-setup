// In: app/page.jsx
import HomeTwo from "@/components/pages/homes/home";

export const metadata = {
  title: "Business Setup in Dubai, UAE | Company Formation Experts", // هذا العنوان سي덮ى على الـ Default
  description: "Expert assistance for company formation in Dubai and the UAE. We offer mainland, free zone, and offshore business setup, PRO services, and visa support. Get your free consultation today.",
  alternates: {
    canonical: "/", // بفضل metadataBase في Layout، هذا سيتحول تلقائياً إلى https://businesssetupuae.ae/
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