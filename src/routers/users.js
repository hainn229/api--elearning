const express = require("express");
const router = express.Router();
const {
  getUsersWithPages,
  getUsers,
  updateAmount,
} = require("../services/users");
const { checkAuth, checkRole } = require("../middlewares/auth");
const {
  createTransaction,
  getTransactionById,
  checkPayment,
} = require("../services/transactions");

router.get("/", checkAuth(true), checkRole(true), async (req, res, next) => {
  try {
    const currentPage = parseInt(req.query.currentPage) || 1;
    const limitPage = parseInt(req.query.limitPage) || 5;
    const keywords = req.query.keywords || "";
    const users = await getUsersWithPages(currentPage, limitPage, keywords);
    return res.status(200).json({
      users: users,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/all", checkAuth(true), async (req, res) => {
  try {
    const users = await getUsers();
    return res.status(200).json({
      users: users,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/updateAmount", checkAuth(true), async (req, res) => {
  try {
    const paymentInfo = await checkPayment(req.body.paymentId);
    if (paymentInfo == null) {
      return res.status(400).json({ message: "Payment info not found !" });
    } else {
      const transactionsData = {
        user_id: req.body.user_id,
        paymentId: req.body.paymentId,
        amount: parseFloat(paymentInfo.amount.total),
        currency: paymentInfo.amount.currency,
        email: paymentInfo.payee.email,
      };
      await createTransaction(transactionsData);
      const newAmount = await updateAmount(
        req.body.user_id,
        parseFloat(paymentInfo.amount.total) * 1
      );
      return res
        .status(200)
        .json({ message: "Update Amount Successfully !", u_amount: newAmount });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/purchase", checkAuth(true), async (req, res) => {
  try {
    const user = req.user;
    const currentPage = parseInt(req.query.currentPage) || 1;
    const limitPage = parseInt(req.query.limitPage) || 5;
    const transactions = await getTransactionById(
      user._id,
      currentPage,
      limitPage
    );
    return res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
