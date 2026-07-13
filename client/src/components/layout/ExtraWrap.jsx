import { Link } from 'react-router-dom';

const ExtraWrap = () => {
  return (
    /* overlay content begin */
    <div id="extra-wrap" className="bg-dark text-light">
      <div id="btn-close">
        <span></span>
        <span></span>
      </div>

      <div id="extra-content">
        <img src="/images/nivo_concepts_logo.png" className="w-150px" alt="Nivo Concepts" />

        <div className="spacer-30-line"></div>

        <h4 className="mb-3">Latest Projects</h4>

        <div className="row g-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="col-lg-6">
              <div className="hover">
                <div className="relative overflow-hidden">
                  <Link to="/project-single" className="d-block hover relative text-light">
                    <img src="/images/misc/up-right-arrow.webp" className="abs w-40 p-4 z-2 top-0 end-0 hover-op-1" alt="" />
                    <div className="relative overflow-hidden rounded-1">
                      <img src={`/images/projects-wide/${n}.webp`} className="w-100 hover-scale-1-2" alt="" />
                    </div>
                    <div className="gradient-edge-top op-5 h-70"></div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="spacer-30-line"></div>

        <h4 className="mb-3">Our Services</h4>
        <ul className="ul-check">
          <li><Link to="/service-single">Furniture &amp; Decor Selection</Link></li>
          <li><Link to="/service-single">Concept Development</Link></li>
          <li><Link to="/service-single">Renovation &amp; Space Planning</Link></li>
          <li><Link to="/service-single">Visual Design Rendering</Link></li>
          <li><Link to="/service-single">Residential Interior Design</Link></li>
          <li><Link to="/service-single">Commercial Interior Design</Link></li>
        </ul>

        <div className="spacer-30-line"></div>

        <h4>Contact Us</h4>
        <div><i className="icofont-clock-time me-2 id-color"></i>Monday - Saturday 08.00 - 18.00</div>
        <div><i className="icofont-location-pin me-2 id-color"></i>100 S Main St, New York</div>
        <div><i className="icofont-envelope me-2 id-color"></i>contact@intrio.com</div>

        <div className="spacer-30-line"></div>

        <h4>About Us</h4>
        <p>Transform your home, office, or commercial space with professional interior design services tailored to your vision and lifestyle.</p>

        <div className="social-icons">
          <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
          <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
          <a href="#"><i className="fa-brands fa-instagram"></i></a>
          <a href="#"><i className="fa-brands fa-youtube"></i></a>
          <a href="#"><i className="fa-brands fa-whatsapp"></i></a>
        </div>
      </div>
    </div>
    /* overlay content end */
  );
};

export default ExtraWrap;
