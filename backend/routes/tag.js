const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

router.post("/add", tagController.addTag);
router.post("/delete", tagController.deleteTag);

module.exports = router;