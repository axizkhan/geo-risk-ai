import { findDailyChannelDocs } from "@repo/db";
import { FindChannelRangeDoc } from "@repo/db";

export async function findAllDailyChannel({
  userId,
}: {
  userId: string;
}): Promise<{
  success: boolean;
  message: string;
  data: FindChannelRangeDoc | null;
}> {
  try {
    let result = await findDailyChannelDocs(userId);

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
