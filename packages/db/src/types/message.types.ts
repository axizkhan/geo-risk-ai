import mongoose from "mongoose";
import * as z from "zod";

export type MessageStatus = {
  _id: mongoose.Schema.Types.ObjectId;
  totalCount: number;
  successCount: number;
  failedCount: number;
};

export const CHANNEL_TYPES = ["sms", "email", "whatsapp"] as const;
export const PROVIDER_NAMES = ["smtp", "resend", "sendgrid", "twilio"] as const;

export type ChannelType = (typeof CHANNEL_TYPES)[number];
export type ProviderName = (typeof PROVIDER_NAMES)[number];

export const channelTypeSchema = z.enum(CHANNEL_TYPES);
export const providerNameSchema = z.enum(PROVIDER_NAMES);
