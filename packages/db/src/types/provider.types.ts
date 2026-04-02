import {
  ChannelType,
  EncryptedProviderConfig,
  ProviderName,
} from "@repo/shared";

export type providerCreateDoc = {
  provider_name: ProviderName;
  type: ChannelType;
  userId: string;
  config: EncryptedProviderConfig;
};
