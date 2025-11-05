import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Navigation} from 'swiper/modules';
import Link from 'next/link';
import bannerBg1 from "../../../../public/assets/img/banner/banner-3.jpg"; // You can replace this with a relevant Dubai/business image
import bannerBg2 from "../../../../public/assets/img/banner/banner-4.jpg"; // You can replace this with another relevant image

const BannerTwo = () => {
	const slideControl = {
		loop: true,
		slidesPerView: 1,
		effect: "fade",
		autoplay: {
			delay: 6000,
			reverseDirection: false,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".banner__two-arrow-next",
			prevEl: ".banner__two-arrow-prev",
		},
	};

  	return (
		<>
			<div className="banner__two swiper banner-two-slider">
			<Swiper modules={[EffectFade, Autoplay, Navigation]} {...slideControl} >
				{/* Slide 1: Primary Welcome & CTA */}
				<SwiperSlide>
					<div className="banner__two-image" style={{backgroundImage: `url(${bannerBg1.src})`}}>
						<div className="container">
							<div className="row">
								<div className="col-xl-12">
									<div className="banner__two-content">
										<b className="subtitle">Business Setup UAE</b>
										<span>Welcome to Your Future</span>
										<h1>Launch Your Dubai Business With Expert Guidance</h1>
										<div className="banner__two-content-button">
											<Link className="btn-five" href="/contact">Get a Free Consultation<i className="far fa-chevron-double-right"></i></Link>
										</div>
										<img className="banner__two-image-shape-one" src="assets/img/shape/banner-1.png" alt="decorative shape" />
									</div>
									<img className="banner__two-image-shape-two" src="assets/img/shape/banner-2.png" alt="decorative shape" />
								</div>
							</div>
						</div>
					</div>
                </SwiperSlide>

                {/* Slide 2: Focus on Trust & Services */}
                <SwiperSlide>
					<div className="banner__two-image" style={{backgroundImage: `url(${bannerBg2.src})`}}>
						<div className="container">
							<div className="row">
								<div className="col-xl-12">
									<div className="banner__two-content">
										<b className="subtitle">Company Formation Specialists</b>
										<span>Streamlined & Compliant</span>
										<h1 role="heading" aria-level="2">Your Trusted Partner for Business Setup in the UAE</h1>
										<div className="banner__two-content-button">
											<Link className="btn-five" href="/services">Explore Our Services<i className="far fa-chevron-double-right"></i></Link>
										</div>
										<img className="banner__two-image-shape-one" src="assets/img/shape/banner-1.png-" alt="decorative shape" />
									</div>
									<img className="banner__two-image-shape-two" src="assets/img/shape/banner-2.png" alt="decorative shape" />
								</div>
							</div>
						</div>
					</div>
                </SwiperSlide>
            </Swiper>
				<div className="banner__two-arrow">
					<div className="banner__two-arrow-prev"><i className="fal fa-long-arrow-left"></i></div>
					<div className="banner__two-arrow-next"><i className="fal fa-long-arrow-right"></i></div>
				</div>		
			</div>
		</>
	);
};

export default BannerTwo;