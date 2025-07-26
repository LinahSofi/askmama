// routes/category.js
const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// POST /api/categories
router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Category name is required' });
  }

  try {
    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(409).json({ message: 'Category already exists' });
    }

    const newCategory = new Category({ name });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (err) {
    console.error('🔥 Error creating category:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;