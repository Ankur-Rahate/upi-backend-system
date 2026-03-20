import pool from "../config/dbConfig.js"

const sendMoneyService = async ({senderId, receiverId, amount}) =>{

  const client = await pool.connect();

  try{

    //start transaction
    await client.query("BEGIN");

    //get sender
    const sender = await client.query(
      "SELECT * FROM accounts WHERE user_id=$1 FOR UPDATE",[senderId]
    );


    if(sender.rows.length === 0){
      const error = new Error("Sender account not found");
      error.status = 404;
      throw error
    } ;

    if(sender.rows[0].balance < amount) {
      const error =  new Error ("Insufficient balance");
      error.status = 400;
      throw error
    };


    //get receiver
    const receiver = await client.query(
      "SELECT * FROM accounts WHERE user_id = $1 FOR UPDATE",[receiverId]
    );

    if(receiver.rows.length === 0){
      const error = new Error("Receiver account not found");
      error.status = 404;
      throw error
    } ;


    //Deduct sender balance
    await client.query(
      "UPDATE accounts SET balance = balance - $1 WHERE user_id = $2",[amount,senderId]
    );

    //Add receiver balance
    await client.query(
      "UPDATE accounts SET balance = balance + $1 WHERE user_id = $2",[amount,receiverId]
    );

     // save transaction
     const transaction = await client.query(
      `INSERT INTO transactions(sender_id, receiver_id, amount, status) VALUES($1, $2, $3, $4) RETURNING*`,
      [senderId, receiverId, amount, "SUCCESS"]
     );

     //commit
     await client.query("COMMIT");

     return transaction.rows[0];


  }catch(error){
    // if fails
    await client.query("ROLLBACK");

   // save fails transaction
    await pool.query(
      `INSERT INTO transactions(sender_id, receiver_id, amount, status) VALUES($1, $2, $3, $4)`,
      [senderId, receiverId, amount, "FAILED"]
     );
    throw error;

  }finally{
    client.release()
  }

}


export default sendMoneyService;