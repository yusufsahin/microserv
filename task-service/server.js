const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db.config');
const taskRoutes = require('./src/routes/task.routes');
require('dotenv').config();

const app = express();
app.use(cors());
// Middleware
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Task service running on port ${PORT}`);
});
