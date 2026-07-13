const transporter = require('../config/mailer');

// Contact form handler
const sendContact = async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Basic validation
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }
  if (!email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Invalid email address.' });
  }

  try {
    await transporter.sendMail({
      from: `"Intrio Contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO || process.env.MAIL_USER,
      replyTo: `${name} <${email}>`,
      subject: 'New Contact Message — Intrio',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
    });
    return res.json({ success: true, message: 'sent' });
  } catch (err) {
    console.error('Mail error:', err);
    return res.status(500).json({ success: false, message: 'failed' });
  }
};

// Consultation form handler
const sendConsultation = async (req, res) => {
  const { name, email, phone, date, time, service, message } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ success: false, message: 'Name, email and phone are required.' });
  }

  try {
    await transporter.sendMail({
      from: `"Intrio Consultation" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO || process.env.MAIL_USER,
      replyTo: `${name} <${email}>`,
      subject: 'New Consultation Request — Intrio',
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Preferred Date: ${date || 'Not specified'}`,
        `Preferred Time: ${time || 'Not specified'}`,
        `Service: ${service || 'Not specified'}`,
        `Message: ${message || 'None'}`
      ].join('\n')
    });
    return res.json({ success: true, message: 'sent' });
  } catch (err) {
    console.error('Mail error:', err);
    return res.status(500).json({ success: false, message: 'failed' });
  }
};

module.exports = { sendContact, sendConsultation };
