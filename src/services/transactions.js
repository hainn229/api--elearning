const axios = require("axios");
const queryString = require("querystring");
const TransactionsModel = require("../models//transactions");

module.exports.index = async (currentPage, limitPage, keywords) => {
  const transactions = await TransactionsModel.find()
    .populate({
      path: "user_id",
      match: { email: { $regex: keywords, $options: "" } },
    })
    .limit(limitPage)
    .page(limitPage * (currentPage - 1))
    .sort({ _id: -1 });

  const totalItems = await TransactionsModel.find()
    .populate({
      path: "user_id",
      match: { email: { $regex: keywords, $options: "" } },
    })
    .countDocuments();
  return {
    data: transactions,
    currentPage: currentPage,
    totalItems: totalItems,
  };
};

module.exports.createTransaction = async (data) => {
  const newTransaction = new TransactionsModel(data);
  return await newTransaction.save();
};

module.exports.getTransactionById = async (userId, currentPage, limitPage) => {
  const skip = (currentPage - 1) * limitPage;
  const query = TransactionsModel.find({ user_id: userId });
  const transactions = await query
    .skip(skip)
    .limit(limitPage)
    .sort({ _id: -1 });
  const totalItems = await query.countDocuments();
  return {
    data: transactions,
    totalItems: totalItems,
    currentPage: currentPage,
    limitPage: limitPage,
  };
};

module.exports.totalTransactions = async () => {
  const totalTransactions = await TransactionsModel.countDocuments();
  const totalAmount = await TransactionsModel.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$total" },
      },
    },
  ]);
  return {
    totalTransactions: totalTransactions,
    totalAmount: totalAmount[0].total,
  };
};

module.exports.checkPayment = async (paymentId) => {
  try {
    const data = querystring.stringify({
      grant_type: "client_credentials",
    });
    const response = await axios.default.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username:
            "AZCYHCPLRmzqm38On3hEaSrxzjWM4_g5CZntyPbOxOVgu0DUgkzgc9-giU4tLV33iCDB2Yqd78nBwwjf",
          password:
            "EH5L7NGSUcpFsIkVBHKz9Ndq_L3fWVUZqDvMH8BRgtzdToHz2ZsBN0qBREfxwX5uJSvrVVPBCXnrjAkw",
        },
      }
    );
    const paymentDetails = await axios.default.get(
      `https://api-m.sandbox.paypal.com/v1/payments/payment/${paymentId}`,
      {
        headers: {
          Accept: `application/json`,
          Authorization: `Bearer ${response.data.access_token}`,
        },
      }
    );
    return paymentDetails.data.transactions[0];
  } catch (error) {
    throw error;
  }
};
