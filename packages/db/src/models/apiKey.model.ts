import { ApiKeyAction, ChannelType, channelTypeSchema } from "@repo/shared";
import mongoose, { mongo } from "mongoose";
import { channel } from "node:diagnostics_channel";
import { permission } from "node:process";
import { string } from "zod";
import { required } from "zod/v4/core/util.cjs";

export type IApiKey = {
  _id: mongoose.Schema.Types.ObjectId | string;
  userId: mongoose.Schema.Types.ObjectId | string;
  keyHash: string;
  permissions: {
    channel: Array<ChannelType>;
    actions: Array<ApiKeyAction>;
  };
  name: string;
  lastUsedAt: Date;
};

const apiKeySchema = new mongoose.Schema<IApiKey>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    keyHash: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    permissions: {
      channel: {
        type: [String],
        enum: channelTypeSchema.options,
        required: true,
      },
      actions: {
        type: [String],
        enum: ["single", "bulk"],
        required: true,
      },
    },
    lastUsedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

export const ApiKeyModel = mongoose.model<IApiKey>("ApiKey", apiKeySchema);
