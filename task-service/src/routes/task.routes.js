const express = require('express');
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controllers/task.controller');
const authenticateJWT = require('../middleware/authenticateJWT');
const router = express.Router();

// Routes for managing tasks
router.post('/', authenticateJWT, createTask);      // Create a task
router.get('/', authenticateJWT, getTasks);         // Get all tasks
router.get('/:id', authenticateJWT, getTaskById);   // Get a task by ID
router.put('/:id', authenticateJWT, updateTask);    // Update a task by ID
router.delete('/:id', authenticateJWT, deleteTask); // Delete a task by ID

module.exports = router;
