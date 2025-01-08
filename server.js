const express = require('express');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());


app.use('/api', taskRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});