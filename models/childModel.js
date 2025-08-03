const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
  name: { type: String, required: true },
 
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  dateOfBirth: { type: Date, required: true },
  dateOfAdmission: { type: Date, required: true },
  health: {
    vaccinations: { type: String, default: '' },
    allergies: { type: String, default: '' }
  },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Child', childSchema);
