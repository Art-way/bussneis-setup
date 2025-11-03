import Link from 'next/link';
import React from 'react';

const BlogItem = ({currentBlogItems}) => {
    return (
        <>
            {currentBlogItems?.map((data) => (
				<div className="col-xl-4 col-lg-6 mb-25" key={data.id}>
					<div className="blog__two-item page">
						<div className="blog__two-item-image">
							{/* Link now points to the correct URL */}
							<Link href={`/blog/${data.id}`}><img src={data.image.src} alt={data.title} /></Link>
							<div className="blog__two-item-image-date">
								<span className="text-three">{data.date}</span>
								<span className="text-five">Mar</span>
							</div>
						</div>
						<div className="blog__two-item-content">
							<div className="blog__two-item-content-meta">
								<ul>
									<li><i className="far fa-user"></i>By Admin</li>
									<li><i className="far fa-comment-dots"></i>Comments ({data.comment})</li>
								</ul>
							</div>
							<h4><Link href={`/blog/${data.id}`}>{data.title}</Link></h4>
							<p>{data.des}</p> {/* Added description for context */}
							<Link className="btn-six" href={`/blog/${data.id}`}>Read More<i className="far fa-chevron-double-right"></i></Link>
						</div>
					</div>
				</div>
            ))}            
        </>
    );
};

export default BlogItem;