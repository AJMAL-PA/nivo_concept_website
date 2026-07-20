import { Link } from 'react-router-dom';
import usePluginInit from '../hooks/usePluginInit';

const galleryImages = [
  { img: '/images/projects-wide/1.webp', title: 'Contemporary Office Architecture', category: 'Commercial' },
  { img: '/images/projects-wide/2.webp', title: 'Luxury Penthouse Fit-Out', category: 'Interiors' },
  { img: '/images/projects-wide/3.webp', title: 'Scandinavian Styled Kitchen', category: 'Interiors' },
  { img: '/images/projects-wide/4.webp', title: 'Oceanside Villa Exterior', category: 'Residential' },
  { img: '/images/projects-wide/5.webp', title: 'Modern Hillside Estate', category: 'Residential' },
  { img: '/images/projects-wide/6.webp', title: 'Premium Restaurant Fit-Out', category: 'Commercial' },
  { img: '/images/services/1.webp', title: 'Minimalist Master Suite', category: 'Interiors' },
  { img: '/images/services/2.webp', title: 'Glass Office Headquarters', category: 'Commercial' },
  { img: '/images/services/3.webp', title: 'Modern Villa Blueprint Rendering', category: 'Architectural' },
];

const Gallery = () => {
  usePluginInit();

  return (
    <main>
      <a href="#" id="back-to-top"></a>

      {/* Page Header */}
      <section className="bg-dark text-light relative jarallax">
        <img src="/images/background/luxury_interior_hero.png" className="jarallax-img" alt="Gallery" />
        <div className="container relative z-2">
          <div className="row gy-4 gx-5 align-items-center">
            <div className="col-md-8">
              <div className="spacer-double sm-hide"></div>
              <h1 className="mb-3 wow fadeInUp" data-wow-delay=".2s">Gallery</h1>
              <ul className="crumb wow fadeInUp">
                <li><Link to="/">Home</Link></li>
                <li className="active">Gallery</li>
              </ul>
            </div>
            <div className="col-md-4">
              <p className="mb-0 wow fadeInRight" data-wow-delay=".2s">
                Explore a visual showcase of our premium custom constructions, architectural designs, and turnkey interiors.
              </p>
            </div>
          </div>
        </div>
        <div className="gradient-edge-bottom h-50 op-6"></div>
        <div className="sw-overlay op-5"></div>
      </section>

      {/* Gallery Grid */}
      <section className="px-md-5 px-lg-5">
        <div className="container">
          <div className="row g-4">
            {galleryImages.map((item, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div className="hover relative overflow-hidden rounded-1 group">
                  <div className="relative overflow-hidden rounded-1 wow scaleIn" data-wow-delay={`${i * 0.1}s`}>
                    <img src={item.img} className="w-100 hover-scale-1-2 transition-transform duration-500" alt={item.title} />
                    <div className="abs top-0 start-0 w-100 h-100 bg-dark op-0 hover-op-6 transition-all duration-300 d-flex flex-column justify-content-end p-4 text-light z-2">
                      <div className="bg-blur p-2 align-self-start mb-2 text-uppercase fs-11 tracking-wide">{item.category}</div>
                      <h3 className="fs-20 mb-0 font-semibold">{item.title}</h3>
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

export default Gallery;

