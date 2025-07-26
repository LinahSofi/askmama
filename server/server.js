// server.js

require('dotenv').config(); // Loads .env vars

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB error:', err.message));

// Test Route — confirms server is running
app.get('/api/ping', (req, res) => {
  res.status(200).json({ message: '✅ API is alive' });
});

// Routes
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/Category');
const questionRoutes = require('./routes/question');
const answerRoutes = require('./routes/Answer');

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});