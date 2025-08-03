const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');

// Create donation
router.post('/', donationController.createDonation);

// Get all donations (for admin)
router.get('/', donationController.getAllDonations);

// Get donations by user ID (for staff/user personal donation view)
router.get('/user/:userId', donationController.getDonationsByUser);

module.exports = router;
