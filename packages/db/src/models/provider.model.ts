import {
  ChannelType,
  channelTypeSchema,
  EncryptedProviderConfig,
  ProviderName,
  providerNameSchema,
} from "@repo/shared";
import mongoose from "mongoose";

export type IProvider = {
  _id: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId | string;
  type: ChannelType;
  provider_name: ProviderName;
  isEnable: boolean;
  config: EncryptedProviderConfig;
};

const providerSchema = new mongoose.Schema<IProvider>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  type: {
    type: String,
    enum: channelTypeSchema.options,
    required: true,
  },
  provider_name: {
    type: String,
    enum: providerNameSchema.options,
    required: true,
  },
  isEnable: {
    type: Boolean,
    required: true,
    default: true,
  },
  config: {
    configCipher: {
      type: String,
      required: true,
    },
    iv: {
      type: String,
      required: true,
    },
  },
});

providerSchema.index({ userId: 1, provider_name: 1 });
providerSchema.index({ userId: 1, type: 1 });
providerSchema.index({ userId: 1, type: 1, provider_name: 1 });

export const ProviderModel = mongoose.model<IProvider>(
  "Provider",
  providerSchema,
);
