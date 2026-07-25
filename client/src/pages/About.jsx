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

const team = [
  { name: 'Lazim', role: 'CEO & Founder', img: '/images/team/lazim.jpg' },
  { name: 'Sinan Ali', role: 'Managing Partner & Chief Consultant', img: '/images/team/sinan.jpg' },
  { name: 'Badaru Zaman', role: 'Chief Designer (Architect)', img: '/images/team/badaru.jpg' },
  { name: 'Athira', role: 'Admin', img: '/images/team/athira.jpg' },
  { name: 'Lamiya', role: 'Permission Drawing', img: '/images/team/lamiya.jpg' },
  { name: 'Fasna', role: '3D Visualizer', img: '/images/team/fasna.jpg' },
  { name: 'Harshina', role: '3D Visualizer', img: '/images/team/harshina.jpg' },
  { name: 'Abin', role: '3D Visualizer', img: '/images/team/abin.jpg' },
  { name: 'Aishwarya', role: '2D Draftsperson', img: '/images/team/aishwarya.jpg' },
  { name: 'Ufaida', role: '3D Visualizer', img: '/images/team/ufaida.jpg' },
  { name: 'Sreejish', role: 'Project Manager', img: '/images/team/sreejish.jpg' },
  { name: 'Sameer', role: 'Detail Drawing', img: '/images/team/sameer.jpg' },
];

const testimonials = [
  {
    quote: 'Extremely happy with the redesign of my residence by NIVO Concepts. The team truly understood my requirements and transformed my home beautifully. Their attention to detail, creativity, and professionalism were impressive throughout the process.',
    author: 'sufiyan pt'
  },
  {
    quote: 'Working with NIVO Concepts has been an outstanding experience. Their design team brings exceptional creativity, clarity, and precision to every project. Detailing and drawings provided by NIVO are always well-structured and practical, making execution smooth. They are one of the most reliable design partners we have worked with.',
    author: 'Muhammed Unais'
  },
  {
    quote: 'One of the best architecture firms in Calicut! We approached them for designing our dream home, and the experience was amazing. Their team is highly professional, and their PMC support made the entire process stress-free. Highly recommended for quality work!',
    author: 'sagar sivan'
  },
  {
    quote: 'NIVO gave us a stunning modern front elevation and made sure the interiors matched our vibe. Very happy with the final output. They are known for beautiful home designs in Kerala for a reason.',
    author: 'mhd shahil'
  },
  {
    quote: 'Best architecture firm in Calicut! NIVO CONCEPTS designed our home just the way we imagined. Clean layout, beautiful interiors, and smart planning. The team was very helpful from start to finish. Highly recommend for anyone looking for custom home design in Kerala.',
    author: 'Sinan TM'
  }
];

const About = () => {
  usePluginInit();

  useEffect(() => {
    const $ = window.jQuery;
    let timer;
    if ($ && $.fn.owlCarousel) {
      timer = setTimeout(() => {
        const $carousel = $('#team-carousel');
        if ($carousel.length) {
          if ($carousel.data('owl.carousel')) {
            $carousel.owlCarousel('destroy');
          }
          $carousel.owlCarousel({
            center: false,
            loop: true,
            margin: 30,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 4000,
            autoplayHoverPause: true,
            smartSpeed: 800,
            responsive: {
              1000: { items: 2 },
              600: { items: 2 },
              0: { items: 1 }
            }
          }).trigger('play.owl.autoplay', [4000]);

          // Bind custom navigation controls
          $('.de-custom-nav[data-target="#team-carousel"]').each(function () {
            const target = $($(this).data('target'));
            $(this).find('.d-next').off('click').on('click', function () {
              target.trigger('next.owl.carousel');
            });
            $(this).find('.d-prev').off('click').on('click', function () {
              target.trigger('prev.owl.carousel');
            });
          });
        }
      }, 150);
    }

    return () => {
      clearTimeout(timer);
      const $ = window.jQuery;
      if ($ && $.fn.owlCarousel) {
        const $carousel = $('#team-carousel');
        if ($carousel.length && $carousel.data('owl.carousel')) {
          $carousel.owlCarousel('destroy');
        }
      }
    };
  }, []);

  return (
    <main>
      <a href="#" id="back-to-top"></a>


      {/* Page Header */}
      <section className="bg-dark text-light relative jarallax">
        <img src="/images/background/2.webp" className="jarallax-img" alt="" />
        <div className="container relative z-2">
          <div className="row gy-4 gx-5 align-items-center">
            <div className="col-md-8">
              <div className="spacer-double sm-hide"></div>
              <h1 className="mb-3 wow fadeInUp" data-wow-delay=".2s">About Us</h1>
              <ul className="crumb wow fadeInUp">
                <li><Link to="/">Home</Link></li>
                <li className="active">About Us</li>
              </ul>
            </div>
            <div className="col-md-4">
              <p className="mb-0 wow fadeInRight" data-wow-delay=".2s">
                We construct premium buildings and design refined interiors that blend structural strength with elegance. Every project is meticulously executed to exceed modern standards.
              </p>
            </div>
          </div>
        </div>
        <div className="gradient-edge-bottom h-50 op-6"></div>
        <div className="sw-overlay op-5"></div>
      </section>

      {/* About Content */}
      <section className="px-md-5 px-lg-5">
        <div className="container">
          <div className="row g-4 gx-5 justify-content-end align-items-center">
            <div className="col-md-6">
              <div className="relative wow zoomIn overflow-hidden rounded-1">
                <img src="/images/misc/s1.webp" className="w-100 rounded-1 wow scaleIn" alt="" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="subtitle">About Us</div>
              <h2 className="wow fadeInRight" data-wow-delay=".2s">We're committed to turning your vision into reality</h2>
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

      {/* Testimonials */}
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
                    <h2 className="mb-4 wow fadeInUp">{t.quote}</h2>
                    <span className="wow fadeInUp">{t.author}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-md-5 px-lg-5">
        <div className="container">
          <div className="row mb-3 g-4 gx-5 align-items-center justify-content-between">
            <div className="col-lg-4 wow fadeIn" data-wow-delay=".2s">
              <div className="subtitle">Our Team</div>
              <h2 className="wow fadeInRight">Meet the Experts Behind Our Work</h2>
            </div>
            <div className="col-lg-4">
              <p>Our structural engineers, architects, and design specialists collaborate to deliver world-class properties built with structural integrity and custom aesthetic appeal.</p>
            </div>
            <div className="col-lg-4">
              <div className="de-custom-nav d-flex flex-end" data-target="#team-carousel">
                <div className="d-prev circle"></div>
                <div className="d-next circle"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row g-4">
            <div className="col-lg-12">
              <div id="team-carousel" className="owl-carousel owl-theme wow fadeIn" data-wow-delay=".2s">
                {team.map((member, i) => (
                  <div key={i} className="item">
                    <div className="bg-light rounded-1 overflow-hidden">
                      <div className="row g-0 align-items-center">
                        <div className="col-sm-6">
                          <img 
                            src={member.img} 
                            style={{ height: '280px', objectFit: 'contain', objectPosition: 'center', width: '100%', display: 'block' }} 
                            alt={member.name} 
                          />
                        </div>
                        <div className="col-sm-6">
                          <div className="p-3 text-center">
                            <h3 className="mb-0">{member.name}</h3>
                            <p className="mb-2">{member.role}</p>
                            <div className="social-icons">
                              <a href="#"><i className="bg-hover-2 text-hover-white fa-brands fa-facebook-f"></i></a>
                              <a href="#"><i className="bg-hover-2 text-hover-white fa-brands fa-x-twitter"></i></a>
                              <a href="#"><i className="bg-hover-2 text-hover-white fa-brands fa-instagram"></i></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
