import { Link } from 'react-router-dom';
import usePluginInit from '../../hooks/usePluginInit';

const ConsultationService = () => {
  usePluginInit();

  const cards = [
    { title: 'Feasibility Studies', desc: 'Analyzing physical site parameters, soil load tests, zoning guidelines, and local permit regulations.', icon: 'fa-chart-area', num: '01' },
    { title: 'Budget & Cost Estimation', desc: 'Detailed bill of quantities (BOQ) drafts, contractor bid reviews, material costs, and margin control.', icon: 'fa-calculator', num: '02' },
    { title: 'Site Assessments', desc: 'On-site structural surveys, evaluation of access coordinates, drainage assessments, and utilities mapping.', icon: 'fa-compass', num: '03' },
    { title: 'Contractor Auditing', desc: 'Managing selection processes, bidding protocols, contracting structures, and milestone verifications.', icon: 'fa-users-cog', num: '04' },
    { title: 'Material Inspections', desc: 'Verifying concrete mix grades, reinforcement steel certifications, timber quality, and wiring safety.', icon: 'fa-shield-halved', num: '05' },
    { title: 'Regulatory Code Checks', desc: 'Ensuring structural works strictly comply with city zoning guidelines, fire safety, and building regulations.', icon: 'fa-gavel', num: '06' },
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
        <img src="/images/background/luxury_interior_hero.png" className="jarallax-img" alt="Consultation Services" />
        <div className="container relative z-2">
          <div className="row gy-4 gx-5 align-items-center">
            <div className="col-md-8">
              <div className="spacer-double sm-hide"></div>
              <h1 className="mb-3 wow fadeInUp" data-wow-delay=".2s">Consultation</h1>
              <ul className="crumb wow fadeInUp">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li className="active">Consultation</li>
              </ul>
            </div>
            <div className="col-md-4">
              <p className="mb-0 wow fadeInRight" data-wow-delay=".2s">
                Our strategic advisory ensures your build is feasible, budget-compliant, structurally sound, and legally approved.
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
              <h2 className="wow fadeInUp" data-wow-delay=".4s">Feasibility, Costing & Quality Advisory</h2>
              <p className="wow fadeInUp" data-wow-delay=".6s">
                Consultation before and during construction prevents costly structural reworks and delays. We act as your project advocates, reviewing materials, structural calculations, and contractor schedules. We inspect site conditions to verify feasibility, coordinate permit filings, and ensure costs align with expectations.
              </p>
            </div>

            <div className="col-lg-5">
              <div className="text-light p-5 rounded-1 wow fadeInUp service-highlight-box" data-wow-delay=".8s" style={{ backgroundColor: '#C3AF9B', border: '1px solid rgba(255, 255, 255, 0.25)', boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)' }}>
                <h3 className="mb-4 text-white" style={{ fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Service Highlights</h3>
                <ul className="list-unstyled mb-0">
                  {['Site feasibility evaluations', 'Detailed construction cost estimations', 'Contractor credentials auditing', 'Quality audits for raw materials', 'Zoning & building code advisory', 'Structural safety reviews'].map((item, idx) => (
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
                <h2 className="wow fadeInUp" data-wow-delay=".2s">Strategic Planning & Advisory</h2>
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
              { img: '/images/projects-wide/1.webp', title: 'Corporate Headquarters Planning' },
              { img: '/images/projects-wide/2.webp', title: 'Feasibility Review Meeting' },
              { img: '/images/projects-wide/3.webp', title: 'On-Site Material Analysis' }
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
        <img src="/images/background/2.webp" className="jarallax-img" alt="Design Dream Consultation" />
        <div className="sw-overlay op-7"></div>
        <div className="container relative z-2 text-center py-4">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="text-white fs-36 mb-3 fw-800">Ready to Book a Professional Consultation?</h2>
              <p className="fs-18 mb-4 text-white-50" style={{ maxWidth: '650px', margin: '0 auto 30px auto', lineHeight: '1.7' }}>
                Whether you need feasibility studies, site assessments, budgeting estimation, or material inspections, NIVO Concepts is here to guide you.
              </p>
              <div className="wow fadeInUp" data-wow-delay=".3s">
                <Link to="/consultation" className="btn-main" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, padding: '14px 32px' }}>
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

export default ConsultationService;

