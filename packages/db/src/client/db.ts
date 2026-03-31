import mongoose from "mongoose";
import { env } from "@repo/shared";

let isConnected = false;

export function mongoConnection() {
  if (isConnected) return;

  const mongoUrl = env.MONGODB_URL;

  if (!mongoUrl) {
    throw new Error("Mongo url is not defined");
  }

  mongoose.connect(mongoUrl);

  console.log("Successfully connected to mongodb");
}
