import mongoose from "mongoose";

export type CreateNewDelievries = Array<{
  messageId: mongoose.Types.ObjectId;
  providerId: mongoose.Types.ObjectId;
  recipent: string;
}>;

export type DeliveryStatus = "pending" | "sent" | "failed" | "retry";
