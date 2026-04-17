import { TextEncoderStream } from "stream/web";
import { ApiKeyModel } from "../../models/apiKey.model.js";
import {
  DailyChannelModel,
  IDailyChannel,
} from "../../models/dashboard/dailyChannel.model.js";

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

export const isDailyChannelExist = async ({
  userId,
  providerId,
}: {
  userId: string;
  providerId: string;
}) => {
  try {
    let date = new Date(new Date().setHours(0, 0, 0, 0));
    return DailyChannelModel.findOne({ userId, providerId, date });
  } catch (err) {
    throw err;
  }
};

export const updateDailyChannelMatrix = async ({
  userId,
  providerId,
  isSuccess,
}: {
  userId: string;
  providerId: string;
  isSuccess: boolean;
}) => {
  try {
    let date = new Date(new Date().setHours(0, 0, 0, 0));
    return DailyChannelModel.updateOne({ userId, providerId, date }, [
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
    ]);
  } catch (err) {
    throw err;
  }
};

export const findDailyChannelDoc = async (
  userId: string,
): Promise<IDailyChannel | null> => {
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
}) => {
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

export const findDailyChannelDocs = async (userId: string) => {
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
}) => {
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
}) => {
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
