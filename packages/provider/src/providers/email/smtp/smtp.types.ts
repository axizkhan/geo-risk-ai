import * as z from "zod";

export const SmtpConfigSchema = z.object({
  host: z.string(),
  port: z.number(),
  secure: z.boolean(),
  auth: z.object({
    user: z.email(),
    pass: z.string(),
  }),
});

export type SmtpConfig = z.infer<typeof SmtpConfigSchema>;

export const DummyProviderConfig = z.object({
  config: z.string(),
});

export type DummyProviderType = z.infer<typeof DummyProviderConfig>;
