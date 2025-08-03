const express = require('express');
const router = express.Router();
const childController = require('../controllers/childController');
const upload = require('../middleware/upload');
router.post('/', upload.single('image'), childController.createChild);
router.get('/', childController.getChildren);
router.get('/:id', childController.getChildById);
router.put('/:id', upload.single('image'), childController.updateChild);
router.delete('/:id', childController.deleteChild);

module.exports = router;
