const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post("/add", taskController.addTask);
router.post("/update", taskController.updateTask);
router.post("/delete", taskController.deleteTask);
router.post("/updateState", taskController.updateState);

module.exports = router;