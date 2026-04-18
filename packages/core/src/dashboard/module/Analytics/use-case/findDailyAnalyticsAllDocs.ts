import {
  FindAnalyticsRangeDoc,
  findDailyAnalyticsDoc,
  findDailyChannelDocs,
} from "@repo/db";
import { FindChannelRangeDoc } from "@repo/db";

export async function findAllDailyAnalyticsDocs({
  userId,
}: {
  userId: string;
}): Promise<{
  success: boolean;
  message: string;
  data: FindAnalyticsRangeDoc | null;
}> {
  try {
    let result = await findDailyAnalyticsDoc(userId);

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
