/**env loader file */
import dotenv from "dotenv";

dotenv.config();

const env = {
  SERVER_PORT: process.env.SERVER_PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  SALT_ROUND: Number(process.env.SALT_ROUND),
  JWT_SECRET: process.env.JWT_SECRET,
  BACKEND_URL: process.env.BACKEND_URL,
};

export default env;
