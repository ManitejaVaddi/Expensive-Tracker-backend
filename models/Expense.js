const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['income', 'expense'], required: true },
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now },
  note: String
});

module.exports = mongoose.model('Expense', ExpenseSchema);
