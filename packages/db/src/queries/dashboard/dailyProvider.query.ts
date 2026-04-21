import mongoose from "mongoose";
import {
  DailyProviderAnalyticsModel,
  IDailyProvider,
  IDailyProviderLean,
} from "../../models/dashboard/dailyProvider.model.js";
import { FindProviderRange } from "../../types/dashboard.types.js";

export const createDailyProviderAnyDoc = async ({
  userId,
  providerId,
}: {
  userId: string;
  providerId: string;
}) => {
  try {
    return await DailyProviderAnalyticsModel.create({
      userId: new mongoose.Types.ObjectId(userId),
      providerId: new mongoose.Types.ObjectId(providerId),
    });
  } catch (err) {
    throw err;
  }
};

export const isDailyProviderExist = async ({
  userId,
  providerId,
}: {
  userId: string;
  providerId: string;
}): Promise<IDailyProviderLean | null> => {
  try {
    let date = new Date(new Date().setHours(0, 0, 0, 0));
    return await DailyProviderAnalyticsModel.findOne({
      userId,
      providerId,
      date,
    }).lean();
  } catch (err) {
    throw err;
  }
};

export const updateDailyProviderMatrix = async ({
  _id,
  isSuccess,
}: {
  _id: string;
  isSuccess: boolean;
}): Promise<mongoose.UpdateResult> => {
  try {
    let date = new Date(new Date().setHours(0, 0, 0, 0));
    return await DailyProviderAnalyticsModel.updateOne(
      { _id: new mongoose.Schema.Types.ObjectId(_id) },
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

export const findDailyProviderlDoc = async (
  userId: string,
): Promise<IDailyProvider | null> => {
  try {
    let date = new Date(new Date().setHours(0, 0, 0, 0));
    return await DailyProviderAnalyticsModel.findOne({ userId, date }).lean();
  } catch (err) {
    throw err;
  }
};

export const dailyProviderDocPagination = async ({
  userId,
  skip,
  limit,
}: {
  userId: string;
  skip: number;
  limit: number;
}): Promise<IDailyProviderLean[] | null> => {
  try {
    return await DailyProviderAnalyticsModel.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
  } catch (err) {
    throw err;
  }
};

export const dailyProviderDocRangePagination = async ({
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
}): Promise<IDailyProviderLean[] | null> => {
  try {
    startDate = new Date(startDate.setHours(0, 0, 0, 0));
    endDate = new Date(endDate.setHours(0, 0, 0, 0));
    return await DailyProviderAnalyticsModel.find({
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

export const findDailyProviderDocs = async (
  userId: string,
): Promise<FindProviderRange> => {
  try {
    let [result] = await DailyProviderAnalyticsModel.aggregate([
      {
        $facet: {
          summary: [
            {
              $group: {
                totalSent: { $sum: "$totalSent" },
                totaslFailed: { $sum: "$totalFailed" },
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

export const findDailyProviderDocRange = async ({
  userId,
  startDate,
  endDate,
}: {
  userId: string;
  startDate: Date;
  endDate: Date;
}): Promise<FindProviderRange> => {
  try {
    startDate = new Date(startDate.setHours(0, 0, 0, 0));
    endDate = new Date(endDate.setHours(0, 0, 0, 0));

    let [result] = await DailyProviderAnalyticsModel.aggregate([
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
                  { $date: { $gte: { startDate } } },
                  { $date: { $lte: endDate } },
                ],
              },
            },
            { $sort: { createdAt: -1 } },
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

export const summaryProviderQuery = async ({
  userId,
  endDate,
  startDate,
}: {
  userId: string;
  endDate: Date;
  startDate: Date;
}) => {
  try {
    let [result] = await DailyProviderAnalyticsModel.aggregate([
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
