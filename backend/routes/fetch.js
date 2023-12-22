const express = require('express');
const router = express.Router();
const fetchController = require('../controllers/fetchController');

router.post("/tasks", fetchController.getTasks);
router.post("/projects", fetchController.getProjects);
router.post("/tags", fetchController.getTags);

module.exports = router;