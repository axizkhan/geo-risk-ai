import mongoose from "mongoose";
import { CHANNEL_TYPES, PROVIDER_NAMES } from "../types/message.types";

const providerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  type: {
    type: String,
    enum: CHANNEL_TYPES,
    required: true,
  },
  provider_name: {
    type: String,
    enum: PROVIDER_NAMES,
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
providerSchema.index({ userId: 1, isEnable: 1 });

export type IProvider = mongoose.InferSchemaType<typeof providerSchema>;

export const ProviderModel = mongoose.model<IProvider>(
  "Provider",
  providerSchema,
);
