const express = require('express');
const router = express.Router();
const { sendContact, sendConsultation } = require('../controllers/contactController');

router.post('/contact', sendContact);
router.post('/consultation', sendConsultation);

module.exports = router;
