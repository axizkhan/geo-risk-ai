import mongoose from "mongoose";

const dailyProviderAnalyticsSchema = new mongoose.Schema(
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
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
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

dailyProviderAnalyticsSchema.index({ providerId: 1, date: 1 });

export type IDailyProvider = mongoose.InferSchemaType<
  typeof dailyProviderAnalyticsSchema
>;

export type IDailyProviderDoc = mongoose.HydratedDocument<IDailyProvider>;
export type IDailyProviderLean = IDailyProvider & {
  _id: mongoose.Schema.Types.ObjectId;
};

export const DailyProviderAnalyticsModel = mongoose.model<IDailyProviderLean>(
  "DailyProvider",
  dailyProviderAnalyticsSchema,
);
