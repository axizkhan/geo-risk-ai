import { IDailyAnalytics, isUserDailyAnalyticsExist } from "@repo/db";

export async function findDailyAnalytics(
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
