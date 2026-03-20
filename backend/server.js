import app from "./src/app.js";
import { config } from "./src/config/config.js";
import { connectDB } from "./src/config/dbConfig.js";

const startServer = async() =>{

  await connectDB();
const PORT =  config.port || 3006;
app.listen (PORT, () =>{
  console.log(`Server start on port${PORT}`);
});
};

startServer();


