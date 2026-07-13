import { Link } from 'react-router-dom';

import usePluginInit from '../hooks/usePluginInit';

const blogs = [
  { title: 'Smart layout planning for better space and comfort', img: '/images/blog/1.webp', author: 'Amelia Bright', date: '10 Jan 2025', avatar: '/images/testimonial/1.webp', excerpt: 'Discover how thoughtful interior layouts can transform small or large spaces into functional, stylish, and comfortable living environments.' },
  { title: 'Choosing materials that elevate modern interiors', img: '/images/blog/2.webp', author: 'Daniel Yuen', date: '22 Feb 2025', avatar: '/images/testimonial/2.webp', excerpt: 'Learn how selecting the right materials can enhance aesthetics, durability, and overall value in contemporary interior design projects.' },
  { title: 'Common mistakes to avoid in home interior design', img: '/images/blog/3.webp', author: 'Leona Hart', date: '05 Mar 2025', avatar: '/images/testimonial/3.webp', excerpt: 'Uncover frequent interior design mistakes and how to avoid them, from poor lighting choices to mismatched furniture and color schemes.' },
  { title: 'How lighting transforms interior spaces', img: '/images/blog/4.webp', author: 'Marcus Wells', date: '18 Apr 2025', avatar: '/images/testimonial/4.webp', excerpt: 'Explore how strategic lighting design can completely change the mood, perception, and functionality of any room.' },
  { title: 'Biophilic design — bringing nature indoors', img: '/images/blog/5.webp', author: 'Sofia Chen', date: '02 May 2025', avatar: '/images/testimonial/5.webp', excerpt: 'Discover how incorporating natural elements into interior design can improve wellbeing, creativity, and overall quality of life.' },
  { title: 'Minimalist living: less is more', img: '/images/blog/6.webp', author: 'Ryan Park', date: '14 Jun 2025', avatar: '/images/testimonial/6.webp', excerpt: 'A guide to embracing minimalist interior design principles to create clean, calm, and purposeful living spaces.' },
];

const Blog = () => {
  usePluginInit();

  return (
    <main>
      <a href="#" id="back-to-top"></a>


      {/* Page Header */}
      <section className="bg-dark text-light relative jarallax">
        <img src="/images/background/interior.jpeg" className="jarallax-img" alt="" />
        <div className="container relative z-2">
          <div className="row gy-4 gx-5 align-items-center">
            <div className="col-md-8">
              <div className="spacer-double sm-hide"></div>
              <h1 className="mb-3 wow fadeInUp" data-wow-delay=".2s">Blog</h1>
              <ul className="crumb wow fadeInUp">
                <li><Link to="/">Home</Link></li>
                <li className="active">Blog</li>
              </ul>
            </div>
            <div className="col-md-4">
              <p className="mb-0 wow fadeInRight" data-wow-delay=".2s">
                Discover the latest trends, ideas, and insights in interior design from our studio.
              </p>
            </div>
          </div>
        </div>
        <div className="gradient-edge-bottom h-50 op-6"></div>
        <div className="sw-overlay op-5"></div>
      </section>

      {/* Blog Grid */}
      <section>
        <div className="container">
          <div className="row g-4 gy-5">
            {blogs.map((post, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div className="hover">
                  <div className="relative overflow-hidden rounded-1 wow zoomIn" data-wow-duration="1.5s">
                    <img src={post.img} className="w-100 hover-scale-1-1" alt={post.title} />
                    <Link to="/blog-single" className="d-block abs w-100 h-100 top-0 start-0"></Link>
                  </div>
                  <div className="pt-4">
                    <h3><Link className="text-dark" to="/blog-single">{post.title}</Link></h3>
                    <p className="mb-3">{post.excerpt}</p>
                    <div className="relative">
                      <img src={post.avatar} className="w-20px me-2 circle" alt="" />
                      <div className="d-inline fs-14 me-5">{post.author}</div>
                      <div className="d-inline fs-14"><i className="icofont-ui-calendar id-color me-2"></i><span>{post.date}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;

