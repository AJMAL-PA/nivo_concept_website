import { Link } from 'react-router-dom';
import usePluginInit from '../hooks/usePluginInit';

const ServiceSingle = () => {
  usePluginInit();

  const cards = [
    { title: 'Personalized Design Planning', desc: 'Bespoke design blueprints structured to balance room coordinates, budget targets, and spatial flow.', icon: 'fa-pencil-ruler', num: '01' },
    { title: 'Material & Color Styling', desc: 'Curating premium surface textures, wood, marble cladding, custom metals, and interior color schemes.', icon: 'fa-palette', num: '02' },
    { title: 'Premium Sourcing', desc: 'Collaborating with global master builders, artisans, and suppliers to curate high-end fittings.', icon: 'fa-couch', num: '03' },
    { title: 'Smart Coordination', desc: 'Comprehensive schedule supervision, safety audits, builder check-ins, and layout calculations.', icon: 'fa-tasks', num: '04' },
    { title: 'Acoustics & Lighting Curation', desc: 'Strategic positioning of light systems and sound-dampening drywall panels to elevate comfort.', icon: 'fa-lightbulb', num: '05' },
    { title: 'Ready Handover styling', desc: 'Turnkey site staging, furniture styling arrangement, and builders clean before final walkthrough.', icon: 'fa-gem', num: '06' },
  ];

  return (
    <main>
      <a href="#" id="back-to-top"></a>

      {/* Page Header */}
      <section className="bg-dark text-light relative jarallax px-md-5 px-lg-5">
        <img src="/images/background/luxury_interior_hero.png" className="jarallax-img" alt="Service" />
        <div className="container relative z-2">
          <div className="row gy-4 gx-5 align-items-center">
            <div className="col-md-8">
              <div className="spacer-double sm-hide"></div>
              <h1 className="mb-3 wow fadeInUp" data-wow-delay=".2s">Service Detail</h1>
              <ul className="crumb wow fadeInUp">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li className="active">Detail</li>
              </ul>
            </div>
            <div className="col-md-4">
              <p className="mb-0 wow fadeInRight" data-wow-delay=".2s">
                We construct high-end developments and design elegant interiors that blend structural strength with visual warmth.
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
              <h2 className="wow fadeInUp" data-wow-delay=".4s">Bespoke Design, Building & Consultation</h2>
              <p className="wow fadeInUp" data-wow-delay=".6s">
                Our design and engineering process focuses on bringing clean aesthetics and structural safety to residential and commercial projects alike. From structural steel column planning to custom furniture sourcing and styling, our turnkey team manages every phase under strict safety guidelines.
              </p>
            </div>

            <div className="col-lg-5">
              <div className="text-light p-5 rounded-1 wow fadeInUp service-highlight-box" data-wow-delay=".8s" style={{ backgroundColor: '#C3AF9B', border: '1px solid rgba(255, 255, 255, 0.25)', boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)' }}>
                <h3 className="mb-4 text-white" style={{ fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Service Highlights</h3>
                <ul className="list-unstyled mb-0">
                  {['Personalized building blueprints', 'Custom spatial configurations', 'Premium raw material procurement', 'Energy efficiency assessments', 'Site safety inspections', 'Turnkey fit-out & staging'].map((item, idx) => (
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
      <section className="bg-light">
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-lg-6">
              <div className="text-center mb-5">
                <div className="subtitle wow fadeInUp" data-wow-delay=".0s">What's Included</div>
                <h2 className="wow fadeInUp" data-wow-delay=".2s">Turnkey Design & Build Solutions</h2>
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
      <section className="pb-5" style={{ paddingBottom: '90px' }}>
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
              { img: '/images/projects-wide/1.webp', title: 'Premium Concept Fit-Out' },
              { img: '/images/projects-wide/2.webp', title: 'Structural Construction' },
              { img: '/images/projects-wide/3.webp', title: 'Bespoke Finishing works' }
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
    </main>
  );
};

export default ServiceSingle;

