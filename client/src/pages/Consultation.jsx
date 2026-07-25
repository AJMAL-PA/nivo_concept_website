import { useState } from 'react';
import { Link } from 'react-router-dom';

import usePluginInit from '../hooks/usePluginInit';

const Consultation = () => {
  usePluginInit();

  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', service: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.email.trim() || !form.email.includes('@')) errs.email = true;
    if (!form.phone.trim()) errs.phone = true;
    return errs;
  };

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setErrors({ ...errors, [field]: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('sending');
    try {
      const phoneNumber = '919400788258'; // +91 94007 88258 without spaces/symbols
      const messageText = `Hello Nivo Concepts,\n\nI would like to request a free consultation. Here are my details:\n*Name:* ${form.name}\n*Email:* ${form.email}\n*Phone:* ${form.phone}\n*Preferred Date:* ${form.date || 'Not specified'}\n*Service:* ${form.service || 'Not specified'}\n*Message:* ${form.message || 'None'}`;
      const encodedMessage = encodeURIComponent(messageText);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
      setStatus('sent');
      setForm({ name: '', email: '', phone: '', date: '', service: '', message: '' });
    } catch {
      setStatus('failed');
    }
  };

  return (
    <main>
      <a href="#" id="back-to-top"></a>


      {/* Page Header */}
      <section className="bg-dark text-light relative jarallax">
        <img src="/images/background/luxury_interior_hero.png" className="jarallax-img" alt="Consultation" />
        <div className="container relative z-2">
          <div className="row gy-4 gx-5 align-items-center">
            <div className="col-md-8">
              <div className="spacer-double sm-hide"></div>
              <h1 className="mb-3 wow fadeInUp" data-wow-delay=".2s">Free Consultation</h1>
              <ul className="crumb wow fadeInUp">
                <li><Link to="/">Home</Link></li>
                <li className="active">Consultation</li>
              </ul>
            </div>
            <div className="col-md-4">
              <p className="mb-0 wow fadeInRight" data-wow-delay=".2s">
                Schedule your free design consultation today and take the first step toward your dream space.
              </p>
            </div>
          </div>
        </div>
        <div className="gradient-edge-bottom h-50 op-6"></div>
        <div className="sw-overlay op-5"></div>
      </section>

      {/* Consultation Form */}
      <section>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="subtitle">Book a Session</div>
              <h2 className="wow fadeInRight" data-wow-delay=".2s">Let's Start Your Design Journey</h2>
              <p className="wow fadeInRight" data-wow-delay=".4s">Fill out the form to schedule your free consultation. Our team will reach out within 24 hours to confirm your appointment and discuss your vision.</p>
              <div className="spacer-20"></div>
              <div><i className="icofont-clock-time me-2 id-color"></i>Monday - Saturday 08.00 - 18.00</div>
              <div><i className="icofont-location-pin me-2 id-color"></i>100 S Main St, New York, NY</div>
              <div><i className="icofont-envelope me-2 id-color"></i>contact@intrio.com</div>
            </div>
            <div className="col-lg-6">
              {status === 'sent' ? (
                <div className="alert alert-success">
                  Your consultation request has been sent! We'll contact you within 24 hours.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-12">
                      <div className="field-set mb-3">
                        <input type="text" className={`form-control${errors.name ? ' error_input' : ''}`} placeholder="Your Name *"
                          value={form.name} onChange={handleChange('name')} />
                      </div>
                      <div className="field-set mb-3">
                        <input type="email" className={`form-control${errors.email ? ' error_input' : ''}`} placeholder="Your Email *"
                          value={form.email} onChange={handleChange('email')} />
                      </div>
                      <div className="field-set mb-3">
                        <input type="text" className={`form-control${errors.phone ? ' error_input' : ''}`} placeholder="Your Phone *"
                          value={form.phone} onChange={handleChange('phone')} />
                      </div>
                      <div className="field-set mb-3">
                        <input type="date" className="form-control" value={form.date} onChange={handleChange('date')} />
                      </div>
                      <div className="field-set mb-3">
                        <select className="form-control" value={form.service} onChange={handleChange('service')}>
                          <option value="">Select a Service</option>
                          <option>Furniture &amp; Decor Selection</option>
                          <option>Concept Development</option>
                          <option>Renovation &amp; Space Planning</option>
                          <option>Visual Design Rendering</option>
                          <option>Residential Interior Design</option>
                          <option>Commercial Interior Design</option>
                        </select>
                      </div>
                      <div className="field-set mb-3">
                        <textarea className="form-control h-100px" placeholder="Additional Message"
                          value={form.message} onChange={handleChange('message')} />
                      </div>
                    </div>
                  </div>
                  <input type="submit" value={status === 'sending' ? 'Sending...' : 'Request Consultation'} className="btn-main w-100"
                    disabled={status === 'sending'} />
                  {status === 'failed' && (
                    <div className="alert alert-danger mt-3">Sorry, there was an error sending your request.</div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Consultation;

