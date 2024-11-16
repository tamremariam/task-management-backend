const express = require('express');
const {
  createTask,
  getTasksByGroup,
  updateTask,
  deleteTask,
  getAllTasks, // Ensure this matches the export in taskController.js
} = require('../controllers/taskController'); // Path to your controllers

const protect = require('../middleware/authMiddleware'); // Ensure middleware is correctly imported

const router = express.Router();

// Routes
router.post('/', protect, createTask); // Create a task
router.get('/', protect, getAllTasks); // Get all tasks
router.get('/:group', protect, getTasksByGroup); // Get tasks by group
router.put('/:id', protect, updateTask); // Update a task
router.delete('/:id', protect, deleteTask); // Delete a task
router.get('/status', protect, getAllTasks);

module.exports = router;
