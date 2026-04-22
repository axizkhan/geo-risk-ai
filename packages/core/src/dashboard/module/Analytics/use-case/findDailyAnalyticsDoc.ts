import { isUserDailyAnalyticsExist } from "@repo/db";
import { IDailyAnalyticLean } from "@repo/db/src/models/dashboard/dailyAnalytics.model";

export async function findDailyAnalytics(
  userId: string,
): Promise<{ success: boolean; data: IDailyAnalyticLean | null }> {
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
