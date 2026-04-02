import { ZodSafeParseResult } from "zod";
import { SmtpConfig, SmtpConfigSchema } from "./smtp.types";

export function validateSmtpConfig(
  config: any,
): ZodSafeParseResult<SmtpConfig> {
  return SmtpConfigSchema.safeParse(config);
}
