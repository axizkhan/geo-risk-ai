import { ApiKeyAction, ChannelType } from "@repo/shared";
import {
  createAnalyticsDaily,
  createChannelAnalyticsDaily,
  createDailyApiKey,
  createProviderDaily,
  isDailyAnalyticsExist,
  isDailyApiKeyExist,
  isDailyChannelExist,
  isDailyProviderExistDoc,
} from "../module";

export const findOrCreateAnalyticsDoc = async ({
  userId,
  providerId,
  apiKeyId,
  channel,
  types,
}: {
  userId: string;
  providerId: string;
  apiKeyId: string;
  channel: [ChannelType];
  types: [ApiKeyAction];
}) => {
  try {
    /**find analytics doc if exist ok if not than create new one */
    let analyticsDoc = (await isDailyAnalyticsExist(userId)).data;
    if (!analyticsDoc) {
      analyticsDoc = await createAnalyticsDaily(userId);
    }

    /**find apiKey doc if exist ok if not than create new api key doc */
    let apiKeyDoc = (await isDailyApiKeyExist({ userId, apiKeyId })).data;
    if (!apiKeyDoc) {
      apiKeyDoc = await createDailyApiKey({ userId, apiKeyId, channel, types });
    }

    /**find channel doc if exist ok if not create new one*/
    let channelDoc = (
      await isDailyChannelExist({ userId, channelType: channel[0] })
    ).data;
    if (!channelDoc) {
      channelDoc = await createChannelAnalyticsDaily({
        userId,
        channelType: channel[0],
      });
    }

    let providerDoc = (await isDailyProviderExistDoc({ userId, providerId }))
      .data;

    if (!providerDoc) {
      providerDoc = await createProviderDaily({ userId, providerId });
    }

    return {
      analyticsId: analyticsDoc._id.toString(),
      providerAnalyticsId: providerDoc._id.toString(),
      channelAnalyticslId: channelDoc._id.toString(),
      apiKeyAnalyticsId: apiKeyDoc._id.toString(),
    };
  } catch (err) {
    throw err;
  }
};
