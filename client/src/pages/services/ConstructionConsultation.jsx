import { Link } from 'react-router-dom';
import usePluginInit from '../../hooks/usePluginInit';

const ConstructionConsultation = () => {
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
              <h1 className="mb-3 wow fadeInUp" data-wow-delay=".2s">Construction Consultation</h1>
              <ul className="crumb wow fadeInUp">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li className="active">Construction Consultation</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="gradient-edge-bottom h-50 op-6"></div>
        <div className="sw-overlay op-5"></div>
      </section>

      {/* Service Content */}
      <section>
        <div className="container">
          <div className="row g-4 gx-5">
            <div className="col-lg-8">
              <img src="/images/services/2.webp" className="w-100 rounded-1 mb-4 wow scaleIn" alt="Construction Consultation" />
              <div className="subtitle">Expert Advisory</div>
              <h2 className="wow fadeInRight" data-wow-delay=".2s">Professional Construction Advisory</h2>
              <p>Maximize the efficiency, quality, and feasibility of your build. Our comprehensive construction consultation service provides strategic planning, site assessment, regulatory compliance advice, and cost estimation to ensure your development project stays on track and within budget.</p>
              <p>We work as your advocate, bridging the gap between architectural vision and actual physical execution. From contractor selection to material sourcing, we evaluate structures, resources, and schedules to guarantee a smooth and optimized construction process.</p>

              <div className="row g-4 mt-2">
                {['Feasibility Studies & Planning', 'Budgeting & Cost Estimation', 'Site Selection & Assessment', 'Contractor Coordination', 'Material Quality Auditing', 'Regulatory Compliance Advisory'].map((item, i) => (
                  <div key={i} className="col-md-6">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-check-circle id-color me-3"></i>
                      <span>{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="bg-light rounded-1 p-4 mb-4">
                <h4>Our Services</h4>
                <ul>
                  <li><Link to="/services/interiors">Interiors</Link></li>
                  <li><Link to="/services/construction-consultation" style={{ fontWeight: '600', color: 'var(--primary-color)' }}>Construction Consultation</Link></li>
                  <li><Link to="/services/architectural-design">Architectural Design</Link></li>
                </ul>
              </div>
              <div className="bg-dark text-light rounded-1 p-4">
                <h4>Need a Consultation?</h4>
                <p>Book a free consultation with our design team today.</p>
                <Link to="/consultation" className="btn-main fx-slide"><span>Free Consultation</span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ConstructionConsultation;

