import { Link } from 'react-router-dom';

import usePluginInit from '../hooks/usePluginInit';

const projects = [
  { title: 'Luxurious Oceanside Villa Build', img: '/images/projects-wide/4.webp', tags: ['Residential', 'Turnkey Construction', 'Luxury'] },
  { title: 'Contemporary Corporate Headquarters', img: '/images/projects-wide/1.webp', tags: ['Commercial', 'Steel Frame', 'Office Space'] },
  { title: 'Premium Retail Plaza Development', img: '/images/projects-wide/2.webp', tags: ['Commercial', 'Glass Architecture', 'Retail'] },
  { title: 'Modern Hillside Family Estate', img: '/images/projects-wide/5.webp', tags: ['Residential', 'Custom Home', 'Concrete'] },
  { title: 'Turnkey Double-Story Penthouse Fit-Out', img: '/images/projects-wide/3.webp', tags: ['Residential', 'Interior Design', 'Penthouse'] },
  { title: 'High-End Restaurant Design & Build', img: '/images/projects-wide/6.webp', tags: ['Commercial', 'Hospitality', 'Interior'] },
];

const Projects = () => {
  usePluginInit();

  return (
    <main>
      <a href="#" id="back-to-top"></a>


      {/* Page Header */}
      <section className="bg-dark text-light relative jarallax">
        <img src="/images/background/commercial_bg.png" className="jarallax-img" alt="Projects" />
        <div className="container relative z-2">
          <div className="row gy-4 gx-5 align-items-center">
            <div className="col-md-8">
              <div className="spacer-double sm-hide"></div>
              <h1 className="mb-3 wow fadeInUp" data-wow-delay=".2s">Projects</h1>
              <ul className="crumb wow fadeInUp">
                <li><Link to="/">Home</Link></li>
                <li className="active">Projects</li>
              </ul>
            </div>
            <div className="col-md-4">
              <p className="mb-0 wow fadeInRight" data-wow-delay=".2s">
                Explore our curated portfolio of premium residential structures, luxury villas, commercial headquarters, and bespoke interior spaces.
              </p>
            </div>
          </div>
        </div>
        <div className="gradient-edge-bottom h-50 op-6"></div>
        <div className="sw-overlay op-5"></div>
      </section>

      {/* Projects Grid */}
      <section className="px-md-5 px-lg-5">
        <div className="container">
          <div className="row g-4">
            {projects.map((proj, i) => (
              <div key={i} className="col-lg-6 wow fadeInUp" data-wow-delay={`${i * 0.15}s`}>
                <div className="hover">
                  <div className="relative overflow-hidden">
                    <Link to="/project-single" className="d-block hover relative text-light">
                      <img src="/images/misc/up-right-arrow.webp" className="abs w-80px p-20 z-2 top-0 end-0 p-4 hover-op-1" alt="" />
                      <div className="abs w-50 z-4 p-4 mb-0">
                        <h2 className="fs-36">{proj.title}</h2>
                      </div>
                      <div className="relative overflow-hidden rounded-1">
                        <img src={proj.img} className="w-100 hover-scale-1-2" alt={proj.title} />
                      </div>
                      <div className="gradient-edge-top op-5 h-70"></div>
                      <div className="extra-text abs lh-1 m-4 bottom-0 z-4 d-flex">
                        {proj.tags.map((tag, t) => (
                          <div key={t} className="bg-blur p-2 me-2">{tag}</div>
                        ))}
                      </div>
                    </Link>
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

export default Projects;

