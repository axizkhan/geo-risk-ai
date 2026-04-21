import {
  DailyChannelModel,
  IDailyChannelLean,
} from "../../models/dashboard/dailyChannel.model.js";
import mongoose, { UpdateResult } from "mongoose";
import { ChannelType } from "@repo/shared";
import { FindChannelRangeDoc } from "../../types/dashboard.types.js";

export const createDailyChannelDoc = async ({
  userId,
  channelType,
}: {
  userId: string;
  channelType: string;
}) => {
  try {
    return await DailyChannelModel.create({ userId, channelType });
  } catch (err) {
    throw err;
  }
};

export const isDailyChannelExistQuery = async ({
  userId,
  channelType,
}: {
  userId: string;
  channelType: string;
}): Promise<IDailyChannelLean | null> => {
  try {
    let date = new Date(new Date().setHours(0, 0, 0, 0));
    return DailyChannelModel.findOne({ userId, channelType, date }).lean();
  } catch (err) {
    throw err;
  }
};

export const updateDailyChannelMatrix = async ({
  id,
  isSuccess,
}: {
  id: string;
  isSuccess: boolean;
}): Promise<UpdateResult> => {
  try {
    let date = new Date(new Date().setHours(0, 0, 0, 0));
    return DailyChannelModel.updateOne(
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

export const findDailyChannelDoc = async (
  userId: string,
): Promise<IDailyChannelLean | null> => {
  try {
    let date = new Date(new Date().setHours(0, 0, 0, 0));
    return await DailyChannelModel.findOne({ userId, date }).lean();
  } catch (err) {
    throw err;
  }
};

export const findDailyChannelDocRange = async ({
  userId,
  startDate,
  endDate,
}: {
  userId: string;
  startDate: Date;
  endDate: Date;
}): Promise<FindChannelRangeDoc> => {
  try {
    startDate = new Date(startDate.setHours(0, 0, 0, 0));
    endDate = new Date(endDate.setHours(0, 0, 0, 0));

    let [result] = await DailyChannelModel.aggregate([
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

export const findDailyChannelDocs = async (
  userId: string,
): Promise<FindChannelRangeDoc> => {
  try {
    let [result] = await DailyChannelModel.aggregate([
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

export const dailyChannelDocPagination = async ({
  userId,
  skip,
  limit,
}: {
  userId: string;
  skip: number;
  limit: number;
}): Promise<Array<IDailyChannelLean> | null> => {
  try {
    return await DailyChannelModel.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
  } catch (err) {
    throw err;
  }
};

export const dailyChannelDocRangePagination = async ({
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
}): Promise<Array<IDailyChannelLean> | null> => {
  try {
    startDate = new Date(startDate.setHours(0, 0, 0, 0));
    endDate = new Date(endDate.setHours(0, 0, 0, 0));
    return await DailyChannelModel.find({
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

export const summaryChannelQuery = async ({
  userId,
  endDate,
  startDate,
}: {
  userId: string;
  endDate: Date;
  startDate: Date;
}) => {
  try {
    let [result] = await DailyChannelModel.aggregate([
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
