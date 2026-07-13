const Transaction = require("../models/Transaction");

// Add Transaction
const addTransaction = async (req, res) => {
  try {
    const { type, amount, category, description, date } = req.body;

    const transaction = await Transaction.create({
      user: req.user._id,
      type,
      amount,
      category,
      description,
      date,
    });

    return res.status(201).json({
      message: "Transaction Added Successfully",
      transaction,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      transactions,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Update Transaction
const updateTransaction = async (req, res) => {
  try {
    const { type, amount, category, description, date } = req.body;

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    transaction.type = type;
    transaction.amount = amount;
    transaction.category = category;
    transaction.description = description;
    transaction.date = date;

    await transaction.save();

    return res.status(200).json({
      message: "Transaction Updated Successfully",
      transaction,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    await transaction.deleteOne();

    return res.status(200).json({
      message: "Transaction Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Dashboard Summary
const getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user._id,
    });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    });

    const balance = totalIncome - totalExpense;

    return res.status(200).json({
      totalIncome,
      totalExpense,
      balance,
      totalTransactions: transactions.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getSummary,
};