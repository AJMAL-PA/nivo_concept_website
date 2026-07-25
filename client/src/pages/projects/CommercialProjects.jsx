import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../../services/api';
import usePluginInit from '../../hooks/usePluginInit';

const CommercialProjects = () => {
  usePluginInit();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCommercial = async () => {
      try {
        const res = await fetchProjects();
        const filtered = (res.data || []).filter(proj => proj.tags && proj.tags[0] === 'Commercial');
        setProjects(filtered);
      } catch (err) {
        console.error(err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    loadCommercial();
  }, []);

  return (
    <main>
      <a href="#" id="back-to-top"></a>

      {/* Page Header */}
      <section className="bg-dark text-light relative jarallax">
        <img src="/images/background/commercial_bg.png" className="jarallax-img" alt="Commercial Projects" />
        <div className="container relative z-2">
          <div className="row gy-4 gx-5 align-items-center">
            <div className="col-md-8">
              <div className="spacer-double sm-hide"></div>
              <h1 className="mb-3 wow fadeInUp" data-wow-delay=".2s">Commercial Projects</h1>
              <ul className="crumb wow fadeInUp">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li className="active">Commercial</li>
              </ul>
            </div>
            <div className="col-md-4">
              <p className="mb-0 wow fadeInRight" data-wow-delay=".2s">
                Explore our portfolio of high-end corporate headquarters, hotels, retail centers, and modern workspaces built with premium quality.
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
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-3">Loading projects...</p>
            </div>
          ) : (
            <div className="row g-4">
              {projects.map((proj, i) => (
                <div key={proj.id || i} className="col-lg-6 wow fadeInUp" data-wow-delay={`${i * 0.15}s`}>
                  <div className="hover">
                    <div className="relative overflow-hidden">
                      <Link to={`/project-single/${proj.id}`} className="d-block hover relative text-light">
                        <img src="/images/misc/up-right-arrow.webp" className="abs w-80px p-20 z-2 top-0 end-0 p-4 hover-op-1" alt="" />
                        <div className="abs w-50 z-4 p-4 mb-0">
                          <h2 className="fs-36">{proj.title}</h2>
                        </div>
                        <div className="relative overflow-hidden rounded-1">
                          <img src={proj.img} className="w-100 hover-scale-1-2" alt={proj.title} style={{ aspectRatio: '16/10', objectFit: 'cover' }} />
                        </div>
                        <div className="gradient-edge-top op-5 h-70"></div>
                        <div className="extra-text abs lh-1 m-4 bottom-0 z-4 d-flex">
                          {proj.tags && proj.tags.map((tag, t) => (
                            <div key={t} className="bg-blur p-2 me-2">{tag}</div>
                          ))}
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default CommercialProjects;

