import { summaryAnalyticsQuery } from "@repo/db";

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
    return await summaryAnalyticsQuery({ userId, endDate, startDate });
  } catch (err) {
    throw err;
  }
}
