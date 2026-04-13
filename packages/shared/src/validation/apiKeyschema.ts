import { channel } from "node:diagnostics_channel";
import * as z from "zod";
import { channelTypeSchema } from "./provider.schema";

export const actionSchema = z.enum(["single", "bulk"]);

export const apiKeyCreationSchems = z.object({
  apiKeyName: z.string(),
  permissions: z.object({
    channel: z.array(channelTypeSchema),
    actions: z.array(actionSchema),
  }),
});

export const apiKeyCreationServiceSchema = apiKeyCreationSchems.extend({
  userId: z.string(),
});

export const apiKeyDeletionSchema = z.object({
  id: z.string(),
});
