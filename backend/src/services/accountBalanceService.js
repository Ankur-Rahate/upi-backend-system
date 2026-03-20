import pool from "../config/dbConfig.js";

const getBalanceService = async(userId) =>{
 const result = await pool.query(
    "SELECT balance FROM accounts WHERE user_id = $1",
    [userId]
  );

  if (result.rows.length === 0) {
    const error = new Error("Account not found");
    error.status = 404;
    throw error;
  }
   return result.rows[0];
}

export default getBalanceService;