import { Link } from 'react-router-dom';
import usePluginInit from '../../hooks/usePluginInit';

const ArchitecturalDesign = () => {
  usePluginInit();

  const cards = [
    { title: 'Blueprint Drafting', desc: 'Initial floor layouts, elevation cuts, site mapping, and comprehensive engineering drawings.', icon: 'fa-pencil-ruler', num: '01' },
    { title: 'Exterior Elevation Design', desc: 'Designing premium external structures, windows positioning, facades, and brick alignments.', icon: 'fa-home', num: '02' },
    { title: '3D Renderings & Walkthroughs', desc: 'Digital simulations showing exact walk-through views, shadows, textures, and spatial flows.', icon: 'fa-cubes', num: '03' },
    { title: 'Natural Light Analysis', desc: 'Strategic positioning of large windows, skylights, and indoor courtyards to maximize sunlight.', icon: 'fa-sun', num: '04' },
    { title: 'Ventilation Optimization', desc: 'Engineering floor plans to promote natural wind circulation and thermal cooling efficiency.', icon: 'fa-wind', num: '05' },
    { title: 'Zoning & Permit Documentation', desc: 'Drafting all required documents to ensure rapid municipal code approvals and zoning clearance.', icon: 'fa-file-signature', num: '06' },
  ];

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
              <h1 className="mb-3 wow fadeInUp" data-wow-delay=".2s">Architectural Design</h1>
              <ul className="crumb wow fadeInUp">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li className="active">Architectural Design</li>
              </ul>
            </div>
            <div className="col-md-4">
              <p className="mb-0 wow fadeInRight" data-wow-delay=".2s">
                We combine structural engineering with elegant design lines to draft TIMELESS custom villas and commercial spaces.
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
              <h2 className="wow fadeInUp" data-wow-delay=".4s">Bespoke Architectural Concepts & Blueprints</h2>
              <p className="wow fadeInUp" data-wow-delay=".6s">
                Exceptional buildings begin with detailed, high-performance blueprints. Our architectural team drafts comprehensive elevation layouts, floor plans, and structural plans optimized for natural lighting, internal cooling, and spatial efficiency. We combine engineering with modern design principles.
              </p>
            </div>

            <div className="col-lg-5">
              <div className="bg-dark text-light p-5 rounded-1 wow fadeInUp" data-wow-delay=".8s" style={{ border: '1px solid rgba(175, 155, 130, 0.25)' }}>
                <h3 className="mb-3 text-white">Service Highlights</h3>
                <ul className="list-unstyled">
                  {['Custom residential villa designs', 'Commercial structural layouts', 'High-end 3D walkthrough models', 'Energy-efficient floor planning', 'Site integration & elevations', 'Zoning approval documentation'].map((item, idx) => (
                    <li key={idx} className="mb-2 d-flex align-items-center">
                      <i className="fas fa-check-circle id-color me-3"></i>
                      <span>{item}</span>
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
                <h2 className="wow fadeInUp" data-wow-delay=".2s">Complete Design & Blueprint Solutions</h2>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {cards.map((card, i) => (
              <div key={i} className="col-md-4 wow fadeInUp" data-wow-delay={`${i * 0.15}s`}>
                <div className="bg-white p-5 rounded-1 h-100 relative overflow-hidden border border-light-subtle shadow-sm transition-all hover-translate-y">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="w-70px h-70px rounded-1 bg-dark text-light fs-32 d-flex align-items-center justify-content-center">
                      <i className={`fa-solid ${card.icon}`}></i>
                    </div>
                    <span className="fs-18 fw-600 text-muted" style={{ opacity: 0.5 }}>{card.num}</span>
                  </div>
                  <h3 className="fs-24 mb-3">{card.title}</h3>
                  <p className="mb-0 text-muted fs-15" style={{ lineHeight: '1.6' }}>{card.desc}</p>
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
              { img: '/images/projects-wide/4.webp', title: 'Custom Villa Conceptualization' },
              { img: '/images/projects-wide/5.webp', title: 'Modern Facade Elevation' },
              { img: '/images/projects-wide/6.webp', title: 'Steel Frame Headquarters Layout' }
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

export default ArchitecturalDesign;

