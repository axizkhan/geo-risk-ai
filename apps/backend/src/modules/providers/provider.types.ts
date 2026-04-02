import { ChannelType, ProviderName } from "@repo/shared";

export type ProviderCreateReturnDTO = {
  _id: string;
  userId: string;
  channel: ChannelType;
  provider_name: ProviderName;
};
