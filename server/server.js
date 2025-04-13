const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const goalRoutes = require('./routes/goalRoutes');
const taskRoutes = require('./routes/taskRoutes');
const eventRoutes = require('./routes/eventRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/goals', goalRoutes);  
app.use('/api/tasks', taskRoutes);  
app.use('/api/events', eventRoutes); 

app.get('/', (req, res) => {
  res.send('Calendar API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
