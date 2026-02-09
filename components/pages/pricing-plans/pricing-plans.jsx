import Link from 'next/link';
import React from 'react';

const PricingPlansMain = () => {
	return (
		<>
		<div className="container">
			{/* Section Title */}
			<div className="row mb-60">
				<div className="col-xl-12">
					<div className="faq-area-title t-center">
						<span className="subtitle-one">Tailored Solutions</span>
						<h2>Get a Personalized Quote for Your Business Setup</h2>
						<p className="mt-20">Every business is unique. Our pricing is based on your specific requirements, including your chosen jurisdiction, business activities, office needs, and visa quotas. <br />Contact us for a free, detailed, and no-obligation proposal.</p>
					</div>
				</div>
			</div>

			{/* Main Content with Key Service Offerings */}
			<div className="row">
				{/* Free Zone Package */}
				<div className="col-xl-4 col-lg-6 col-md-6 xl-mb-30">
					<div className="pricing__area-item">
						<div className="pricing__area-item-title">
							<span className="text-two">Ideal for International Business</span>
							<h3>Free Zone Company</h3>
						</div>
						<div className="pricing__area-item-list">
							<ul>
								<li><i className="fal fa-check"></i>100% Foreign Ownership</li>
								<li><i className="fal fa-check"></i>0% Corporate & Personal Tax</li>
								<li><i className="fal fa-check"></i>Full Repatriation of Profits</li>
								<li><i className="fal fa-check"></i>Wide Range of Business Activities</li>
								<li><i className="fal fa-check"></i>Option for Virtual Office</li>
							</ul>
						</div>
						<Link className="btn-eight" href="/contact">Request a Quote</Link>
					</div>
				</div>

				{/* Mainland Package */}
				<div className="col-xl-4 col-lg-6 col-md-6 md-mb-30">
					<div className="pricing__area-item popular"> {/* Added 'popular' class for emphasis */}
						<div className="pricing__area-item-title">
							<span className="text-two">For UAE Market Access</span>
							<h3>Mainland Company</h3>
						</div>
						<div className="pricing__area-item-list">
							<ul>
								<li><i className="fal fa-check"></i>Trade Anywhere in the UAE</li>
								<li><i className="fal fa-check"></i>Eligible for Government Contracts</li>
								<li><i className="fal fa-check"></i>No Restrictions on Office Location</li>
								<li><i className="fal fa-check"></i>Wider Scope of Activities</li>
								<li><i className="fal fa-check"></i>100% Ownership for Most Activities</li>
							</ul>
						</div>
						<Link className="btn-eight" href="/contact">Request a Quote</Link>
					</div>
				</div>

				{/* Offshore Package */}
				<div className="col-xl-4 col-lg-6 col-md-6">
					<div className="pricing__area-item">
						<div className="pricing__area-item-title">
							<span className="text-two">For Asset Protection & Tax Planning</span>
							<h3>Offshore Company</h3>
						</div>
						<div className="pricing__area-item-list">
							<ul>
								<li><i className="fal fa-check"></i>Complete Confidentiality</li>
								<li><i className="fal fa-check"></i>100% Tax Exemption</li>
								<li><i className="fal fa-check"></i>Global Asset & Property Holding</li>
								<li><i className="fal fa-check"></i>No Office Space Required</li>
								<li><i className="fal fa-check"></i>Ideal for International Investments</li>
							</ul>
						</div>
						<Link className="btn-eight" href="/contact">Request a Quote</Link>
					</div>
				</div>
			</div>
		</div>
		</>
	);
};

export default PricingPlansMain;