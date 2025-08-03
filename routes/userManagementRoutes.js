const express = require('express');
const router = express.Router();
const userController = require('../controllers/userManagementController');
const upload = require('../middleware/upload');

router.get('/', userController.getAllUsers);
router.post('/', upload.single('image'), userController.createUser);
router.patch('/update/:id', upload.single('image'), userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
