import { dailyAnalyticsDocPagination, IDailyAnalytics } from "@repo/db";
import { IDailyAnalyticLean } from "@repo/db/src/models/dashboard/dailyAnalytics.model";

export async function dailyAnalyticsPagination({
  userId,
  page,
  limit,
}: {
  userId: string;
  page: number;
  limit: number;
}): Promise<{
  success: boolean;
  message: string;
  data: Array<IDailyAnalyticLean> | null;
}> {
  try {
    let skip: number = limit * (page - 1);
    let result = await dailyAnalyticsDocPagination({ userId, skip, limit });

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
