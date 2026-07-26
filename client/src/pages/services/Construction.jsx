import { Link } from 'react-router-dom';
import usePluginInit from '../../hooks/usePluginInit';

const Construction = () => {
  usePluginInit();

  const cards = [
    { title: 'Excavation & Foundations', desc: 'Site preparation, safety drilling, grading, concrete pouring, and high-load seismic reinforcement.', icon: 'fa-digging', num: '01' },
    { title: 'Concrete & Steel Framing', desc: 'Structural pillar development, heavy load framing, double-wall setups, and floor slabs installation.', icon: 'fa-building', num: '02' },
    { title: 'Plumbing & Drainage Infrastructure', desc: 'Complete MEP layout implementation, high-pressure water systems, and piping works.', icon: 'fa-faucet', num: '03' },
    { title: 'Electrical & Smart Cabling', desc: 'High-voltage wiring, switchgear installation, smart utility wiring, and HVAC ducting setup.', icon: 'fa-bolt', num: '04' },
    { title: 'Exterior Cladding & Walls', desc: 'High-end masonry, plastering, premium brick cladding, thermal insulation, and external paintwork.', icon: 'fa-trowel-bricks', num: '05' },
    { title: 'Turnkey Handover & Audits', desc: 'Final routine safety audits, professional builders cleaning, code compliance checks, and key handover.', icon: 'fa-key', num: '06' },
  ];

  const whyChoose = [
    { title: 'Personalized Design Approach', desc: 'We tailor every concept to match your lifestyle, tastes, and daily needs.' },
    { title: 'Experienced Design Team', desc: 'Our creative designers combine spatial layouts with beautiful styling.' },
    { title: 'Premium Quality Standards', desc: 'Meticulous attention to detail and curated high-quality materials.' },
    { title: 'Realistic 3D Visualisations', desc: 'Stunning 3D renderings so you see your space before starting execution.' },
    { title: 'Detailed Technical Drawings', desc: 'Precise blueprints to ensure flawless and accurate execution on site.' },
    { title: 'Transparent Process', desc: 'Clear communication, material budgeting, and step-by-step milestones.' },
    { title: 'End-to-End Project Support', desc: 'Coordination and supervision throughout the entire project lifecycle.' },
    { title: 'Timely Project Delivery', desc: 'Efficient project management to complete execution on schedule.' }
  ];

  return (
    <main>
      <a href="#" id="back-to-top"></a>

      {/* Page Header */}
      <section className="bg-dark text-light relative jarallax">
        <img src="/images/background/luxury_architectural_hero.png" className="jarallax-img" alt="Construction & Engineering" />
        <div className="container relative z-2">
          <div className="row gy-4 gx-5 align-items-center">
            <div className="col-md-8">
              <div className="spacer-double sm-hide"></div>
              <h1 className="mb-3 wow fadeInUp" data-wow-delay=".2s">Construction</h1>
              <ul className="crumb wow fadeInUp">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li className="active">Construction</li>
              </ul>
            </div>
            <div className="col-md-4">
              <p className="mb-0 wow fadeInRight" data-wow-delay=".2s">
                We provide high-end general and luxury construction services, building properties that stand for quality, safety, and longevity.
              </p>
            </div>
          </div>
        </div>
        <div className="gradient-edge-bottom h-50 op-6"></div>
        <div className="sw-overlay op-5"></div>
      </section>

      {/* Overview Section */}
      <section className="px-md-5 px-lg-5">
        <div className="container">
          <div className="row g-4 justify-content-between align-items-center">
            <div className="col-lg-6">
              <div className="subtitle wow fadeInUp" data-wow-delay=".2s">What We Do</div>
              <h2 className="wow fadeInUp" data-wow-delay=".4s">High-End Residential & Commercial Construction</h2>
              <p className="wow fadeInUp" data-wow-delay=".6s">
                Our general construction services ensure that every phase of your build—from structural concrete columns to premium exterior plastering—is executed with structural perfection. We deploy certified site supervisors, audit building materials, and follow global safety protocols to turn architectural blueprints into a physical reality.
              </p>
            </div>

            <div className="col-lg-5">
              <div className="text-light p-5 rounded-1 wow fadeInUp service-highlight-box" data-wow-delay=".8s" style={{ backgroundColor: '#C3AF9B', border: '1px solid rgba(255, 255, 255, 0.25)', boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)' }}>
                <h3 className="mb-4 text-white" style={{ fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Service Highlights</h3>
                <ul className="list-unstyled mb-0">
                  {['Luxury villa building expertise', 'Advanced commercial steel framing', 'Seismic-compliant foundation works', 'Full MEP utility integration plans', 'Routine site security audits', 'Turnkey building handovers'].map((item, idx) => (
                    <li key={idx} className="mb-3 d-flex align-items-center">
                      <i className="fas fa-check-circle me-3" style={{ fontSize: '18px' }}></i>
                      <span style={{ fontWeight: 500, fontSize: '15px' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="bg-light px-md-5 px-lg-5">
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-lg-6">
              <div className="text-center mb-5">
                <div className="subtitle wow fadeInUp" data-wow-delay=".0s">What's Included</div>
                <h2 className="wow fadeInUp" data-wow-delay=".2s">Complete Building Solutions</h2>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {cards.map((card, i) => (
              <div key={i} className="col-md-4 wow fadeInUp" data-wow-delay={`${i * 0.15}s`}>
                <div 
                  className="p-5 rounded-1 h-100 relative overflow-hidden border border-light-subtle shadow-sm transition-all hover-translate-y text-light"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(20, 16, 14, 0.65) 0%, rgba(15, 12, 10, 0.92) 100%), url('/images/services/${(i % 6) + 1}.webp')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="w-70px h-70px rounded-1 text-light fs-32 d-flex align-items-center justify-content-center flex-shrink-0" style={{ backgroundColor: '#C3AF9B', boxShadow: '0 4px 12px rgba(0,0,0,0.25)' }}>
                      <i className={`fa-solid ${card.icon}`} style={{ color: '#ffffff' }}></i>
                    </div>
                    <span className="fs-18 fw-600 text-white" style={{ opacity: 0.8 }}>{card.num}</span>
                  </div>
                  <h3 className="fs-24 mb-3 text-white" style={{ fontWeight: 700 }}>{card.title}</h3>
                  <p className="mb-0 fs-15" style={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.6' }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Showcase (Image Cards) */}
      <section className="pb-5 px-md-5 px-lg-5" style={{ paddingBottom: '90px' }}>
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-lg-6">
              <div className="text-center mb-5">
                <div className="subtitle wow fadeInUp">Showcase</div>
                <h2 className="wow fadeInUp" data-wow-delay=".2s">Visual Design Portfolio</h2>
              </div>
            </div>
          </div>
          <div className="row g-4">
            {[
              { img: '/images/projects-wide/4.webp', title: 'Oceanside Villa Exterior' },
              { img: '/images/projects-wide/5.webp', title: 'Modern Hillside Estate' },
              { img: '/images/projects-wide/6.webp', title: 'High-End Retail Build' }
            ].map((item, idx) => (
              <div key={idx} className="col-md-4 wow scaleIn" data-wow-delay={`${idx * 0.2}s`}>
                <div className="hover relative overflow-hidden rounded-1">
                  <img src={item.img} className="w-100 hover-scale-1-2" alt={item.title} style={{ aspectRatio: '16/10', objectFit: 'cover' }} />
                  <div className="gradient-edge-bottom h-70"></div>
                  <div className="abs z-4 p-4 bottom-0 mb-0 text-light">
                    <h3 className="fs-20 mb-0 font-semibold" style={{ fontSize: '18px' }}>{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose NIVO Concepts Section */}
      <section className="px-md-5 px-lg-5">
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-6">
              <div className="subtitle wow fadeInUp">NIVO Quality</div>
              <h2 className="wow fadeInUp">Why Choose NIVO Concepts?</h2>
            </div>
          </div>
          <div className="row g-4">
            {whyChoose.map((item, idx) => (
              <div key={idx} className="col-md-3 col-sm-6 wow fadeInUp" data-wow-delay={`${idx * 0.1}s`}>
                <div className="p-4 rounded-1 h-100 border border-light-subtle transition-all hover-translate-y" style={{ backgroundColor: 'var(--bg-card)', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                  <div className="w-40px h-40px rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ backgroundColor: 'rgba(195, 175, 155, 0.15)', color: '#C3AF9B' }}>
                    <i className="fa-solid fa-circle-check fs-18"></i>
                  </div>
                  <h3 className="fs-16 mb-2" style={{ fontWeight: 700, color: 'var(--heading-font-color)' }}>{item.title}</h3>
                  <p className="mb-0 fs-13 text-muted" style={{ lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="text-light py-5 relative jarallax">
        <img src="/images/background/2.webp" className="jarallax-img" alt="Design Dream Building" />
        <div className="sw-overlay op-7"></div>
        <div className="container relative z-2 text-center py-4">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="text-white fs-36 mb-3 fw-800">Ready to Start Your Construction Project?</h2>
              <p className="fs-18 mb-4 text-white-50" style={{ maxWidth: '650px', margin: '0 auto 30px auto', lineHeight: '1.7' }}>
                Whether you’re building a custom luxury villa, a commercial development, or starting a renovation, NIVO Concepts is here to bring your vision to life.
              </p>
              <div className="wow fadeInUp" data-wow-delay=".3s">
                <Link to="/contact" className="btn-main" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, padding: '14px 32px' }}>
                  Let’s Build Beautiful Spaces Together
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Construction;

