const Expense = require("../models/Expense");

exports.createExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    const newExpense = new Expense({
      user: req.user.id,
      amount,
      category,
      description,
      date,
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ error: "Failed to create expense" });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};
