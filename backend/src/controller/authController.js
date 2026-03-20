import createHttpError from "http-errors";
import {loginService, signupServices} from "../services/authServices.js";

const signupController = async(req, res, next) =>{
  // destructure req.body
  try{
  const {name, email, password}= req.body;

  // validate all fields
  if (!name) {
    return next(createHttpError(400, "Name is required"));
  }
  
  if (!email) {
    return next(createHttpError(400, "Email is required"));
  }
  
  if (!password) {
    return next(createHttpError(400, "Password is required"));
  }

  // create user
  const createUser = await signupServices(req.body);

  //send response
  res.status(201).json({
    success:true,
    data:createUser
  });
  }catch(error){
    next(error)
  }
};

const loginController = async (req, res, next) => {
  try {

    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return next(createHttpError(400, "Email and password required"));
    }

    const user = await loginService({ email, password });

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    next(error);
  }
};

export {signupController, loginController};