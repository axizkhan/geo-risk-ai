import mongoose from "mongoose";
import {
  AnalyticsDailyModel,
  IDailyAnalyticLean,
} from "../../models/dashboard/dailyAnalytics.model.js";
import { FindAnalyticsRangeDoc } from "../../types/dashboard.types.js";

export const createAnalyticsDailyDoc = async (userId: string) => {
  try {
    return await AnalyticsDailyModel.create({ userId });
  } catch (err) {
    throw err;
  }
};

export const isUserDailyAnalyticsExist = async (
  userId: string,
): Promise<IDailyAnalyticLean | null> => {
  try {
    let date = new Date(new Date().setHours(0, 0, 0, 0));
    return await AnalyticsDailyModel.findOne({ userId, date }).lean();
  } catch (err) {
    throw err;
  }
};

export const updateDailyAnalyticsMatric = async ({
  id,
  isSuccess,
}: {
  id: string;
  isSuccess: boolean;
}): Promise<mongoose.UpdateResult> => {
  try {
    return await AnalyticsDailyModel.updateOne(
      { _id: new mongoose.Schema.Types.ObjectId(id) },
      [
        {
          $set: {
            totalSent: {
              $cond: [isSuccess, { $add: ["$totalSent", 1] }, "$totalSent"],
            },
            totalFailed: {
              $cond: [isSuccess, "$totalFailed", { $add: ["$totalFailed", 1] }],
            },
          },
        },
      ],
    );
  } catch (err) {
    throw err;
  }
};

export const isDailyAnalyticsDocExist = async (
  userId: string,
): Promise<IDailyAnalyticLean | null> => {
  try {
    let date = new Date(new Date().setHours(0, 0, 0, 0));
    return await AnalyticsDailyModel.findOne({ userId, date }).lean();
  } catch (err) {
    throw err;
  }
};

export const dailyAnalyticsDocPagination = async ({
  userId,
  skip,
  limit,
}: {
  userId: string;
  skip: number;
  limit: number;
}): Promise<IDailyAnalyticLean[] | null> => {
  try {
    return await AnalyticsDailyModel.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
  } catch (err) {
    throw err;
  }
};

export const dailyAnalyticsDocRangePagination = async ({
  userId,
  skip,
  limit,
  startDate,
  endDate,
}: {
  userId: string;
  skip: number;
  limit: number;
  startDate: Date;
  endDate: Date;
}): Promise<Array<IDailyAnalyticLean> | null> => {
  try {
    startDate = new Date(startDate.setHours(0, 0, 0, 0));
    endDate = new Date(endDate.setHours(0, 0, 0, 0));
    return await AnalyticsDailyModel.find({
      userId,
      $and: [{ date: { $gte: startDate } }, { date: { $lte: endDate } }],
    })
      .skip(skip)
      .limit(limit)
      .lean();
  } catch (err) {
    throw err;
  }
};

export const findDailyAnalyticsDoc = async (
  userId: string,
): Promise<FindAnalyticsRangeDoc> => {
  try {
    let [result] = await AnalyticsDailyModel.aggregate([
      {
        $facet: {
          summary: [
            {
              $group: {
                totalSent: { $sum: "$totalSent" },
                totalFailed: { $sum: "$totalFailed" },
                count: { $sum: 1 },
              },
            },
          ],
          data: [
            {
              $match: { $userId: userId },
            },
            { $sort: { $createdAt: -1 } },
            { $skip: 0 },
            { $limit: 10 },
          ],
        },
      },
      {
        $project: {
          totalSent: { $arrayElemAt: ["$summary.totalSent", 0] },
          totalFailed: { $arrayElemAt: ["$summary.totalFailed", 0] },
          docCount: { $arrayElemAt: ["$summary.count", 0] },
          data: "$data",
        },
      },
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

export const findDailyAnalyticsDocRange = async ({
  userId,
  startDate,
  endDate,
}: {
  userId: string;
  startDate: Date;
  endDate: Date;
}): Promise<FindAnalyticsRangeDoc> => {
  try {
    startDate = new Date(startDate.setHours(0, 0, 0, 0));
    endDate = new Date(endDate.setHours(0, 0, 0, 0));

    let [result] = await AnalyticsDailyModel.aggregate([
      {
        $facet: {
          summary: [
            {
              $group: {
                _id: null,
                totalSent: { $sum: "$totalSent" },
                totalFailed: { $sum: "$totalFailed" },
                count: { $sum: 1 },
              },
            },
          ],
          data: [
            {
              $match: {
                $userId: userId,
                $and: [
                  { $date: { $gte: startDate } },
                  { $date: { $lte: endDate } },
                ],
              },
            },
            { $sort: { $createdAt: -1 } },
            { $skip: 0 },
            { $limit: 10 },
          ],
        },
      },
      {
        $project: {
          totalSent: { $arrayElemAt: ["$summary.totalSent", 0] },
          totalFailed: { $arrayElemAt: ["$summary.totalFailed", 0] },
          docCount: { $arrayElemAt: ["$summary.count", 0] },
          data: "$data",
        },
      },
    ]);

    return result;
  } catch (err) {
    throw err;
  }
};

export const summaryAnalyticsQuery = async ({
  userId,
  endDate,
  startDate,
}: {
  userId: string;
  endDate: Date;
  startDate: Date;
}) => {
  try {
    let [result] = await AnalyticsDailyModel.aggregate([
      {
        $match: {
          userId: new mongoose.Schema.Types.ObjectId(userId),
          data: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSent: { $sum: "$totalSent" },
          totalFailed: { $sum: "$totalFaild" },
        },
      },
      {
        $project: {
          _id: 0,
          totalSent: 1,
          totalFailed: 1,
        },
      },
    ]);

    return result;
  } catch (err) {
    throw err;
  }
};
