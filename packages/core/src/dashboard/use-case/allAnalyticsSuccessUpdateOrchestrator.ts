import {
  updateChannelMatrix,
  updateDailyAnalyticsMatrix,
  updateDailyApiKeyMatrix,
  updateDailyProviderDocMatrix,
} from "../module";

export async function allAnalyticsMatricSuccess({
  analyticsDocsId,
  isSuccess,
}: {
  analyticsDocsId: {
    analyticsId: string;
    providerAnalyticsId: string;
    channelAnalyticsId: string;
    apiKeyAnalyticsId: string;
  };
  isSuccess: boolean;
}): Promise<{ success: boolean; message: string }> {
  try {
    const {
      analyticsId,
      providerAnalyticsId,
      apiKeyAnalyticsId,
      channelAnalyticsId,
    } = analyticsDocsId;

    await Promise.all([
      updateDailyAnalyticsMatrix({ isSuccess, id: analyticsId }),
      updateChannelMatrix({ isSuccess, id: channelAnalyticsId }),
      updateDailyApiKeyMatrix({ id: apiKeyAnalyticsId, isSuccess }),
      updateDailyProviderDocMatrix({ id: providerAnalyticsId, isSuccess }),
    ]);
    return { success: true, message: "all the matrix update successfully" };
  } catch (err) {
    throw err;
  }
}
