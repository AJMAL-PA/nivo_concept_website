
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
    // Log submission to console since email option is disabled
    console.log('--- New Contact Form Submission (Email Disabled) ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Message: ${message}`);
    console.log('--------------------------------------------------');

    return res.json({ success: true, message: 'sent' });
  } catch (err) {
    console.error('Contact handler error:', err);
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
    // Log submission to console since email option is disabled
    console.log('--- New Consultation Request (Email Disabled) ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Date: ${date || 'Not specified'}`);
    console.log(`Time: ${time || 'Not specified'}`);
    console.log(`Service: ${service || 'Not specified'}`);
    console.log(`Message: ${message || 'None'}`);
    console.log('------------------------------------------------');

    return res.json({ success: true, message: 'sent' });
  } catch (err) {
    console.error('Consultation handler error:', err);
    return res.status(500).json({ success: false, message: 'failed' });
  }
};

module.exports = { sendContact, sendConsultation };
