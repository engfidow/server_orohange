const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/donations/:range', reportController.getDonationReport);

module.exports = router;
