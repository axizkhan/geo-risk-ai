import * as z from "zod";
import { actionSchema } from "./apiKeyschema";
import { channelTypeSchema } from "./provider.schema";
import { standeredResSchema } from "./standeredRes.schema";

export const messageStatusSchema = z.enum([
  "pending",
  "processing",
  "completed",
  "failed",
  "partial",
]);

export const createMessageQuerySchema = z.object({
  apiToken: z.string().length(64),
  type: actionSchema,
  channel: channelTypeSchema,
});

export const createMessageBodySchema = z.object({
  reciepent: z.array(z.string()),
  content: z.string(),
});

export const createMessageServiceSchema = z.object({
  ...createMessageBodySchema.shape,
  ...createMessageQuerySchema.shape,
  userId: z.string(),
});

export const getMessageParams = z.object({
  id: z.string(),
});

export const getMessageDataSchema = z.object({
  content: z.string(),
  channel: z.string(),
  status: z.string(),
  totalCount: z.number(),
  successCount: z.number(),
  failedCount: z.number(),
  jobStartedAt: z.date().nullable().optional(),
  jobEndAt: z.date().nullable().optional(),
  providerName: z.string().optional(),
  providerType: z.string().optional(),
});

export const getMessageResSchema = standeredResSchema(getMessageDataSchema);

export const getMessageStatusQuey = z.object({
  status: z.enum(["failed", "partial", "success"]),
});

export const getMessageStatus = z.array(
  z.object({
    content: z.string(),
    channel: z.enum(channelTypeSchema.options),
  }),
);
