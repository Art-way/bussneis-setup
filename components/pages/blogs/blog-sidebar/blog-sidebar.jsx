import blogData from '@/components/data/blog-data';
import Link from 'next/link';

const BlogSidebar = () => {
    // Show the 3 most recent posts in the sidebar
    const recentPosts = blogData.slice(0, 3);
    // Create a list of unique tags from the blog data
    const allTags = blogData.flatMap(post => post.title.split(' '));
    const uniqueTags = [...new Set(allTags)].filter(tag => tag.length > 3).slice(0, 10); // Simple tag generation

    return (
        <div className="all__sidebar ml-25 xl-ml-0">
            <div className="all__sidebar-item">
                <h4>Search</h4>
                <div className="all__sidebar-item-search">
                    <form action="#">
                        <input type="text" placeholder="Search blog..." />
                        <button type="submit"><i className="fal fa-search"></i></button>
                    </form>
                </div>
            </div>
            <div className="all__sidebar-item">
                <h4>Recent Posts</h4>
                <div className="all__sidebar-item-post">
                    {recentPosts.map((data) => (
                        <div className="post__item" key={data.id}>
                            <div className="post__item-image">
                                <Link href={`/blog/${data.id}`}><img src={data.image.src} alt={data.title} /></Link>
                            </div>
                            <div className="post__item-title">
                                <h6><Link href={`/blog/${data.id}`}>{data.title}</Link></h6>
                                <span><i className="far fa-calendar-alt"></i>Mar {data.date}, 2024</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="all__sidebar-item">
                <h4>Popular Tags</h4>
                <div className="all__sidebar-item-tag">
                    <ul>
                        {/* Displaying some generated tags */}
                        <li><Link href="/blog">Business Setup</Link></li>
                        <li><Link href="/blog">Dubai</Link></li>
                        <li><Link href="/blog">Free Zone</Link></li>
                        <li><Link href="/blog">Mainland</Link></li>
                        <li><Link href="/blog">Visa</Link></li>
                        <li><Link href="/blog">Tax</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BlogSidebar;