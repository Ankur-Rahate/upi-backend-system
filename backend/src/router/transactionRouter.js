import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import sendMoneyController from "../controller/transactionController.js";

const sendMoneyRouter = express.Router();

sendMoneyRouter.post("/send", authMiddleware, sendMoneyController);

export default sendMoneyRouter;

