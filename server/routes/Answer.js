// server/routes/Answer.js
const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');

// POST /api/answers
router.post('/', async (req, res) => {
  const { text, question, user } = req.body;

  if (!text || !question || !user) {
    return res.status(400).json({ message: 'All fields are required: text, question, user' });
  }

  try {
    const newAnswer = new Answer({ text, question, user });
    await newAnswer.save();
    res.status(201).json(newAnswer);
  } catch (err) {
    console.error('🔥 Error creating answer:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;