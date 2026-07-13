import { Link } from 'react-router-dom';

import usePluginInit from '../hooks/usePluginInit';

const ProjectSingle = () => {
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
              <h1 className="mb-3 wow fadeInUp" data-wow-delay=".2s">Project Detail</h1>
              <ul className="crumb wow fadeInUp">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li className="active">Detail</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="gradient-edge-bottom h-50 op-6"></div>
        <div className="sw-overlay op-5"></div>
      </section>

      {/* Project Content */}
      <section className="px-md-5 px-lg-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="row g-3">
                <div className="col-12">
                  <div className="relative overflow-hidden rounded-1 wow scaleIn">
                    <img src="/images/projects-wide/1.webp" className="w-100" alt="Modern Minimalist Living Room" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="relative overflow-hidden rounded-1 wow scaleIn">
                    <img src="/images/projects-wide/2.webp" className="w-100" alt="" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="relative overflow-hidden rounded-1 wow scaleIn">
                    <img src="/images/projects-wide/3.webp" className="w-100" alt="" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="relative overflow-hidden rounded-1 wow scaleIn">
                    <img src="/images/projects-wide/4.webp" className="w-100" alt="" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="relative overflow-hidden rounded-1 wow scaleIn">
                    <img src="/images/projects-wide/5.webp" className="w-100" alt="" />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="subtitle">Project Overview</div>
                <h2 className="wow fadeInRight" data-wow-delay=".2s">Modern Minimalist Living Room</h2>
                <p>This project involved a complete redesign of a 450 sq ft living space in a downtown Manhattan apartment. The client wanted a serene, minimalist environment that maximized natural light while providing a sense of warmth and comfort.</p>
                <p>We selected a neutral palette of warm whites, soft grays, and natural wood tones. Custom-built joinery provided seamless storage solutions while maintaining the clean lines central to the minimalist aesthetic. Carefully curated artwork and textiles added personality without visual clutter.</p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="bg-light rounded-1 p-4 mb-4">
                <h4>Project Details</h4>
                <div className="mb-2"><strong>Client:</strong> Private Residence</div>
                <div className="mb-2"><strong>Location:</strong> New York, NY</div>
                <div className="mb-2"><strong>Area:</strong> 450 sq ft</div>
                <div className="mb-2"><strong>Style:</strong> Contemporary Minimalist</div>
                <div className="mb-2"><strong>Duration:</strong> 8 weeks</div>
                <div className="mb-4"><strong>Year:</strong> 2025</div>
                <div className="d-flex flex-wrap gap-2">
                  {['Living Room', 'Open Space', 'Contemporary', 'Minimalist'].map((tag, i) => (
                    <span key={i} className="bg-blur p-2">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="bg-dark text-light rounded-1 p-4">
                <h4>Start Your Project</h4>
                <p>Ready to transform your space? Get in touch with our team.</p>
                <Link to="/consultation" className="btn-main fx-slide"><span>Free Consultation</span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectSingle;

