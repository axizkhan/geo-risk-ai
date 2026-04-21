import { ChannelType, ProviderName, InternalServerError } from "@repo/shared";
import { SYSTEM_ERROR_CODE, ERROR_TYPE } from "@repo/shared";
import { channelSupportMap } from "./channelSupportMap";

export const validateProviderChannel = (
  providerName: ProviderName,
  channel: ChannelType,
) => {
  const requestedProvider = channelSupportMap[providerName];
  if (!requestedProvider) {
    throw new InternalServerError({
      appCode: SYSTEM_ERROR_CODE.INTERNAL_SERVER_ERROR,
      errorType: ERROR_TYPE.SYSTEM,
      message: `Provider '${providerName}' is not configured`,
    });
  }

  return requestedProvider.includes(channel);
};
