import express from "express";

import globalErrorHandler from "./middleware/globalErrorHandler.js";
import authRouter from "./router/authRouter.js";
import sendMoneyRouter from "./router/transactionRouter.js";
import getBalanceRouter from "./router/accountBalanceRouter.js";
import transactionHistoryRouter from "./router/transactionHistoryRoutes.js";


const app = express();
app.use(express.json());

app.get("/", (req, res, next)=>{
   res.json({message:"Welcome"})
});

app.use("/api/authentications",authRouter);
app.use("/api/transactions",sendMoneyRouter);
app.use("/api/account",getBalanceRouter);
app.use("/api/history", transactionHistoryRouter);


app.use(globalErrorHandler)


export default app;