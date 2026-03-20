import getTransactionHistoryService from "../services/transactionHistoryService.js";



 const getTransactionHistoryController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const data = await getTransactionHistoryService(userId);

    res.status(200).json({
      success: true,
      data
    });

  } catch (err) {
    next(err);
  }
};


export default  getTransactionHistoryController;