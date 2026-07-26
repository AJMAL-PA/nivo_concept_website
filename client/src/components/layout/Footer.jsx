import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <style>{`
        footer.nivo-footer {
          background-color: var(--footer-bg, #C3AF9B) !important;
          color: var(--footer-text, #231f1d) !important;
          padding: 80px 24px 0 24px !important;
          font-family: 'Roboto Flex', sans-serif !important;
          transition: background-color 0.3s ease, color 0.3s ease !important;
        }
        @media (min-width: 768px) {
          footer.nivo-footer {
            padding: 80px 48px 0 48px !important;
          }
        }
        @media (min-width: 1200px) {
          footer.nivo-footer {
            padding: 80px 80px 0 80px !important;
          }
        }
        footer.nivo-footer h2,
        footer.nivo-footer h3,
        footer.nivo-footer .hs-5 {
          color: var(--footer-heading, #1a1615) !important;
          font-weight: 700 !important;
          font-size: 16px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          margin-bottom: 20px !important;
          margin-top: 0 !important;
        }
        footer.nivo-footer a {
          color: var(--footer-text, rgba(26, 22, 21, 0.8)) !important;
          text-decoration: none !important;
          transition: color 0.25s ease !important;
          font-size: 14px !important;
        }
        footer.nivo-footer a:hover {
          color: #000000 !important;
        }
        [data-theme="dark"] footer.nivo-footer a:hover {
          color: #ffffff !important;
        }
        footer.nivo-footer .footer-tagline {
          color: var(--footer-heading, #ffffff) !important;
          opacity: 0.9;
          font-weight: 500;
        }
        footer.nivo-footer .footer-contact-icon {
          color: var(--footer-heading, #1a1615) !important;
          width: 14px;
        }
        footer.nivo-footer .widget {
          margin-bottom: 30px !important;
        }
        footer.nivo-footer .widget ul {
          list-style: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        footer.nivo-footer .widget ul li {
          padding: 0 !important;
          margin-bottom: 10px !important;
          line-height: 1.5 !important;
        }
        footer.nivo-footer .widget ul li::before {
          content: none !important;
        }
        
        /* Subscribe Input Styling */
        footer.nivo-footer .subscribe-input-wrap {
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(26, 22, 21, 0.4);
          padding-bottom: 6px;
          margin-top: 15px;
          margin-bottom: 15px;
          max-width: 240px;
        }
        footer.nivo-footer .subscribe-input-wrap i {
          color: var(--footer-heading, #1a1615) !important;
        }
        footer.nivo-footer .subscribe-input-wrap input {
          background: transparent !important;
          border: none !important;
          outline: none !important;
          width: 100% !important;
          color: var(--footer-heading, #1a1615) !important;
          font-size: 14px !important;
          padding: 0 0 0 8px !important;
        }
        footer.nivo-footer .subscribe-input-wrap input::placeholder {
          color: rgba(26, 22, 21, 0.5) !important;
        }
        footer.nivo-footer .btn-subscribe {
          background: #000000 !important;
          color: #ffffff !important;
          border: none !important;
          border-radius: 4px !important;
          padding: 8px 20px !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          cursor: pointer !important;
          transition: background 0.25s ease, color 0.25s ease !important;
        }
        footer.nivo-footer .btn-subscribe:hover {
          background: #231f1d !important;
        }

        /* Circular Social Icons */
        footer.nivo-footer .social-icons {
          display: flex !important;
          gap: 10px !important;
          margin-top: 20px !important;
          justify-content: flex-start !important;
          padding: 0 !important;
          list-style: none !important;
        }
        footer.nivo-footer .social-icons a {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 36px !important;
          height: 36px !important;
          border-radius: 50% !important;
          background: #000000 !important;
          color: #ffffff !important;
          transition: background 0.25s ease !important;
        }
        footer.nivo-footer .social-icons a:hover {
          background: #231f1d !important;
        }
        footer.nivo-footer .social-icons a i {
          font-size: 14px !important;
          color: #ffffff !important;
          border: none !important;
          margin: 0 !important;
          padding: 0 !important;
          width: auto !important;
          height: auto !important;
          line-height: 1 !important;
          display: inline-block !important;
        }

        /* Subfooter Styling */
        footer.nivo-footer .subfooter {
          background: rgba(0, 0, 0, 0.08) !important;
          border-top: 1px solid rgba(0, 0, 0, 0.1) !important;
          color: var(--footer-text, rgba(26, 22, 21, 0.7)) !important;
          padding: 20px 0 !important;
          margin-top: 40px !important;
          font-size: 13px !important;
          margin-left: -24px !important;
          margin-right: -24px !important;
        }
        @media (min-width: 768px) {
          footer.nivo-footer .subfooter {
            margin-left: -48px !important;
            margin-right: -48px !important;
          }
        }
        @media (min-width: 1200px) {
          footer.nivo-footer .subfooter {
            margin-left: -80px !important;
            margin-right: -80px !important;
          }
        }
        footer.nivo-footer .subfooter-links a {
          font-size: 13px !important;
          color: var(--footer-text, rgba(26, 22, 21, 0.75)) !important;
          text-decoration: none !important;
          margin: 0 4px !important;
        }
        footer.nivo-footer .subfooter-links a:hover {
          color: #000000 !important;
        }
        [data-theme="dark"] footer.nivo-footer .subfooter-links a:hover {
          color: #ffffff !important;
        }
        footer.nivo-footer .footer-logo-img {
          filter: brightness(0);
        }
        [data-theme="dark"] footer.nivo-footer .footer-logo-img {
          filter: brightness(0) invert(1) !important;
        }

        @media (max-width: 767px) {
          footer.nivo-footer {
            text-align: center !important;
          }
          footer.nivo-footer .footer-logo-img {
            margin: 0 auto 24px auto !important;
          }
          footer.nivo-footer .subscribe-input-wrap {
            margin: 0 auto 16px auto !important;
            max-width: 320px;
          }
          footer.nivo-footer .btn-subscribe {
            margin: 0 auto !important;
            display: block !important;
          }
          footer.nivo-footer .social-icons {
            justify-content: center !important;
            display: flex !important;
            gap: 12px !important;
            margin-top: 15px !important;
          }
          footer.nivo-footer .social-icons a {
            float: none !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          footer.nivo-footer ul {
            padding: 0 !important;
            list-style: none !important;
          }
          footer.nivo-footer ul li {
            justify-content: center !important;
          }
        }
      `}</style>

      {/* footer begin */}
      <footer className="text-light nivo-footer px-md-5 px-lg-5">
        <div className="container">
          <div className="row g-4 justify-content-between">
            
            {/* Column 1: Logo & Subscribe */}
            <div className="col-lg-3 col-md-6">
              <div className="widget">
                <img src="/images/nivo_concepts_logo.png" className="mb-4 footer-logo-img" alt="Nivo Concepts" style={{ height: '80px', width: 'auto', objectFit: 'contain', display: 'block', opacity: 1 }} />
                
                <h2 className="hs-5">Subscribe Now</h2>
                <div className="subscribe-input-wrap">
                  <i className="fa fa-envelope"></i>
                  <input type="email" placeholder="Enter your Email" />
                </div>
                <button className="btn-subscribe">Subscribe</button>
              </div>
            </div>

            {/* Column 2: Information */}
            <div className="col-lg-2 col-md-6">
              <div className="widget">
                <h2 className="hs-5">Information</h2>
                <ul>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/testimonials">Testimonials</Link></li>
                  <li><Link to="/faq">FAQ</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>
            </div>

            {/* Column 3: Helpful Links */}
            <div className="col-lg-2 col-md-6">
              <div className="widget">
                <h2 className="hs-5">Helpful Links</h2>
                <ul>
                  <li><Link to="/projects">Projects</Link></li>
                  <li><Link to="/gallery">Gallery</Link></li>
                  <li><Link to="/contact">Contact Us</Link></li>
                  <li><Link to="/terms">Terms & Condition</Link></li>
                  <li><Link to="/privacy">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>

            {/* Column 4: Our Services */}
            <div className="col-lg-2 col-md-6">
              <div className="widget">
                <h2 className="hs-5">Our Services</h2>
                <ul>
                  <li><Link to="/services/interiors">Interiors</Link></li>
                  <li><Link to="/services/construction">Construction</Link></li>
                  <li><Link to="/services/consultation-service">Consultation</Link></li>
                  <li><Link to="/services/architectural-design">Architectural Design</Link></li>
                </ul>
              </div>
            </div>

            {/* Column 5: Contact Us */}
            <div className="col-lg-3 col-md-6">
              <div className="widget">
                <h2 className="hs-5">Contact Us</h2>
                <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '14px' }}>
                    <i className="fa fa-phone footer-contact-icon"></i>
                    <span>+91 94007 88258</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontSize: '14px' }}>
                    <i className="fa fa-envelope footer-contact-icon"></i>
                    <span>nivoconcepts@gmail.com</span>
                  </li>
                </ul>

                {/* Social Icons */}
                <div className="social-icons">
                  <a href="https://www.facebook.com/share/1M5sLgUxx1/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook-f"></i></a>
                  {/* <a href="#"><i className="fa-brands fa-x-twitter"></i></a> */}
                  <a href="https://www.instagram.com/nivo.concepts?igsh=aTEzMHBmNjMxcTJj&utm_source=qr" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
                  {/* <a href="#"><i className="fa-brands fa-youtube"></i></a> */}
                  <a href="https://wa.me/919400788258" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-whatsapp"></i></a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Subfooter */}
        <div className="subfooter">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                2026 &copy; Nivo Concepts. All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* footer close */}
    </>
  );
};

export default Footer;

