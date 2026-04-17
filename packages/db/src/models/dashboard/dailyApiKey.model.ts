import mongoose from "mongoose";
import { CHANNEL_TYPES } from "../../types/message.types";

const dailyApiAnalyticsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: new Date(new Date().setHours(0, 0, 0, 0)),
    },
    apiKeyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ApiKey",
      required: true,
    },
    channel: [{ type: String, enum: CHANNEL_TYPES }],
    types: [{ type: String, enum: ["single", "bulk"] }],
    totalSent: {
      type: Number,
      default: 0,
    },
    totalFailed: {
      type: Number,
      default: 0,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

dailyApiAnalyticsSchema.index({ apiKeyId: 1, date: 1 });

export type IDailyApi = mongoose.InferSchemaType<
  typeof dailyApiAnalyticsSchema
>;

export const DailyApiKeyAnalyticsModel = mongoose.model<IDailyApi>(
  "DailyApiKey",
  dailyApiAnalyticsSchema,
);
