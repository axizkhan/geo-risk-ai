import { createAnalyticsDailyDoc } from "@repo/db";

export async function createAnalyticsDaily(userId: string) {
  try {
    return await createAnalyticsDailyDoc(userId);
  } catch (err) {
    throw err;
  }
}
