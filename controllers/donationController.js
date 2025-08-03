const Donation = require('../models/donationModel');
const User = require('../models/userModel');
const { payByWaafiPay } = require('../paymentEvc');

// Create donation (POST /api/donations)
exports.createDonation = async (req, res) => {
  try {
    const { user, donorPhone, amount } = req.body;
    // const waafiResponse = await payByWaafiPay({
    //       phone: donorPhone,
    //       amount: amount,
    //       merchantUid: process.env.merchantUid,
    //       apiUserId: process.env.apiUserId,
    //       apiKey: process.env.apiKey,
    //     });
    //     if (waafiResponse.status) {
            const userExists = await User.findById(user);
    if (!userExists) return res.status(404).json({ message: 'User not found' });

    const donation = await Donation.create({
      user,
      donorPhone,
      amount
    });

    res.status(201).json({ message: 'Donation created successfully', donation });
        // }else{
        //      // Handling payment failure
        //   return res.status(400).send({
        //     status: "failed",
        //     message: `${waafiResponse.error}` ?? "Payment Failed Try Again",
        //   });
        // }

    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all donations (GET /api/donations)
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('user', 'name email image')
      .sort({ createdAt: -1 });

    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get donations by User ID (GET /api/donations/user/:userId)
exports.getDonationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const donations = await Donation.find({ user: userId })
      .populate('user', 'name email image')
      .sort({ createdAt: -1 });

    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
