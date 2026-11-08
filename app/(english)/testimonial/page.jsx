import Testimonial from "@/components/pages/testimonial";
export const metadata = {
  title: "Client Testimonials & Success Stories",
  description: "See what our clients say about BSetup UAE. Read reviews and success stories from entrepreneurs we've helped.",
  alternates: {
    canonical: "/testimonial",
  },
};
const TestimonialPage = () => {
    return (
        <>
            <Testimonial />            
        </>
    );
};

export default TestimonialPage;