import { ChannelType } from "@repo/shared";
import { IMessage, MessageModel } from "../models/message.model";
import mongoose from "mongoose";
import { MessagesStatusQuery, MessageStatus } from "../types/message.types";

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

export const findMessageById = async (
  _id: string,
): Promise<mongoose.InferRawDocType<IMessage> | null> => {
  try {
    return await MessageModel.findByIdAndUpdate(_id, {
      status: "processing",
    }).lean();
  } catch (err) {
    throw err;
  }
};

export const findMessageDelievryStatus = async (
  _id: string,
): Promise<MessageStatus | null> => {
  try {
    let result = await MessageModel.findOne({ _id }).lean();
    return result as {
      _id: mongoose.Schema.Types.ObjectId;
      totalCount: number;
      successCount: number;
      failedCount: number;
    } | null;
  } catch (err) {
    throw err;
  }
};

export const getMessageDetailsId = async (
  _id: string,
): Promise<IMessage | null> => {
  try {
    return await MessageModel.findById(_id).lean();
  } catch (err) {
    throw err;
  }
};

export const messageStartAt = async (
  _id: string,
): Promise<mongoose.UpdateResult> => {
  try {
    return await MessageModel.updateOne(
      { _id },
      {
        $set: { jobStartedAt: new Date() },
      },
    );
  } catch (err) {
    throw err;
  }
};

export const messageEndAt = async (
  _id: string,
): Promise<mongoose.UpdateResult> => {
  try {
    return await MessageModel.updateOne(
      { _id },
      { $set: { jobEndAt: new Date() } },
    );
  } catch (err) {
    throw err;
  }
};

export const getMessages = async ({
  userId,
  status,
}: {
  userId: string;
  status: string;
}): Promise<Array<MessagesStatusQuery> | null> => {
  try {
    return await MessageModel.find({
      userId: { $eq: userId },
      status: { $eq: status },
    })
      .projection({ userId: 0 })
      .populate({ path: "userId", select: "provider_name isEnable type -_id" });
  } catch (err) {
    throw err;
  }
};
