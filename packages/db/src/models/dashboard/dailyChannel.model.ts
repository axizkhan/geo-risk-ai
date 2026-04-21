import mongoose from "mongoose";
import { channelTypeSchema } from "../../types/message.types";

const dailyChannelSchema = new mongoose.Schema(
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
    channelType: {
      type: String,
      enum: channelTypeSchema.options,
      required: true,
    },
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

dailyChannelSchema.index({ userId: 1, channel: 1, date: 1 });

export type IDailyChannel = mongoose.InferSchemaType<typeof dailyChannelSchema>;
export type IDailyChannelDoc = mongoose.HydratedDocument<IDailyChannel>;
export type IDailyChannelLean = IDailyChannel & {
  _id: mongoose.Schema.Types.ObjectId;
};

export const DailyChannelModel = mongoose.model<IDailyChannelLean>(
  "DailyChannel",
  dailyChannelSchema,
);
