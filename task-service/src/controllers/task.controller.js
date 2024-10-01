const Task = require('../models/task.model');

// Create a new task
const createTask = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const task = new Task({
      userId: req.userId,  // Extracted from the JWT
      title,
      description,
      status: status || 'pending'
    });

    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get all tasks for the authenticated user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.userId !== req.userId) {
      return res.status(404).send({ message: 'Task not found or unauthorized' });
    }

    res.status(200).send(task);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.userId !== req.userId) {
      return res.status(404).send({ message: 'Task not found or unauthorized' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    await task.save();
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.userId !== req.userId) {
      return res.status(404).send({ message: 'Task not found or unauthorized' });
    }

    await task.remove();
    res.status(200).send({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
