import createHttpError from "http-errors";
import sendMoneyService from "../services/sendMoneyService.js";

const sendMoneyController = async (req, res, next) =>{
  try{
  //validate
  const { receiverId, amount} = req.body;

  // came in jwt
  const senderId = req.user.id;

  //validate all fields
  if (!receiverId) {
  return next(createHttpError(400, "Receiver ID is required"));
}

if (!amount) {
  return next(createHttpError(400, "Amount is required"));
}

if (isNaN(amount) || amount <= 0) {
  return next(createHttpError(400, "Amount must be a positive number"));
}

  //send responce
  const transaction = await sendMoneyService({
    senderId,
    receiverId,
    amount
  });

  res.status(200).json({
    success:true,
    data: transaction
  });
}catch(error){
  next(error)
}

};

export default sendMoneyController;