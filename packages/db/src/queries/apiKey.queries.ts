import { ChannelType } from "@repo/shared";
import { ApiKeyModel } from "../models/apiKey.model";
import { IApiKey } from "../models/apiKey.model";
import mongoose from "mongoose";

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
