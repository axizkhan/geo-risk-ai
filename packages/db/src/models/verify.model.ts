import mongoose, { Schema } from "mongoose";

export interface IVerify {
  verifyToken: string;
  userId: Schema.Types.ObjectId | string;
  createdAt: Date;
}

const verifySchema = new mongoose.Schema<IVerify>({
  verifyToken: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

verifySchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 2 });

export const VerifyModel = mongoose.model<IVerify>("Verify", verifySchema);
