import { ChannelType, ProviderName } from "@repo/shared";

export const channelSupportMap: Record<ProviderName, Array<ChannelType>> = {
  resend: ["email"],
  smtp: ["email"],
  sendgrid: ["email"],
  twilio: ["email", "sms"],
};
