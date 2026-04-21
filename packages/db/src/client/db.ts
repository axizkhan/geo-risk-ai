import mongoose from "mongoose";
import { env, InternalServerError } from "@repo/shared";
import { SYSTEM_ERROR_CODE, ERROR_TYPE } from "@repo/shared";

let isConnected = false;

export function mongoConnection() {
  if (isConnected) return;

  const mongoUrl = env.MONGODB_URL;

  if (!mongoUrl) {
    throw new InternalServerError({
      appCode: SYSTEM_ERROR_CODE.INTERNAL_SERVER_ERROR,
      errorType: ERROR_TYPE.SYSTEM,
      message: "MongoDB connection URL is not configured",
    });
  }

  mongoose.connect(mongoUrl);

  console.log("Successfully connected to mongodb");
}
