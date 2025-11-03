import Link from 'next/link';
import CtaArea from '../../homes/home/cta';
import Solution from './solution';
import Testimonial from '../../homes/home/testimonial';
import serviceListingData from '@/components/data/service-listing-data.jsx'; // Import the new, dedicated data file

const ServicesMain = () => {
    return (
        <>
            <div className="services__page section-padding-two">
                <div className="container">
                    {/* Page Introduction */}
                    <div className="row mb-60">
                        <div className="col-12 t-center">
                            <span className="subtitle-one">Our Services</span>
                            <h2>Comprehensive Solutions for Your UAE Business</h2>
                            <p>We provide a complete suite of services to support you at every stage of your business journey.</p>
                        </div>
                    </div>

                    {/* Service Cards Grid */}
                    <div className="row">
                        {serviceListingData?.map((data) => (
                            <div className="col-xl-4 col-lg-4 col-md-6 mt-25" key={data.id}>
                                <div className="services__three-item page">
                                    <img src={data.image} alt={data.title} />
                                    <div className="services__three-item-content page">
                                        <div className="services__three-item-content-icon">
                                            {data.icon}
                                        </div>
                                        {/* The Link now uses the correct 'link' property from our new data file */}
                                        <h4><Link href={data.link}>{data.title}</Link></h4>
                                        <p>{data.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* The other sections from your original file remain */}
            <CtaArea />    
            <Solution />
            <Testimonial />
        </>
    );
};

export default ServicesMain;