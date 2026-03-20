import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/dbConfig.js";
import { config } from "../config/config.js";




const signupServices = async(data) =>{
  // destructure req.body
const {name, email, password} = data;


//find existing user
const existingUser = await pool.query(
  "SELECT * FROM users WHERE email =$1",
  [email]
);

if(existingUser.rows.length > 0){
  const error = new Error("User already exist");
  error.status = 409;
  throw error;
};

//hash password
const hashedPassword = await bcrypt.hash(password, 10);

//insert user
const result = await pool.query(
  `INSERT INTO users (name, email, password)
  VALUES($1,$2,$3)
  RETURNING id, name, email`,
  [name, email,hashedPassword]
);
const user = result.rows[0];

//create account
await pool.query(
  "INSERT INTO accounts(user_id, balance) VALUES ($1, $2)",[user.id, 1000]
);
return user;

};



const loginService = async (data) => {
    // destructure req.body
const { email, password} = data;

  //Find user
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  const user = result.rows[0];

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  // Generate JWT
  const token = jwt.sign(
    { id: user.id, email: user.email },config.jwtSecret,{ expiresIn: "1d" }
  );

  //Return user + token
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token:token
  };
};

export {signupServices, loginService};