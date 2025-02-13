const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  userId: {
    type: String,  // The userId from the JWT token
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Task', TaskSchema);
