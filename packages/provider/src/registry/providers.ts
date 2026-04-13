import { ProviderName } from "@repo/shared";
import { smtpProvider } from "../providers";

type Provider = {
  send: ({
    config,
    payload,
    recipient,
  }: {
    config: any;
    payload: any;
    recipient: string;
  }) => Promise<{ success: boolean; error?: any; isRetryable?: boolean }>;
};

export const providers: Partial<Record<ProviderName, Provider>> = {
  smtp: smtpProvider,
};
