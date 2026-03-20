import { config as conf } from "dotenv";
conf();

const _config = {
  port:process.env.PORT,
  env:process.env.ENV,
  databaseUrl:process.env.DATABASE_URL,
  jwtSecret:process.env.JWT_SECRET,
};

export const config = Object.freeze(_config);