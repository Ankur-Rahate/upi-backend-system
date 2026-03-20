import pkg from "pg";
import { config } from "./config.js";

const {Pool} = pkg;

 const pool = new Pool({
  connectionString: config.databaseUrl
});

pool.on("error",(err) =>{
  console.error("Unexpecteded DB error:",
  err.message);
  process.exit(1);
});

export const connectDB = async () => {
  try{
    await pool.query("SELECT 1");
    console.log("database connection successfully")
  }catch(error){
    console.error("database connection failed:",
      error.message);
      process.exit(1);
  }
};

export default pool;