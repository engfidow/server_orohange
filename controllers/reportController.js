const Donation = require('../models/donationModel');
const User = require('../models/userModel');

exports.getDonationReport = async (req, res) => {
  try {
    const { range } = req.params; // 'week', 'month', 'year', 'all'

    let filter = {};
    const now = new Date();

    if (range === 'week') {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      filter = { date: { $gte: startOfWeek } };
    }

    if (range === 'month') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      filter = { date: { $gte: startOfMonth } };
    }

    if (range === 'year') {
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      filter = { date: { $gte: startOfYear } };
    }

    const donations = await Donation.find(filter)
      .populate('user', 'name email image')
      .sort({ createdAt: -1 });

    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
