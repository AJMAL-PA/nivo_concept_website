import { Link } from 'react-router-dom';

import usePluginInit from '../hooks/usePluginInit';

const testimonials = [
  {
    quote: 'Extremely happy with the redesign of my residence by NIVO Concepts. The team truly understood my requirements and transformed my home beautifully. Their attention to detail, creativity, and professionalism were impressive throughout the process.',
    author: 'sufiyan pt'
  },
  {
    quote: 'Working with NIVO Concepts has been an outstanding experience. Their design team brings exceptional creativity, clarity, and precision to every project. Detailing and drawings provided by NIVO are always well-structured and practical, making execution smooth. They are one of the most reliable design partners we have worked with.',
    author: 'Muhammed Unais'
  },
  {
    quote: 'One of the best architecture firms in Calicut! We approached them for designing our dream home, and the experience was amazing. Their team is highly professional, and their PMC support made the entire process stress-free. Highly recommended for quality work!',
    author: 'sagar sivan'
  },
  {
    quote: 'NIVO gave us a stunning modern front elevation and made sure the interiors matched our vibe. Very happy with the final output. They are known for beautiful home designs in Kerala for a reason.',
    author: 'mhd shahil'
  },
  {
    quote: 'Best architecture firm in Calicut! NIVO CONCEPTS designed our home just the way we imagined. Clean layout, beautiful interiors, and smart planning. The team was very helpful from start to finish. Highly recommend for anyone looking for custom home design in Kerala.',
    author: 'Sinan TM'
  }
];

const Testimonials = () => {
  usePluginInit();

  return (
    <main>
      <a href="#" id="back-to-top"></a>


      {/* Page Header */}
      <section className="bg-dark text-light relative jarallax">
        <img src="/images/background/luxury_interior_hero.png" className="jarallax-img" alt="Testimonials" />
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
              <div key={i} className="col-lg-6 col-md-6 d-flex wow fadeInUp" data-wow-delay={`${i * 0.15}s`}>
                <div className="nivo-testimonial-card" style={{ width: '100%' }}>
                  <div>
                    <span className="d-stars d-block mb-3">
                      {[...Array(5)].map((_, s) => <i key={s} className="icofont-star" style={{ color: '#ffb606' }}></i>)}
                    </span>
                    <p className="mb-4">"{t.quote}"</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center justify-content-center me-3" style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--border-color, rgba(0, 0, 0, 0.05))',
                      border: '1px solid var(--border-color, rgba(0, 0, 0, 0.08))',
                      color: 'var(--primary-color, #C3AF9B)',
                      fontSize: '16px',
                      flexShrink: 0
                    }}>
                      <i className="icofont-user"></i>
                    </div>
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

