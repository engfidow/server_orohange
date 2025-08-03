const Child = require('../models/childModel');
const Staff = require('../models/staffModel');
const Donation = require('../models/donationModel');

exports.getDashboardStats = async (req, res) => {
  try {
    const childrenCount = await Child.countDocuments();
    const staffCount = await Staff.countDocuments();

    // Default aggregation
    const totalDonationsAllTime = await Donation.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]);

    // Calculate date ranges
    const now = new Date();

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const weekDonations = await Donation.aggregate([
      { $match: { date: { $gte: startOfWeek } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const monthDonations = await Donation.aggregate([
      { $match: { date: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const yearDonations = await Donation.aggregate([
      { $match: { date: { $gte: startOfYear } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.status(200).json({
      childrenCount,
      staffCount,
      totalDonations: totalDonationsAllTime[0]?.total || 0,
      donationsThisWeek: weekDonations[0]?.total || 0,
      donationsThisMonth: monthDonations[0]?.total || 0,
      donationsThisYear: yearDonations[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
