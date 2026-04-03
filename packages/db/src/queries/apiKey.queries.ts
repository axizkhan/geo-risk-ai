import { ChannelType } from "@repo/shared";
import { ApiKeyModel } from "../models/apiKey.model";
import { IApiKey } from "../models/apiKey.model";
import mongoose, { InferRawDocType } from "mongoose";

export const createApiKeyDoc = async ({
  userId,

  name,
  keyHash,
  permissions,
}: {
  userId: string;

  name: string;
  keyHash: string;
  permissions: {
    channel: Array<ChannelType>;
    actions: Array<"single" | "bulk">;
  };
}) => {
  try {
    return await ApiKeyModel.create({
      userId,
      name,
      keyHash,
      permissions,
    });
  } catch (err) {
    throw err;
  }
};

export const getAllApiKeyByUserId = async (
  userId: string,
): Promise<IApiKey[]> => {
  try {
    return await ApiKeyModel.find({ userId }).lean();
  } catch (err) {
    throw err;
  }
};

export const deleteApiKeyById = async (
  _id: string,
): Promise<mongoose.DeleteResult> => {
  try {
    return await ApiKeyModel.deleteOne({ _id });
  } catch (err) {
    throw err;
  }
};
