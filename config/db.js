const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://root:root@orphanage.pbebhng.mongodb.net/?retryWrites=true&w=majority&appName=Orphanage');
    console.log('MongoDB connected✅');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
