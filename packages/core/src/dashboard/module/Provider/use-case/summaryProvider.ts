import { summaryAnalyticsQuery, summaryProviderQuery } from "@repo/db";

export async function summaryAnalytics({
  userId,
  endDate,
  startDate,
}: {
  userId: string;
  endDate: Date;
  startDate: Date;
}) {
  try {
    return await summaryProviderQuery({ userId, endDate, startDate });
  } catch (err) {
    throw err;
  }
}
