const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const upload = require('../middleware/upload');

// CRUD routes
router.post('/', upload.single('image'), staffController.createStaff);
router.get('/', staffController.getAllStaff);
router.get('/:id', staffController.getStaffById);
router.put('/:id', upload.single('image'), staffController.updateStaff);
router.delete('/:id', staffController.deleteStaff);

module.exports = router;
