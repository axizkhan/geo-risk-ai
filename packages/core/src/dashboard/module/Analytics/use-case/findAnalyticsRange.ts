import { FindAnalyticsRangeDoc, findDailyAnalyticsDocRange } from "@repo/db";

export async function findAnalyticsRange({
  userId,
  startDate,
  endDate,
}: {
  userId: string;
  startDate: string;
  endDate: string;
}): Promise<{
  success: boolean;
  message: string;
  data: FindAnalyticsRangeDoc | null;
}> {
  try {
    let startDateConver = new Date(startDate);
    let endDateConver = new Date(endDate);

    let result = await findDailyAnalyticsDocRange({
      userId,
      startDate: startDateConver,
      endDate: endDateConver,
    });

    if (!result.data.length) {
      return {
        success: false,
        message: "document found for this range",
        data: null,
      };
    }
    return {
      success: true,
      message: "Documents found successFully",
      data: result,
    };
  } catch (err) {
    throw err;
  }
}
