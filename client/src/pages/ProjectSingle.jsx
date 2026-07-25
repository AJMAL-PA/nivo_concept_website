import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProjectById, fetchProjects } from '../services/api';
import usePluginInit from '../hooks/usePluginInit';

const fallbackProject = {
  title: 'Modern Minimalist Living Room',
  img: '/images/projects-wide/1.webp',
  description: 'This project involved a complete redesign of a 450 sq ft living space in a downtown Manhattan apartment. The client wanted a serene, minimalist environment that maximized natural light while providing a sense of warmth and comfort. We selected a neutral palette of warm whites, soft grays, and natural wood tones. Custom-built joinery provided seamless storage solutions while maintaining the clean lines central to the minimalist aesthetic. Carefully curated artwork and textiles added personality without visual clutter.',
  client: 'Private Residence',
  location: 'New York, NY',
  area: '450 sq ft',
  style: 'Contemporary Minimalist',
  duration: '8 weeks',
  year: '2025',
  tags: ['Living Room', 'Open Space', 'Contemporary', 'Minimalist'],
  images: ['/images/projects-wide/1.webp', '/images/projects-wide/2.webp', '/images/projects-wide/3.webp', '/images/projects-wide/4.webp', '/images/projects-wide/5.webp']
};

const ProjectSingle = () => {
  usePluginInit();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjectDetail = async () => {
      setLoading(true);
      try {
        if (id) {
          const res = await fetchProjectById(id);
          setProject(res.data);
        } else {
          // If no ID is passed, default to first project from list
          const res = await fetchProjects();
          if (res.data && res.data.length > 0) {
            setProject(res.data[0]);
          } else {
            setProject(fallbackProject);
          }
        }
      } catch (err) {
        console.error(err);
        setProject(fallbackProject);
      } finally {
        setLoading(false);
      }
    };
    getProjectDetail();
  }, [id]);

  if (loading) {
    return (
      <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">Loading project details...</p>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)' }}>
        <div className="text-center">
          <h2>Project Not Found</h2>
          <Link to="/projects" className="btn-main mt-3">Back to Projects</Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <a href="#" id="back-to-top"></a>

      {/* Page Header */}
      <section className="bg-dark text-light relative jarallax">
        <img src={project.img} className="jarallax-img" alt={project.title} />
        <div className="container relative z-2">
          <div className="row gy-4 gx-5 align-items-center">
            <div className="col-md-8">
              <div className="spacer-double sm-hide"></div>
              <h1 className="mb-3 wow fadeInUp" data-wow-delay=".2s">{project.title}</h1>
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
                    <img src={project.img} className="w-100" alt={project.title} style={{ maxHeight: '550px', objectFit: 'cover' }} />
                  </div>
                </div>
                {/* Additional gallery images */}
                {project.images && project.images.map((imgUrl, i) => (
                  <div key={i} className="col-md-6">
                    <div className="relative overflow-hidden rounded-1 wow scaleIn">
                      <img src={imgUrl} className="w-100" alt="" style={{ height: '280px', objectFit: 'cover' }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <div className="subtitle">Project Overview</div>
                <h2 className="wow fadeInRight" data-wow-delay=".2s">{project.title}</h2>
                <p className="fs-15" style={{ whiteSpace: 'pre-wrap' }}>{project.description}</p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="bg-light rounded-1 p-4 mb-4" style={{ borderColor: 'var(--border-color)' }}>
                <h4 className="uppercase font-bold tracking-wider fs-15 mb-3">Project Details</h4>
                {project.client && <div className="mb-2.5 fs-14"><strong>Client:</strong> {project.client}</div>}
                {project.location && <div className="mb-2.5 fs-14"><strong>Location:</strong> {project.location}</div>}
                {project.area && <div className="mb-2.5 fs-14"><strong>Area:</strong> {project.area}</div>}
                {project.style && <div className="mb-2.5 fs-14"><strong>Style:</strong> {project.style}</div>}
                {project.duration && <div className="mb-2.5 fs-14"><strong>Duration:</strong> {project.duration}</div>}
                {project.year && <div className="mb-4 fs-14"><strong>Year:</strong> {project.year}</div>}
                <div className="d-flex flex-wrap gap-2">
                  {project.tags && project.tags.map((tag, i) => (
                    <span key={i} className="bg-blur p-2 fs-11 text-uppercase font-semibold" style={{ color: 'var(--text-main)' }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="bg-dark text-light rounded-1 p-4">
                <h4 className="uppercase font-bold tracking-wider fs-15 mb-2 text-white">Start Your Project</h4>
                <p className="fs-13 text-muted mb-4">Ready to transform your space? Get in touch with our team.</p>
                <Link to="/contact" className="btn-main fx-slide w-100 text-center py-2.5"><span>Get In Touch</span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectSingle;
