import * as z from "zod";
export const channelTypeSchema = z.enum(["sms", "email", "whatsapp"]);

export const providerNameSchema = z.enum([
  "smtp",
  "resend",
  "sendgrid",
  "twilio",
]);

export const providerCreationSchema = z.object({
  type: channelTypeSchema,
  provider_name: providerNameSchema,
  config: z.object(),
});

export const provideConfigUpdateSchema = z.object({
  provider_name: providerNameSchema,
  config: z.object(),
});

export const providerToggleParamsSchema = z.object({
  providerId: z.string(),
});

export const providerToggleQuerySchema = z.object({
  isActive: z.boolean(),
});

export const providerDeleteQuerySchema = z.object({
  id: z.string(),
});
