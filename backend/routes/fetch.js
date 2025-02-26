const express = require('express');
const router = express.Router();
const fetchController = require('../controllers/fetchController');

router.get("/tasks/:id", fetchController.getTasks);
router.get("/projects/:id", fetchController.getProjects);
router.get("/tags/:id", fetchController.getTags);

module.exports = router;