import { ChannelType } from "@repo/shared";
import { IMessage, MessageModel } from "../models/message.model";
import mongoose from "mongoose";

export const createMessageDocuement = async ({
  content,
  channel,
  userId,
  providerId,
  totalCount,
}: {
  content: string;
  channel: ChannelType;
  userId: string;
  providerId: string;
  totalCount: number;
}): Promise<mongoose.HydratedDocument<IMessage>> => {
  try {
    return await MessageModel.create({
      content,
      channel,
      userId,
      providerId,
      totalCount,
    });
  } catch (err) {
    throw err;
  }
};

export const handleMessageDeliveryResult = async ({
  messageId,
  isSuccess,
}: {
  messageId: string;
  isSuccess: boolean;
}) => {
  try {
    return await MessageModel.updateOne({ _id: messageId }, [
      {
        $set: {
          successCount: {
            $cond: [isSuccess, { $add: ["$successCount", 1] }, "$successCount"],
          },
          failedCount: {
            $cond: [isSuccess, "$failedCount", { $add: ["$failedCount", 1] }],
          },
        },
      },
      {
        $set: {
          status: {
            $switch: {
              branches: [
                {
                  case: { $eq: ["$successCount", "$totalCount"] },
                  then: "completed",
                },
                {
                  case: { $eq: ["$failedCount", "$totalCount"] },
                  then: "failed",
                },
                {
                  case: {
                    $eq: [
                      { $add: ["$successCount", "$failedCount"] },
                      "$totalCount",
                    ],
                  },
                  then: "partial",
                },
              ],
              default: "pending",
            },
          },
        },
      },
    ]);
  } catch (err) {
    throw err;
  }
};

export const findAndUpdateMessageToProcessing = async (_id: string) => {
  try {
    return await MessageModel.findOneAndUpdate(
      { _id, status: { $nin: ["failed", "partial", "completed"] } },
      {
        $set: {
          status: {
            $cond: {
              if: { $eq: ["$status", "pending"] },
              then: "processing",
              else: "$status",
            },
          },
        },
      },
      { new: true },
    ).lean();
  } catch (err) {
    throw err;
  }
};
