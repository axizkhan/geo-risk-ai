import { ApiKeyAction, ChannelType } from "@repo/shared";
import {
  DailyApiKeyAnalyticsModel,
  IDailyApiKeyLean,
} from "../../models/dashboard/dailyApiKey.model.js";
import { FindApiKeyRange } from "../../types/dashboard.types.js";
import mongoose from "mongoose";
import { ApiKeyModel } from "../../models/apiKey.model.js";

export const createDailyApiKeyDoc = async ({
  userId,
  apiKeyId,
  channel,
  types,
}: {
  userId: string;
  apiKeyId: string;
  channel: [ChannelType];
  types: [ApiKeyAction];
}) => {
  try {
    return await DailyApiKeyAnalyticsModel.create({
      userId,
      apiKeyId,
      channel,
      types,
    });
  } catch (err) {
    throw err;
  }
};

export const isDailyApiKeyDocExist = async ({
  userId,
  apiKeyId,
}: {
  userId: string;
  apiKeyId: string;
}): Promise<IDailyApiKeyLean | null> => {
  try {
    let date = new Date(new Date().setHours(0, 0, 0, 0));
    return await DailyApiKeyAnalyticsModel.findOne({
      userId,
      apiKeyId,
      date,
    }).lean();
  } catch (err) {
    throw err;
  }
};

export const updateDailyApiMatrix = async ({
  _id,
  isSuccess,
}: {
  _id: string;
  isSuccess: boolean;
}) => {
  try {
    return await DailyApiKeyAnalyticsModel.updateOne(
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

export const findDailyApiKeyDoc = async (
  userId: string,
): Promise<IDailyApiKeyLean | null> => {
  try {
    let date = new Date(new Date().setHours(0, 0, 0, 0));
    return await DailyApiKeyAnalyticsModel.findOne({ userId, date }).lean();
  } catch (err) {
    throw err;
  }
};

export const findDailyApiKeyDocsRange = async ({
  userId,
  startDate,
  endDate,
}: {
  userId: string;
  startDate: Date;
  endDate: Date;
}): Promise<FindApiKeyRange> => {
  try {
    startDate = new Date(startDate.setHours(0, 0, 0, 0));
    endDate = new Date(endDate.setHours(0, 0, 0, 0));
    let [result] = await DailyApiKeyAnalyticsModel.aggregate([
      {
        $facet: {
          //calculate summary
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
          //all docs
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

export const findDailyApiKeyDocs = async (
  userId: string,
): Promise<FindApiKeyRange> => {
  try {
    let [result] = await DailyApiKeyAnalyticsModel.aggregate([
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
            { $match: { $userId: userId } },
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

export const dailyApiKeyDocPagination = async ({
  userId,
  skip,
  limit,
}: {
  userId: string;
  skip: number;
  limit: number;
}): Promise<Array<IDailyApiKeyLean> | null> => {
  try {
    return await DailyApiKeyAnalyticsModel.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
  } catch (err) {
    throw err;
  }
};

export const dailyApiKeyDocRangePagination = async ({
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
}): Promise<Array<IDailyApiKeyLean> | null> => {
  try {
    startDate = new Date(startDate.setHours(0, 0, 0, 0));
    endDate = new Date(endDate.setHours(0, 0, 0, 0));
    return await DailyApiKeyAnalyticsModel.find({
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

export const summaryApiKeyQuery = async ({
  userId,
  endDate,
  startDate,
}: {
  userId: string;
  endDate: Date;
  startDate: Date;
}) => {
  try {
    let [result] = await ApiKeyModel.aggregate([
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
