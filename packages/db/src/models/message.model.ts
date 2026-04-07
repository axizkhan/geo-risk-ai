import { channelTypeSchema, messageStatusSchema } from "@repo/shared";
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    channel: {
      type: String,
      enum: channelTypeSchema.options,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: messageStatusSchema.options,
      required: true,
      default: "pending",
    },
    totalCount: {
      type: Number,
      required: true,
    },
    successCount: {
      type: Number,
      default: 0,
      required: true,
    },
    failedCount: {
      type: Number,
      default: 0,
      required: true,
    },
    jobStartedAt: {
      type: Date,
      default: null,
    },
    jobEndAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

export type IMessage = mongoose.InferSchemaType<typeof messageSchema>;

messageSchema.index({ createdAt: 1 });

export const MessageModel: mongoose.Model<IMessage> = mongoose.model<IMessage>(
  "Message",
  messageSchema,
);
