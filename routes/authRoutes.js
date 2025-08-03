const express = require('express');
const { register, verifyOtp, login, sendOtp, resetPassword, forgotPassword } = require('../controllers/authController');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/register', upload.single('image'), register);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
router.post('/send-otp', sendOtp);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
