import * as z from "zod";
import { actionSchema } from "./apiKeyschema";
import { channelTypeSchema } from "./provider.schema";

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
