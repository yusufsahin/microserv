const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/auth.routes');  // Updated path
const sequelize = require('./src/config/db.config');     // Updated path
require('dotenv').config();

const app = express();
app.use(cors());

app.use(express.json());
app.use('/api/auth', authRoutes);

sequelize.sync().then(() => {
  console.log('Database connected');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
