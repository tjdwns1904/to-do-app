const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

router.post("/", tagController.addTag);
router.delete("/:name", tagController.deleteTag);

module.exports = router;