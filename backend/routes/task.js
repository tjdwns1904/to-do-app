const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post("/", taskController.addTask);
router.patch("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
router.patch("/state/:id", taskController.updateState);

module.exports = router;