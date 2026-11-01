import Link from 'next/link';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from 'swiper/modules';
import homepageServices from '@/components/data/homepage-services'; // We will use our dedicated data file

const Services = () => {
    const slideControl = {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        speed: 1500,
        autoplay: {
            delay: 5000, // Slightly faster autoplay
            disableOnInteraction: false,
        },
        navigation: {
            addIcons: false,
            nextEl: '.services__two-arrow-next',
            prevEl: '.services__two-arrow-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1400: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        }
    };

    return (
        <div className="services__two section-padding">
            <div className="container">
                <div className="row mb-70 align-items-end">
                    <div className="col-xl-8 col-sm-8 lg-mb-30">
                        <div className="services__two-title sm-t-center">
                            <span className="subtitle-two">Our Solutions</span>
                            <h2>Core Business Services</h2>						
                        </div>
                    </div>
                    <div className="col-xl-4 col-sm-4">
                        <div className="services__two-arrow t-right sm-t-center">
                            <div className="services__two-arrow-prev mr-10"><i className="fal fa-long-arrow-left"></i></div>
                            <div className="services__two-arrow-next"><i className="fal fa-long-arrow-right"></i></div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        {/* We now map directly over our dedicated homepageServices data */}
                        <Swiper modules={[Autoplay, Navigation]} {...slideControl}>
                            {homepageServices?.map((data) => (                    
                                <SwiperSlide key={data.id}>
                                    <div className="services__two-item" style={{backgroundImage: `url(${data.image})`}}>
                                        <div className="services__two-item-content">
                                            <div className="services__two-item-content-icon">
                                                {data.icon}
                                            </div>
                                            <h3><Link href={data.link}>{data.title}</Link></h3>
                                            <p>{data.description}</p>
                                            <Link className="simple-btn-2" href={data.link}>Read More<i className="far fa-chevron-double-right"></i></Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>				
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
