const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db.config');
const profileRoutes = require('./src/routes/profile.routes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/profile', profileRoutes);

connectDB();  // Connect to MongoDB

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});
