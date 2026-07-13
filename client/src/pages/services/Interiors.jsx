import { Link } from 'react-router-dom';
import usePluginInit from '../../hooks/usePluginInit';

const Interiors = () => {
  usePluginInit();

  const cards = [
    { title: 'Furniture Selection', desc: 'Carefully curated furniture pieces that combine comfort, functionality, and timeless layout.', icon: 'fa-couch', num: '01' },
    { title: 'Color Curation', desc: 'Harmonious combinations of colors, fabrics, textures, and finishes to elevate your interior.', icon: 'fa-palette', num: '02' },
    { title: 'Lighting Setup', desc: 'Thoughtfully selected lighting, fixtures, and accent systems to elevate space vibes.', icon: 'fa-lightbulb', num: '03' },
    { title: 'Space Layouts', desc: 'Strategic furniture layouts that maximize flow, comfort, and walking spaces throughout.', icon: 'fa-ruler-combined', num: '04' },
    { title: 'Art & Decor Curation', desc: 'Rugs, custom artwork, framing, and decorative accents that complete the premium feel.', icon: 'fa-image', num: '05' },
    { title: 'Final Styling', desc: 'On-site staging, layout arrangement, and detail styling before the official client reveal.', icon: 'fa-gem', num: '06' },
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
              <h1 className="mb-3 wow fadeInUp" data-wow-delay=".2s">Interiors</h1>
              <ul className="crumb wow fadeInUp">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li className="active">Interiors</li>
              </ul>
            </div>
            <div className="col-md-4">
              <p className="mb-0 wow fadeInRight" data-wow-delay=".2s">
                We create inspiring interiors that combine comfort, functionality, and timeless design. Every space is thoughtfully tailored to reflect your lifestyle.
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
              <h2 className="wow fadeInUp" data-wow-delay=".4s">Create Beautiful Spaces with Premium Interior Design</h2>
              <p className="wow fadeInUp" data-wow-delay=".6s">
                Selecting furniture and decorative elements can be overwhelming. Our Interiors service simplifies the process by helping you choose layouts, materials, and pieces that perfectly complement your lifestyle, architectural structure, and functional goals. We curate every detail to ensure your space feels cohesive, elegant, and uniquely yours.
              </p>
            </div>

            <div className="col-lg-5">
              <div className="bg-dark text-light p-5 rounded-1 wow fadeInUp" data-wow-delay=".8s" style={{ border: '1px solid rgba(175, 155, 130, 0.25)' }}>
                <h3 className="mb-3 text-white">Service Highlights</h3>
                <ul className="list-unstyled">
                  {['Personalized furniture sourcing', 'Bespoke styling & decor curation', 'High-end color and material selection', 'Aesthetic space planning consultation', 'Budget-conscious premium recommendations', 'Direct vendor & artisan coordination'].map((item, idx) => (
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
                <h2 className="wow fadeInUp" data-wow-delay=".2s">Comprehensive Design Solutions</h2>
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
              { img: '/images/projects-wide/2.webp', title: 'Luxury Penthouse Curation' },
              { img: '/images/projects-wide/3.webp', title: 'Modern Kitchen Layout' },
              { img: '/images/projects-wide/1.webp', title: 'Corporate Lounge Fit-Out' }
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

export default Interiors;

