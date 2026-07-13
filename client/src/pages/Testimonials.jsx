import { Link } from 'react-router-dom';

import usePluginInit from '../hooks/usePluginInit';

const testimonials = [
  { quote: 'They turned our dream villa design into a structural masterpiece. The turnkey construction process was flawless.', author: 'Anna L., Paris', avatar: '/images/testimonial/1.webp' },
  { quote: 'Their construction consultation and architectural planning saved us time and budget. Outstanding professionalism.', author: 'Michael H., Toronto', avatar: '/images/testimonial/2.webp' },
  { quote: 'From the concrete foundations to the premium interior styling, they delivered perfection.', author: 'Nadia R., Dubai', avatar: '/images/testimonial/3.webp' },
  { quote: 'A top-tier team for commercial construction. Our office headquarters looks magnificent.', author: 'Tom S., Los Angeles', avatar: '/images/testimonial/4.webp' },
  { quote: 'Excellent project management and material curation. Highly recommended for custom home building.', author: 'Elise K., Amsterdam', avatar: '/images/testimonial/5.webp' },
  { quote: 'The 3D visualizations matched the final built structure exactly. Truly creative and precise.', author: 'David M., Singapore', avatar: '/images/testimonial/6.webp' },
];

const Testimonials = () => {
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
              <h1 className="mb-3 wow fadeInUp" data-wow-delay=".2s">Testimonials</h1>
              <ul className="crumb wow fadeInUp">
                <li><Link to="/">Home</Link></li>
                <li className="active">Testimonials</li>
              </ul>
            </div>
            <div className="col-md-4">
              <p className="mb-0 wow fadeInRight" data-wow-delay=".2s">
                Hear what our clients say about their experience working with our custom home building and commercial development team.
              </p>
            </div>
          </div>
        </div>
        <div className="gradient-edge-bottom h-50 op-6"></div>
        <div className="sw-overlay op-5"></div>
      </section>

      {/* Testimonials Grid */}
      <section>
        <div className="container">
          <div className="row g-4">
            {testimonials.map((t, i) => (
              <div key={i} className="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay={`${i * 0.15}s`}>
                <div className="bg-light rounded-1 p-4">
                  <span className="d-stars d-block mb-3">
                    {[...Array(5)].map((_, s) => <i key={s} className="icofont-star"></i>)}
                  </span>
                  <p className="mb-4">"{t.quote}"</p>
                  <div className="d-flex align-items-center">
                    <img src={t.avatar} className="w-40px circle me-3" alt={t.author} />
                    <span><strong>{t.author}</strong></span>
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

export default Testimonials;

