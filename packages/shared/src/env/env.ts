/**env loader file */
import dotenv from "dotenv";

dotenv.config();

const envSchema: Record<string, string | number> = {
  SERVER_PORT: "string",
  MONGODB_URL: "string",
  SALT_ROUND: "number",
  JWT_SECRET: "string",
  BACKEND_URL: "string",
  PROVIDER_ENC_KEY: "string",
  ENC_ALGORITHM: "string",
  MAX_RETRIES: "number",
  RABBIT_QUEUE_LINK: "string",
  MESSAGE_EXCHANGE: "string",
  EMAIL_MSG: "string",
  SMS_MSG: "string",
  EMAIL_MESSAGE_QUEUE: "string",
  SMS_MESSAGE_QUEUE: "string",
  EMAIL_CONSUMER: "number",
};

type EnvSchema = {
  SERVER_PORT: string;
  MONGODB_URL: string;
  SALT_ROUND: number;
  JWT_SECRET: string;
  BACKEND_URL: string;
  PROVIDER_ENC_KEY: string;
  ENC_ALGORITHM: string;
  MAX_RETRIES: number;
  RABBIT_QUEUE_LINK: string;
  MESSAGE_EXCHANGE: string;
  EMAIL_MSG: string;
  SMS_MSG: string;
  EMAIL_MESSAGE_QUEUE: string;
  SMS_MESSAGE_QUEUE: string;
  EMAIL_CONSUMER: number;
};

const env = () => {
  //@ts-ignore
  const envObj: EnvSchema = {};

  let missingKey: Array<string> = [];
  let invalidType = [];
  for (let [key, type] of Object.entries(envSchema)) {
    let envVar = process.env[key];
    if (envVar === undefined || envVar === "") {
      missingKey.push(key);
      continue;
    }
    if (type === "number") {
      let numVar = Number(envVar);
      if (isNaN(numVar)) {
        invalidType.push([key, type]);
      } else {
        //@ts-ignore
        envObj[key] = numVar;
      }
    } else {
      //@ts-ignore
      envObj[key] = envVar;
    }
  }
  return envObj;
};

export default env();
