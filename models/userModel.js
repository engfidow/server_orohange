const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  image: String,
   title: { type: String, default: "" },     // Optional
  work: { type: String, default: "" },      // Optional
  location: { type: String, default: "" },  // Optional
  otp: String,
  otpExpires: Date,
  verified: { type: Boolean, default: false },
   role: {
      type: String,
      enum: ['admin', 'staff', 'user'],
      default: 'user',
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
