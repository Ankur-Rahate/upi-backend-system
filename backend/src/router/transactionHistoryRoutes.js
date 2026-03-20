import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import getTransactionHistoryController from "../controller/transactionHistoryController.js";



const transactionHistoryRouter = express.Router();

transactionHistoryRouter.get("/", authMiddleware, getTransactionHistoryController);

export default transactionHistoryRouter;