import { ChannelType, ProviderName } from "@repo/shared";
import { channelSupportMap } from "./channelSupportMap";

export const validateProviderChannel = (
  providerName: ProviderName,
  channel: ChannelType,
) => {
  const requestedProvider = channelSupportMap[providerName];
  if (!requestedProvider) {
    throw new Error("Provider don't exist");
  }

  return requestedProvider.includes(channel);
};
