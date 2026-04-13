import mongoose from "mongoose";

export type MessageStatus = {
  _id: mongoose.Schema.Types.ObjectId;
  totalCount: number;
  successCount: number;
  failedCount: number;
};
