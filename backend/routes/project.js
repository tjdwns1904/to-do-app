const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.post("/", projectController.addProject);
router.delete("/:name", projectController.deleteProject);

module.exports = router;