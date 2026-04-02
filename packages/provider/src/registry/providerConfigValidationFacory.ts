import { ZodSafeParseResult } from "zod";
import {
  DummyProviderConfig,
  DummyProviderType,
  SmtpConfig,
} from "../providers/email/smtp/smtp.types";
import { ProviderName } from "@repo/shared";
import { validateSmtpConfig } from "../providers/email/smtp/smtp.validator";

type AllProviderSchema = SmtpConfig | DummyProviderType;

type ProviderEntry = {
  validateConfig: (config: any) => ZodSafeParseResult<AllProviderSchema>;
};

export const providerValidatorsFactory: Record<ProviderName, ProviderEntry> = {
  smtp: {
    validateConfig: validateSmtpConfig,
  },
  resend: {
    validateConfig: (config) => {
      return DummyProviderConfig.safeParse(config);
    },
  },
  sendgrid: {
    validateConfig: (config) => {
      return DummyProviderConfig.safeParse(config);
    },
  },
  twilio: {
    validateConfig: (config) => {
      return DummyProviderConfig.safeParse(config);
    },
  },
};
