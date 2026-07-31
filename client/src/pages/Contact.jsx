import { useState } from 'react';
import { Link } from 'react-router-dom';

import usePluginInit from '../hooks/usePluginInit';


const offices = [
  { 
    city: 'Main Office', 
    addr: 'Nivo Concepts, Kottapadath building, Mutheri - Kallurutty Rd, Mukkam, Neeleswaram, Kerala 673602', 
    phone: '+91 94007 88258', 
    email: 'nivoconcepts@gmail.com' 
  }
];

const Contact = () => {
  usePluginInit();

  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'sent' | 'failed' | 'sending'

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.phone.trim()) errs.phone = true;
    if (form.email.trim() && !form.email.includes('@')) errs.email = true;
    if (!form.message.trim()) errs.message = true;
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('sending');
    
    // Call the API asynchronously in the background so we don't break user event context
    import('../services/api').then(({ default: api }) => {
      api.post('/contact', {
        name: form.name,
        phone: form.phone,
        email: form.email || 'not-specified@example.com',
        message: form.message
      }).catch(err => console.error('Backend logging failed:', err));
    }).catch(err => console.error(err));

    try {
      const phoneNumber = '919400788258'; // +91 94007 88258 without spaces/symbols
      const messageText = `Hello Nivo Concepts,\n\nI would like to contact you. Here are my details:\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Email:* ${form.email || 'Not specified'}\n*Message:* ${form.message}`;
      const encodedMessage = encodeURIComponent(messageText);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
      setStatus('sent');
      setForm({ name: '', phone: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('failed');
    }
  };

  return (
    <main>
      <a href="#" id="back-to-top"></a>
      <style>{`
        #contact_form .form-control {
          border: none !important;
          border-bottom: 2px solid #C3AF9B !important;
          border-radius: 0 !important;
          background: transparent !important;
          padding-left: 4px !important;
          padding-right: 4px !important;
          padding-bottom: 12px !important;
          margin-bottom: 8px !important;
          color: inherit !important;
          transition: border-color 0.3s ease !important;
          box-shadow: none !important;
        }
        #contact_form .form-control:focus {
          border-bottom-color: #8c7662 !important;
        }
        #contact_form textarea.form-control {
          height: auto !important;
          min-height: 80px !important;
        }
        #contact_form .error_input {
          border-bottom: 2px solid #f44336 !important;
        }
      `}</style>


      {/* Page Header */}
      <section className="bg-dark text-light relative jarallax">
        <img src="/images/background/luxury_interior_hero.png" className="jarallax-img" alt="Contact Us" />
        <div className="container relative z-2">
          <div className="row gy-4 gx-5 align-items-center">
            <div className="col-md-8">
              <div className="spacer-double sm-hide"></div>
              <h1 className="mb-3 wow fadeInUp" data-wow-delay=".2s">Contact</h1>
              <ul className="crumb wow fadeInUp">
                <li><Link to="/">Home</Link></li>
                <li className="active">Contact</li>
              </ul>
            </div>
            <div className="col-md-4">
              <p className="mb-0 wow fadeInRight" data-wow-delay=".2s">
                We create inspiring interiors that combine comfort, functionality, and timeless design. Every space is thoughtfully tailored to reflect your lifestyle and needs.
              </p>
            </div>
          </div>
        </div>
        <div className="gradient-edge-bottom h-50 op-6"></div>
        <div className="sw-overlay op-5"></div>
      </section>

      {/* Contact Section */}
      <section className="px-md-5 px-lg-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="row g-4">
                {offices.map((o, i) => (
                  <div key={i} className="col-md-12 wow fadeInUp text-center text-lg-start" data-wow-delay={`${i * 0.2}s`}>
                    <h4 className="mb-3">{o.city}</h4>
                    <p style={{ lineHeight: '1.8' }}>
                      Nivo Concepts, Kottapadath building,<br />
                      Mutheri - Kallurutty Rd, Mukkam,<br />
                      Neeleswaram, Kerala 673602<br />
                      <span style={{ display: 'block', height: '10px' }}></span>
                      <strong>Phone:</strong> {o.phone}<br />
                      <strong>Email:</strong> {o.email}
                    </p>
                    <a href="https://google.com/maps/dir//''/data=!4m7!4m6!1m1!4e2!1m2!1m1!1s0x3ba641801beef9e9:0xb2830e78854a4e17!3e0?g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF" target="_blank" rel="noopener noreferrer" className="btn-main mt-2 mb-4">View on Google Maps</a>
                    
                    <div className="map-container" style={{ width: '100%', height: '350px', borderRadius: '8px', overflow: 'hidden' }}>
                      <iframe 
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15648.74088921503!2d75.9814421115112!3d11.320986790886506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba641801beef9e9%3A0xb2830e78854a4e17!2sNivo%20Concepts!5e0!3m2!1sen!2sin!4v1717658763529!5m2!1sen!2sin" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade">
                      </iframe>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-6">
              <p className="col-lg-8 wow fadeInUp text-center text-lg-start mx-auto mx-lg-0">Have a question, suggestion, or just want to say hi? We're here and happy to hear from you!</p>
              <div className="spacer-single"></div>

              <div className="relative wow fadeInUp" data-wow-delay=".6s">
                {status === 'sent' ? (
                  <div id="success_message" className="alert alert-success">
                    Your message has been sent successfully!
                  </div>
                ) : (
                  <form name="contactForm" id="contact_form" onSubmit={handleSubmit}>
                    <div className="row g-4">
                      <div className="col-lg-12">
                        <div className="field-set mb-4">
                          <input type="text" name="Name" id="name" className={`form-control${errors.name ? ' error_input' : ''}`} placeholder="Your Name"
                            value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: false }); }} />
                        </div>
                        <div className="field-set mb-4">
                          <input type="text" name="phone" id="phone" className={`form-control${errors.phone ? ' error_input' : ''}`} placeholder="Your Phone"
                            value={form.phone} onChange={e => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: false }); }} />
                        </div>
                        <div className="field-set mb-4">
                          <input type="text" name="email" id="email" className={`form-control${errors.email ? ' error_input' : ''}`} placeholder="Your Email (optional)"
                            value={form.email} onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: false }); }} />
                        </div>
                        <div className="field-set mb-4">
                          <textarea name="message" id="message" className={`form-control h-100px${errors.message ? ' error_input' : ''}`} placeholder="Your Message"
                            value={form.message} onChange={e => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: false }); }} />
                        </div>
                      </div>
                    </div>
                    <div id="submit" className="mt-4">
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="btn-main w-100 d-flex align-items-center justify-content-center gap-2"
                      >
                        <i className="fa-brands fa-whatsapp fs-18"></i>
                        {status === 'sending' ? 'SENDING...' : 'SEND VIA WHATSAPP'}
                      </button>
                    </div>
                    {status === 'failed' && (
                      <div id="error_message" className="alert alert-danger mt-3">
                        Sorry there was an error sending your form.
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;

