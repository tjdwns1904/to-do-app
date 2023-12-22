const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.post("/add", projectController.addProject);
router.post("/delete", projectController.deleteProject);

module.exports = router;