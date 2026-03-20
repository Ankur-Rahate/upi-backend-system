import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import getBalanceController from "../controller/accountBalanceController.js";

const getBalanceRouter = express.Router();

getBalanceRouter.get("/balance", authMiddleware, getBalanceController);

export default getBalanceRouter;