import { Link } from 'react-router-dom';

import usePluginInit from '../hooks/usePluginInit';

const services = [
  { title: 'Interiors', img: '/images/services/1.webp', desc: 'Transform residential and commercial spaces with high-end interior planning and custom styling.' },
  { title: 'Construction Consultation', img: '/images/services/2.webp', desc: 'Maximize site potential, coordinate structural builders, audit quality, and manage design feasibility.' },
  { title: 'Architectural Design', img: '/images/services/3.webp', desc: 'From detailed blueprints to 3D layouts, we design structures built for comfort and longevity.' },
  { title: 'Turnkey Construction', img: '/images/services/4.webp', desc: 'Complete building excavation, structural concrete development, plumbing, MEP, and styling in one package.' },
  { title: 'Space Planning', img: '/images/services/5.webp', desc: 'Optimize structural layout coordinates to maximize space efficiency, ventilation, and flow.' },
  { title: '3D Visualization', img: '/images/services/6.webp', desc: 'View detailed digital renders of structural plans and interior styling concepts before the build begins.' },
];

const Services = () => {
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
              <h1 className="mb-3 wow fadeInUp" data-wow-delay=".2s">Our Services</h1>
              <ul className="crumb wow fadeInUp">
                <li><Link to="/">Home</Link></li>
                <li className="active">Services</li>
              </ul>
            </div>
            <div className="col-md-4">
              <p className="mb-0 wow fadeInRight" data-wow-delay=".2s">
                We offer a comprehensive range of construction, engineering, and interior design services tailored to your vision and premium lifestyle.
              </p>
            </div>
          </div>
        </div>
        <div className="gradient-edge-bottom h-50 op-6"></div>
        <div className="sw-overlay op-5"></div>
      </section>

      {/* Services Grid */}
      <section className="px-md-5 px-lg-5">
        <div className="container">
          <div className="row g-4">
            {services.map((svc, i) => (
              <div key={i} className="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay={`${i * 0.15}s`}>
                <div className="hover">
                  <div className="relative overflow-hidden">
                    <Link to={svc.title === 'Interiors' ? '/services/interiors' : svc.title === 'Construction Consultation' ? '/services/consultation-service' : svc.title === 'Architectural Design' ? '/services/architectural-design' : '/service-single'} className="d-block hover relative text-light">
                      <img src="/images/misc/up-right-arrow.webp" className="abs w-80px p-20 z-2 top-0 end-0 p-4 hover-op-1" alt="" />
                      <div className="abs z-4 p-4 pb-0 bottom-0 mb-0">
                        <h2 className="fs-40">{svc.title}</h2>
                      </div>
                      <div className="relative overflow-hidden rounded-1">
                        <img src={svc.img} className="w-100 hover-scale-1-2" alt={svc.title} />
                      </div>
                      <div className="gradient-edge-bottom h-70"></div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-color-op-1 px-md-5 px-lg-5">
        <div className="container">
          <div className="row justify-content-center">
            {[
              { icon: 'fa-comments', title: 'Planning & Consultation', text: 'We discuss site parameters, budget goals, and architectural requirements to draft feasibility assessments.' },
              { icon: 'fa-pencil-ruler', title: 'Blueprint & Design', text: 'We create architectural concepts, structural blueprints, and detailed 3D design plans.' },
              { icon: 'fa-tools', title: 'Structure & Build', text: 'We execute the structure using premium audited materials and certified structural engineers.' },
              { icon: 'fa-home', title: 'Turnkey Delivery', text: 'Your completed residence or commercial facility is handed over in a ready-to-use condition.', last: true },
            ].map((step, i) => (
              <div key={i} className={`col-6 col-md-3 de-step ${!step.last ? 'de-step-arrow' : ''} wow fadeInRight`} data-wow-delay={`${(i + 1) * 0.3}s`}>
                <div className="de-step-icon">
                  <i className={`fas ${step.icon} fa-2x`}></i>
                </div>
                <h2 className="hs-4">{step.title}</h2>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;

