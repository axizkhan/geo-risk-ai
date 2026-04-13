import mongoose from "mongoose";
import { env } from "@repo/shared";

const delieverySchema = new mongoose.Schema({
  messageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
    required: true,
    index: true,
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Provider",
    required: true,
  },
  recipent: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "sent", "failed", "retry"],
    default: "pending",
  },
  retryCount: {
    type: Number,
    default: 0,
  },
  sentAt: {
    type: Date,
    default: null,
  },
  error: {
    type: String,
    default: null,
  },
  maxRetries: {
    type: Number,
    default: env.MAX_RETRIES,
    immutable: true,
  },
  nextRetryAt: {
    type: Date,
    default: null,
  },
  lastAttemptAt: {
    type: Date,
    default: null,
  },
});

delieverySchema.index({ providerId: 1, status: 1 });
delieverySchema.index({ messageId: 1, status: 1 });

export type IDelievery = mongoose.InferSchemaType<typeof delieverySchema>;

export const DelieveryModel = mongoose.model("Delievery", delieverySchema);
