const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const app = express();
const authRoutes = require('./routes/authRoutes');
const childRoutes = require('./routes/childRoutes');
const staffRoutes = require('./routes/staffRoutes');
const donationRoutes = require('./routes/donationRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const reportRoutes = require('./routes/reportRoutes');
const userManagementRoutes = require('./routes/userManagementRoutes');
// ✅ Allow requests from ANY origin
app.use(cors({ origin: '*' }))
connectDB();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes

app.use('/api/auth', authRoutes);

app.use('/api/children', childRoutes);

app.use('/api/staff', staffRoutes);
app.use('/api/donations', donationRoutes);

app.use('/api/dashboard', dashboardRoutes);

app.use('/api/reports', reportRoutes);


app.use('/api/users', userManagementRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
