import { dailyAnalyticsDocRangePagination, IDailyAnalytics } from "@repo/db";

export async function dailyAnalyticsRangePagination({
  userId,
  page,
  limit,
  startDate,
  endDate,
}: {
  userId: string;
  page: number;
  limit: number;
  startDate: string;
  endDate: string;
}): Promise<{
  success: boolean;
  message: string;
  data: Array<IDailyAnalytics> | null;
}> {
  try {
    let startDateCon = new Date(startDate);
    let endDateCon = new Date(endDate);
    let skip: number = limit * (page - 1);
    let result = await dailyAnalyticsDocRangePagination({
      userId,
      skip,
      limit,
      startDate: startDateCon,
      endDate: endDateCon,
    });

    if (!result) {
      return { success: false, message: "Their is no data", data: null };
    }

    return {
      success: true,
      message: "Documents found successfully",
      data: result,
    };
  } catch (err) {
    throw err;
  }
}
