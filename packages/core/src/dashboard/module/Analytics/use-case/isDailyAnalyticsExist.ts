import {
  IDailyAnalytics,
  IDailyChannel,
  isDailyChannelExistQuery,
  isUserDailyAnalyticsExist,
} from "@repo/db";
import { ChannelType } from "@repo/shared";

export async function isDailyAnalyticsExist(
  userId: string,
): Promise<{ success: boolean; data: IDailyAnalytics | null }> {
  try {
    let result = await isUserDailyAnalyticsExist(userId);
    if (!result) {
      return { success: false, data: null };
    }
    return { success: true, data: result };
  } catch (err) {
    throw err;
  }
}
