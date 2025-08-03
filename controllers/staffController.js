const Staff = require('../models/staffModel');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Create staff + user account automatically
exports.createStaff = async (req, res) => {
  try {
    const { name, staffRole, phone, email, salary, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email already registered!' });

    const staff = await Staff.create({
      name,
      staffRole,
      phone,
      email,
      salary
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'staff',
      image, // ✅ Image stored in User model only
      verified: true
    });

    res.status(201).json({ message: 'Staff registered successfully', staff });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all staff
exports.getAllStaff = async (req, res) => {
  try {
    const staffList = await Staff.find().sort({ createdAt: -1 });
    res.status(200).json(staffList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get staff by ID
exports.getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    res.status(200).json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update staff
exports.updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });

    const { name, staffRole, phone, email, salary } = req.body;

    staff.name = name;
    staff.staffRole = staffRole;
    staff.phone = phone;
    staff.email = email;
    staff.salary = salary;

    await staff.save();

    // ✅ If you also want to update image in User:
    if (req.file) {
      const image = `/uploads/${req.file.filename}`;
      await User.findOneAndUpdate({ email: staff.email }, { image });
    }

    res.status(200).json({ message: 'Staff updated successfully', staff });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete staff (optional you can also delete corresponding user here)
exports.deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });

    // You can also delete User by email if you want:
    await User.deleteOne({ email: staff.email });

    res.status(200).json({ message: 'Staff deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
