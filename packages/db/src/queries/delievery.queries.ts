import mongoose from "mongoose";
import { DelieveryModel, IDelievery } from "../models/delievery.model";
import { IMessage } from "../models/message.model";
import { CreateNewDelievries } from "@repo/db";

export const createNewDelieveryDocs = async (
  deliveriesArray: CreateNewDelievries,
): Promise<mongoose.Require_id<IDelievery>[]> => {
  try {
    return await DelieveryModel.insertMany(deliveriesArray, { lean: true });
  } catch (err) {
    throw err;
  }
};

export const successDelievryAndUpdate = async ({
  _id,
}: {
  _id: string;
}): Promise<mongoose.UpdateResult> => {
  try {
    return await DelieveryModel.updateOne(
      { _id },
      {
        $set: { status: "sent", lastAttemptAt: new Date(), sentAt: new Date() },
        $inc: { retryCount: 1 },
      },
    );
  } catch (err) {
    throw err;
  }
};

export const failedDelievryAndUpdate = async ({
  _id,
  error,
}: {
  _id: string;
  error: string;
}): Promise<mongoose.UpdateResult> => {
  try {
    return await DelieveryModel.updateOne(
      { _id },
      {
        $set: { status: "failed", lastAttemptAt: new Date(), error: error },
        $inc: { retryCount: 1 },
      },
    );
  } catch (err) {
    throw err;
  }
};

export const retryDelievryAndUpdate = async ({
  _id,
  error,
}: {
  _id: string;
  error: string;
}): Promise<mongoose.UpdateResult> => {
  try {
    return await DelieveryModel.updateOne({ _id }, [
      {
        $set: {
          error: error,
          lastAttemptAt: new Date(),
          retryCount: { $add: ["$retryCount", 1] },
        },
      },
      {
        $set: {
          status: {
            $cond: {
              if: { $eq: ["$maxRetries", "$retryCount"] },
              then: "failed",
              else: "retry",
            },
          },
          nextRetryAt: {
            $cond: {
              if: { $gt: ["$maxRetries", "$retryCount"] },
              then: new Date(new Date().getTime() + 1000 * 60 * 3),
              else: "$nextRetryAt",
            },
          },
        },
      },
    ]);
  } catch (err) {
    throw err;
  }
};

export const findDelieveriesForSending = async ({
  messageId,
  batchSize,
}: {
  messageId: string;
  batchSize: number;
}): Promise<Array<mongoose.InferRawDocType<IDelievery>>> => {
  try {
    return await DelieveryModel.find({
      messageId,
      status: { $eq: ["pending", "retry"] },
    }).limit(batchSize);
  } catch (err) {
    throw err;
  }
};
