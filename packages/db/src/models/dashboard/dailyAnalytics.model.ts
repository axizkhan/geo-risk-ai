import mongoose from "mongoose";

const dailyAnalyticsSchema = new mongoose.Schema(
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

dailyAnalyticsSchema.index({ userId: 1, date: 1 });

export type IDailyAnalytics = mongoose.InferSchemaType<
  typeof dailyAnalyticsSchema
>;

export type IDailyAnalyticsDoc = mongoose.HydratedDocument<IDailyAnalytics>;
export type IDailyAnalyticLean = IDailyAnalytics & {
  _id: mongoose.Schema.Types.ObjectId;
};

export const AnalyticsDailyModel = mongoose.model<IDailyAnalyticLean>(
  "DailyAnalytics",
  dailyAnalyticsSchema,
);
