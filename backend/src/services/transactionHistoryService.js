import pool from "../config/dbConfig.js";

 const getTransactionHistoryService = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM transactions 
     WHERE sender_id = $1 OR receiver_id = $1 
     ORDER BY created_at DESC`,
    [userId]
  );

  return result.rows;
};


export default getTransactionHistoryService;