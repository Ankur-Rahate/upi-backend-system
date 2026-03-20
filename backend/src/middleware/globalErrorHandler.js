import { config } from "../config/config.js";

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message,
    errStack:config.env === "development"? err.stack : " "
  })
};

export default globalErrorHandler;