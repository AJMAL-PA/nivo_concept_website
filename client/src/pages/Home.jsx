import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import usePluginInit from '../hooks/usePluginInit';

const CountUp = ({ to, speed = 2000 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / speed, 1);
            setCount(Math.floor(progress * to));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [to, speed]);

  return <span ref={elementRef}>{count}</span>;
};

const services = [
  { title: 'Interiors', img: '/images/services/4.webp', to: '/services/interiors' },
  { title: 'Construction', img: '/images/services/1.webp', to: '/services/construction' },
  { title: 'Consultation', img: '/images/services/2.webp', to: '/services/consultation-service' },
  { title: 'Architectural Design', img: '/images/services/3.webp', to: '/services/architectural-design' },
];

const projects = [
  { title: 'Luxurious Oceanside Villa Build', img: '/images/projects-wide/4.webp', tags: ['Residential', 'Turnkey Construction', 'Luxury'] },
  { title: 'Contemporary Corporate Headquarters', img: '/images/projects-wide/1.webp', tags: ['Commercial', 'Steel Frame', 'Office Space'] },
  { title: 'Premium Retail Plaza Development', img: '/images/projects-wide/2.webp', tags: ['Commercial', 'Glass Architecture', 'Retail'] },
  { title: 'Modern Hillside Family Estate', img: '/images/projects-wide/5.webp', tags: ['Residential', 'Custom Home', 'Concrete'] },
  { title: 'Turnkey Double-Story Penthouse Fit-Out', img: '/images/projects-wide/3.webp', tags: ['Residential', 'Interior Design', 'Penthouse'] },
  { title: 'High-End Restaurant Design & Build', img: '/images/projects-wide/6.webp', tags: ['Commercial', 'Hospitality', 'Interior'] },
  { title: 'Metropolitan Cultural Center Build', img: '/images/projects-wide/1.webp', tags: ['Commercial', 'Public Space', 'Steel Frame'] },
  { title: 'High-End Eco-Friendly Villa', img: '/images/projects-wide/2.webp', tags: ['Residential', 'Eco-Friendly', 'Luxury'] },
];

const testimonials = [
  { quote: 'They turned our dream villa design into a structural masterpiece. The turnkey construction process was flawless.', author: 'Anna L., Paris', avatar: '/images/testimonial/1.webp' },
  { quote: 'Their construction consultation and architectural planning saved us time and budget. Outstanding professionalism.', author: 'Michael H., Toronto', avatar: '/images/testimonial/2.webp' },
  { quote: 'From the concrete foundations to the premium interior styling, they delivered perfection.', author: 'Nadia R., Dubai', avatar: '/images/testimonial/3.webp' },
  { quote: 'A top-tier team for commercial construction. Our office headquarters looks magnificent.', author: 'Tom S., Los Angeles', avatar: '/images/testimonial/4.webp' },
  { quote: 'Excellent project management and material curation. Highly recommended for custom home building.', author: 'Elise K., Amsterdam', avatar: '/images/testimonial/5.webp' },
  { quote: 'The 3D visualizations matched the final built structure exactly. Truly creative and precise.', author: 'David M., Singapore', avatar: '/images/testimonial/6.webp' },
];

const faqs = [
  { q: 'What construction services do you offer?', a: 'We offer luxury residential construction, commercial builds, architectural design, turnkey interiors, and construction consultation.', id: 'accordion-a1' },
  { q: 'Do you handle architectural planning and engineering?', a: 'Yes, we draft complete architectural blueprints, structural designs, site layouts, and handle building code documentation.', id: 'accordion-a2' },
  { q: 'What is included in your turnkey construction service?', a: 'Our turnkey service covers everything from initial blueprints, excavation, concrete work, MEP installation, to final custom interior fit-out and styling.', id: 'accordion-a3' },
  { q: 'Do you provide cost estimation and budgeting?', a: 'Yes, we provide detailed cost estimation, feasibility assessments, and material budgeting as part of our consultation service.', id: 'accordion-a4' },
  { q: 'How long does a custom villa build take?', a: 'A typical luxury villa build takes 8 to 14 months depending on size, site complexity, and interior styling requirements.', id: 'accordion-a5' },
  { q: 'Are you licensed and insured for commercial builds?', a: 'Yes, we are fully licensed, insured, and certified for both large-scale commercial developments and residential construction.', id: 'accordion-a6' },
  { q: 'Can we provide our own architectural drawings?', a: 'Absolutely. We can collaborate with your external architects to build and execute your projects according to specs.', id: 'accordion-a7' },
  { q: 'How do you ensure construction quality and safety?', a: 'We use premium audited materials, employ certified engineers, and follow strict building codes with routine safety inspections.', id: 'accordion-a8' },
];

const blogs = [
  { title: 'Top considerations when planning luxury villa construction', img: '/images/blog/1.webp', author: 'Amelia Bright', date: '10 Jan 2025', avatar: '/images/testimonial/1.webp', excerpt: 'Discover how site analysis, material choice, and architectural alignment can guarantee success in high-end villa construction...' },
  { title: 'The role of 3D rendering in architectural design pre-construction', img: '/images/blog/2.webp', author: 'Daniel Yuen', date: '22 Feb 2025', avatar: '/images/testimonial/2.webp', excerpt: 'Learn how pre-construction 3D visualization minimizes structural errors and refines spatial layout optimization...' },
  { title: 'Sustainable materials changing modern construction standards', img: '/images/blog/3.webp', author: 'Leona Hart', date: '05 Mar 2025', avatar: '/images/testimonial/3.webp', excerpt: 'Explore the latest trends in eco-friendly building materials, concrete alternatives, and energy-efficient designs...' },
];

const Home = () => {
  usePluginInit();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 900) return; // Skip logic when scrolled past the hero section
      
      const elements = document.querySelectorAll('.swiper-inner');
      const scale = 1 + (scrollY * 0.00065); // Scales more aggressively for a stronger zoom effect
      elements.forEach(el => {
        el.style.transform = `scale(${scale})`;
        el.style.transformOrigin = 'center center';
        // Add a micro-transition to make the zoom buttery smooth on high-refresh-rate screens
        el.style.transition = 'transform 0.15s cubic-bezier(0.1, 0.8, 0.25, 1)';
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once initially to set the correct scale
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main>
      <a href="#" id="back-to-top"></a>


      <style>{`
        @media (min-width: 992px) {
          .hero-indent {
            margin-left: 2% !important;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section id="section-intro" className="section-dark text-light no-top no-bottom position-relative overflow-hidden z-1000">
        <div className="mh-800 relative">
          <div className="abs"></div>
          <div className="abs w-80 abs-middle z-2 w-100">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="text-center">
                    <h1 className="fs-sm-10vw mb-0 wow fadeInLeft">Beyond Walls</h1>
                    <h1 className="fs-sm-10vw mb-4 wow fadeInRight hero-indent" data-wow-delay=".2s">Beyond Expectations</h1>
                  </div>
                </div>
                <div className="col-lg-12">
                  <p className="wow fadeInLeft w-75 mx-auto text-center" data-wow-delay=".4s">We construct premium buildings and design refined interiors that blend luxury with functionality. From architectural planning and engineering to custom interior finishing, we deliver turnkey residential and commercial projects with unmatched quality and precision.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="abs w-100 bottom-0 z-2 pb-4 sm-hide">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="d-flex justify-content-between">
                    <div className="wow fadeInRight" data-wow-delay=".8s">Expert Project Planning</div>
                    <div className="wow fadeInRight" data-wow-delay="1s">Premium Materials & Building</div>
                    <div className="wow fadeInRight" data-wow-delay="1.2s">Turnkey Construction Services</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Swiper Hero */}
          <div className="swiper">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="swiper-inner" data-bgimage="url(/images/slider/1.webp)">
                  <div className="sw-overlay op-5"></div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="swiper-inner" data-bgimage="url(/images/slider/2.webp)">
                  <div className="sw-overlay op-5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="no-top no-bottom" style={{ padding: '180px 0', marginTop: '100px', marginBottom: '100px' }}>
        <div className="container">
          <div className="row g-4 gx-5 justify-content-end align-items-center">
            <div className="col-md-4">
              <div className="relative wow zoomIn overflow-hidden rounded-1">
                <img src="/images/misc/s1.webp" className="w-100 rounded-1 wow scaleIn" alt="" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="subtitle">About Us</div>
              <h2 className="wow fadeInRight" data-wow-delay=".2s">We're committed to turning your vision into reality</h2>
            </div>
            <div className="col-md-3 pe-md-5">
              <p className="wow fadeInRight" data-wow-delay=".4s">We build and design spaces that are structurally sound, architecturally stunning, and custom-tailored to your exact requirements. From private luxury villas to high-rise commercial structures, we execute turnkey projects with safety, speed, and premium craftsmanship.</p>
            </div>
          </div>

          <div className="spacer-double"></div>

          <div className="row g-4 justify-content-center">
            {[
              { value: 1850, label: 'Satisfied Clients' },
              { value: 420, label: 'Projects Completed' },
              { value: 15, label: 'Years of Experience' },
            ].map((stat, i) => (
              <div key={i} className="col-md-4 col-sm-6 text-center">
                <div className="de_count wow fadeInRight" data-wow-delay={`${i * 0.25}s`}>
                  <h3 className="fs-40 mb-0">
                    <span className="timer"><CountUp to={stat.value} speed={1500} /></span>+
                  </h3>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-color-op-1">
        <div className="container">
          <div className="row mb-3 g- align-items-center justify-content-between">
            <div className="col-lg-4 wow fadeIn ps-md-5" data-wow-delay=".2s">
              <div className="subtitle">Our Services</div>
              <h2 className="wow fadeInRight">Construction & Design Solutions</h2>
            </div>
            <div className="col-lg-4">
              <p>We engineer and construct premium buildings alongside sophisticated interior fit-outs. By integrating architectural design, construction supervision, and bespoke finishes, we deliver timeless spaces built to exceed expectations.</p>
            </div>
            <div className="col-lg-4">
              <div className="relative">
                <div className="de-custom-nav d-flex flex-end" data-target="#services-carousel">
                  <div className="d-prev circle"></div>
                  <div className="d-next circle"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row g-4">
            <div className="col-lg-12">
              <div id="services-carousel" className="owl-4-cols-center owl-carousel owl-theme wow fadeIn" data-wow-delay=".2s">
                {services.map((svc, i) => (
                  <div key={i} className="item">
                    <div className="hover">
                      <div className="relative overflow-hidden">
                        <Link to={svc.to} className="d-block hover relative text-light">
                          <img src="/images/misc/up-right-arrow.webp" className="abs w-80px p-20 z-2 top-0 end-0 p-4 hover-op-1" alt="" />
                          <div className="abs z-4 p-4 pb-0 bottom-0 mb-0">
                            <h2 className="fs-40">{svc.title}</h2>
                          </div>
                          <div className="relative overflow-hidden rounded-1 wow scaleIn" data-wow-duration="1.5s">
                            <img src={svc.img} className="w-100 hover-scale-1-2" alt="" />
                          </div>
                          <div className="gradient-edge-bottom h-70"></div>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="text-light jarallax">
        <img src="/images/background/1.webp" className="jarallax-img" alt="" />
        <div className="sw-overlay op-6"></div>
        <div className="container relative z-2">
          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <div className="subtitle">Testimonials</div>
            </div>
            <div className="col-md-7">
              <div className="owl-single-dots owl-carousel owl-theme">
                {testimonials.map((t, i) => (
                  <div key={i} className="item">
                    <span className="d-stars d-block mb-3">
                      {[...Array(5)].map((_, s) => <i key={s} className="icofont-star"></i>)}
                    </span>
                    <h2 className="mb-4">"{t.quote}"</h2>
                    <div className="d-flex align-items-center">
                      <img src={t.avatar} className="w-40px circle me-3" alt={t.author} style={{ objectFit: 'cover' }} />
                      <span><strong>{t.author}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="pb-0 px-md-5 px-lg-5" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="row mb-3 g-4 align-items-center justify-content-between">
            <div className="col-lg-4 wow fadeIn" data-wow-delay=".2s">
              <div className="subtitle">Latest Projects</div>
              <h2 className="mb-2 wow fadeInRight">Thoughtfully Designed Spaces That Inspire</h2>
            </div>
            <div className="col-lg-4">
              <p>Explore a curated selection of our recent interior projects, where each space is thoughtfully designed to balance aesthetics and function while showcasing our attention to detail and timeless design approach.</p>
            </div>
            <div className="col-lg-4">
              <div className="relative">
                <div className="de-custom-nav d-flex flex-end" data-target="#projects-carousel">
                  <div className="d-prev circle"></div>
                  <div className="d-next circle"></div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div id="projects-carousel" className="owl-carousel owl-theme owl-2-cols">
                {projects.map((proj, i) => (
                  <div key={i} className="item">
                    <div className="hover">
                      <div className="relative overflow-hidden">
                        <Link to="/project-single" className="d-block hover relative text-light">
                          <img src="/images/misc/up-right-arrow.webp" className="abs w-80px p-20 z-2 top-0 end-0 p-4 hover-op-1" alt="" />
                          <div className="abs w-50 z-4 p-4 mb-0">
                            <h2 className="fs-36">{proj.title}</h2>
                          </div>
                          <div className="relative overflow-hidden rounded-1 wow scaleIn" data-wow-duration="1.5s">
                            <img src={proj.img} className="w-100 hover-scale-1-2" alt="" style={{ aspectRatio: '16/10', objectFit: 'cover' }} />
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
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="pt-0 px-md-5 px-lg-5">
        <div className="container">
          <div className="row justify-content-center">
            {[
              { icon: 'fa-comments', title: 'Consultation', text: 'We discuss your needs, style, and goals to understand your vision and space requirements clearly.', delay: '.3s' },
              { icon: 'fa-pencil-ruler', title: 'Concept Design', text: 'Our team creates detailed concepts, layouts, and mood boards tailored to your lifestyle and taste.', delay: '.6s' },
              { icon: 'fa-tools', title: 'Execution', text: 'We bring the design to life with quality materials, skilled work, and precise project management.', delay: '.9s' },
              { icon: 'fa-home', title: 'Final Reveal', text: 'Your completed space is delivered beautifully finished, ready to enjoy with comfort and style.', delay: '1.2s', last: true },
            ].map((step, i) => (
              <div key={i} className={`col-6 col-md-3 de-step ${!step.last ? 'de-step-arrow' : ''} wow fadeInRight`} data-wow-delay={step.delay}>
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

      {/* Video Section */}
      <section aria-label="section" className="p-0 relative overflow-hidden">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <a className="d-block hover popup-youtube" href="https://www.youtube.com/watch?v=C6rf51uHWJg" data-bottom-top="transform: scale(1);" data-top-bottom="transform: scale(1.5);">
                <div className="relative overflow-hidden">
                  <div className="absolute start-0 w-100 abs-middle fs-36 text-white text-center z-2">
                    <div className="player bg-dark border-0 circle wow scaleIn"><span></span></div>
                  </div>
                  <div className="absolute w-100 h-100 top-0 bg-dark hover-op-05"></div>
                  <img src="/images/background/2.webp" className="w-100" alt="" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pt-0 px-md-5 px-lg-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="border-top-2-black mb-5 pb-5"></div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-4">
              <h2 className="wow fadeInRight">Frequently Asked Questions</h2>
              <p>Still have questions? <Link to="/contact">Contact us</Link> and we'll be happy to help.</p>
            </div>
            <div className="col-lg-8">
              <div className="accordion wow fadeInRight" data-wow-delay=".2s">
                <div className="accordion-section">
                  {faqs.map((faq) => (
                    <div key={faq.id}>
                      <div className="accordion-section-title" data-tab={`#${faq.id}`}>{faq.q}</div>
                      <div className="accordion-section-content" id={faq.id}>{faq.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

