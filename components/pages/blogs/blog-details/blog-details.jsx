import Link from 'next/link';

import blogData from '@/components/data/blog-data';
import BlogSidebar from '../blog-sidebar/blog-sidebar';



const BlogSingleMain = ({ singleData }) => {
    // A helper function to format dates nicely for display
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    const category = singleData?.title.split(' ').slice(0, 1).join(' ') + '';
    const blogPost = blogData.slice(0, 3);

    return (
        <div className="blog__details dark__image section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-xl-8 col-lg-8 lg-mb-50">
                        <div className="blog__details-left dark_image">
                            {/* --- DYNAMIC: Featured Image --- */}
                            <img className="img__full" src={singleData.image.src} alt={singleData.title} />
                            
                            <div className="blog__details-left-meta">
                                <div className="blog__details-left-meta-left">
                                    <div className="author">
                                        {/* --- DYNAMIC: Author Image --- */}
                                        <div className="author-avatar">
                                            <img src={singleData.authorImage.src} alt={singleData.author} />
                                        </div>
                                        {/* --- DYNAMIC: Author Name --- */}
                                        <div className="author-info">
                                            <span>Author</span>
                                            <p><strong>{singleData.author}</strong></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="blog__details-left-meta-content">
                                    <span>Date :</span>
                                    {/* --- DYNAMIC: Publish Date --- */}
                                    <p><strong>{formatDate(singleData.datePublished)}</strong></p>
                                </div>
                                <div className="blog__details-left-meta-content">
                                    <span>Category</span>
                                <p>    <strong>{category}</strong></p>
                                </div>
                            </div>
                      

                            {/* --- DYNAMIC: Main Content (renders HTML for links, etc.) --- */}
                            <div dangerouslySetInnerHTML={{ __html: singleData.content }} />

                            <div className="blog__details-left-tag">
                                <h3>Related Tags :</h3>
                                <div className="all__sidebar-item-tag">
                                    <ul>
                                        {blogPost.map((data, id) => (
                                            <li key={id}><Link href={`/blog/${data.id}`}>{data.title.split(' ').slice(0, 1).join(' ')}</Link></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            
                        

                            {/* --- DYNAMIC: Manual Comments Section --- */}
                            {singleData.comments && singleData.comments.length > 0 && (
                                <div className="blog__details-left-comment mt-60">
                                    <h3 className="mb-30">Comments ({singleData.comments.length})</h3>
                                    {singleData.comments.map((comment, index) => (
                                        <div className="blog__details-left-comment-item" key={index}>
                                            <div className="blog__details-left-comment-item-comment">
                                                <div className="blog__details-left-comment-item-comment-image">
                                                    <img src={comment.avatar.src} alt={comment.author} />
                                                </div>
                                                <div className="blog__details-left-comment-item-comment-content">
                                                    <h3>{comment.author}</h3>
                                                    <span>{formatDate(comment.date)}</span>
                                                    <p>{comment.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* --- STATIC: Post Comment Form (remains unchanged) --- */}
                            <div className="blog__details-left-contact mt-60">
                                <h3>Post Comment</h3>
                                <p className="mb-30">Your email address will not be published. Required fields are marked.</p>
                                <div className="blog__details-left-contact-form">
                                    <form action="#">
                                        <div className="row">
                                            <div className="col-sm-6 mb-30">
                                                <div className="blog__details-left-contact-form-item contact-item">
                                                    <input type="text" name="name" placeholder="Full Name" required="required" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 sm-mb-30">
                                                <div className="blog__details-left-contact-form-item contact-item">
                                                    <input type="email" name="email" placeholder="Email Address" required="required" />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 mb-30">
                                                <div className="blog__details-left-contact-form-item contact-item">
                                                    <input type="text" name="subject" placeholder="Subject" required="required" />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 mb-30">
                                                <div className="blog__details-left-contact-form-item contact-item">
                                                    <textarea name="message" placeholder="Type your comments...."></textarea>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="blog__details-left-contact-form-item">
                                                    <button className="btn-one" type="submit">Submit Comment</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4">
                        <BlogSidebar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogSingleMain;