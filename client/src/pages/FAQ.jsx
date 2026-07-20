import { Link } from 'react-router-dom';

import usePluginInit from '../hooks/usePluginInit';

const faqs = [
  { q: 'What construction services do you offer?', a: 'We offer luxury residential construction, commercial builds, architectural design, turnkey interiors, and construction consultation.', id: 'faq-a1' },
  { q: 'Do you handle architectural planning and engineering?', a: 'Yes, we draft complete architectural blueprints, structural designs, site layouts, and handle building code documentation.', id: 'faq-a2' },
  { q: 'What is included in your turnkey construction service?', a: 'Our turnkey service covers everything from initial blueprints, excavation, concrete work, MEP installation, to final custom interior fit-out and styling.', id: 'faq-a3' },
  { q: 'Do you provide cost estimation and budgeting?', a: 'Yes, we provide detailed cost estimation, feasibility assessments, and material budgeting as part of our consultation service.', id: 'faq-a4' },
  { q: 'How long does a custom villa build take?', a: 'A typical luxury villa build takes 8 to 14 months depending on size, site complexity, and interior styling requirements.', id: 'faq-a5' },
  { q: 'Are you licensed and insured for commercial builds?', a: 'Yes, we are fully licensed, insured, and certified for both large-scale commercial developments and residential construction.', id: 'faq-a6' },
  { q: 'Can we provide our own architectural drawings?', a: 'Absolutely. We can collaborate with your external architects to build and execute your projects according to specs.', id: 'faq-a7' },
  { q: 'How do you ensure construction quality and safety?', a: 'We use premium audited materials, employ certified engineers, and follow strict building codes with routine safety inspections.', id: 'faq-a8' },
];

const FAQ = () => {
  usePluginInit();

  return (
    <main>
      <a href="#" id="back-to-top"></a>


      {/* Page Header */}
      <section className="bg-dark text-light relative jarallax">
        <img src="/images/background/luxury_interior_hero.png" className="jarallax-img" alt="FAQ" />
        <div className="container relative z-2">
          <div className="row gy-4 gx-5 align-items-center">
            <div className="col-md-8">
              <div className="spacer-double sm-hide"></div>
              <h1 className="mb-3 wow fadeInUp" data-wow-delay=".2s">FAQ</h1>
              <ul className="crumb wow fadeInUp">
                <li><Link to="/">Home</Link></li>
                <li className="active">FAQ</li>
              </ul>
            </div>
            <div className="col-md-4">
              <p className="mb-0 wow fadeInRight" data-wow-delay=".2s">
                Find answers to the most common questions about our structural builds, consulting, and interior services.
              </p>
            </div>
          </div>
        </div>
        <div className="gradient-edge-bottom h-50 op-6"></div>
        <div className="sw-overlay op-5"></div>
      </section>

      {/* FAQ Section */}
      <section>
        <div className="container">
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

export default FAQ;

