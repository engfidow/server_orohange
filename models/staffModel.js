const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  staffRole: { type: String, enum: ['caretaker', 'teacher', 'nurse', 'driver', 'cleaner'], required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  salary: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Staff', staffSchema);
