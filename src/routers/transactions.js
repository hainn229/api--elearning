const express = require("express");
const router = express.Router();
const joi = require("joi");
const { checkAuth, checkRole } = require("../middlewares/auth");
const {
  getTransactions,
  getTransactionsByUserId,
} = require("../services/transactions");

router.get("/:userId", checkAuth(true), async (req, res) => {
  try {
    const userId = req.params.userId;
    const currentPage = parseInt(req.query.currentPage) || 1;
    const limitPage = parseInt(req.query.limitPage) || 5;

    const transaction = await getTransactionsByUserId(
      userId,
      currentPage,
      limitPage
    );
    return res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/", checkAuth(true), checkRole(true), async (req, res) => {
  try {
    const keywords = req.query.keywords || "";
    const currentPage = parseInt(req.query.currentPage) || 1;
    const limitPage = parseInt(req.query.limitPage) || 5;
    const transactions = await getTransactions(currentPage, limitPage, keywords);
    return res.status(200).json({
      transactions: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});


router.delete("/:id", checkAuth(true), async (req, res) => {
  try {
    await removeFromCart(req.params.id);
    return res.status(200).json({ message: "Remove successfully" });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
