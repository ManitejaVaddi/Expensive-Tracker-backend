const express = require('express');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');

const router = express.Router();

// Add
router.post('/', auth, async (req, res) => {
  const expense = new Expense({ ...req.body, user: req.user.id });
  await expense.save();
  res.json(expense);
});

// Get All
router.get('/', auth, async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
  res.json(expenses);
});

// Summary
router.get('/summary', auth, async (req, res) => {
  const data = await Expense.aggregate([
    { $match: { user: req.user.id } },
    { $group: { _id: '$type', total: { $sum: '$amount' } } }
  ]);
  res.json(data);
});

module.exports = router;
