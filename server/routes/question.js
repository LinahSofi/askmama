const express = require('express');
const router = express.Router();
const Question = require('../models/question');

// ✅ Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find()
      .populate('category')
      .populate('user')
      .populate('answers'); // ← populate virtual
    res.json(questions);
  } catch (err) {
    console.error('Error fetching all questions:', err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get questions by category
router.get('/category/:categoryId', async (req, res) => {
  try {
    const questions = await Question.find({ category: req.params.categoryId })
      .populate('user')
      .populate('answers'); // ← populate virtual
    res.json(questions);
  } catch (err) {
    console.error('Error fetching questions by category:', err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get a specific question by ID
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('category')
      .populate('user')
      .populate('answers'); // ← populate virtual

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json(question);
  } catch (err) {
    console.error('Error fetching question by ID:', err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Create a new question
router.post('/', async (req, res) => {
  const { text, category, user } = req.body;

  try {
    const question = new Question({ text, category, user });
    const saved = await question.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating question:', err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;