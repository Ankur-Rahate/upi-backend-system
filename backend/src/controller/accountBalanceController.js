import getBalanceService from "../services/accountBalanceService.js";

const getBalanceController = async(req, res, next) =>{
  try{
  const userId = req.user.id;

  const balance = await getBalanceService(userId);

  res.status(200).json({
    success:true,
    data:balance
  })
  }catch(error){
    next(error);
  }
};

export default getBalanceController;