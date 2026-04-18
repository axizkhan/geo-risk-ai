import { updateDailyAnalyticsMatric, updateDailyChannelMatrix } from "@repo/db";
import { ChannelType } from "@repo/shared";

export async function updateDailyAnalyticsMatrix({
  userId,
  id,
  isSuccess,
}: {
  userId: string;
  id: ChannelType;
  isSuccess: boolean;
}): Promise<{ success: boolean }> {
  try {
    let result = await updateDailyAnalyticsMatric({
      userId,
      id,
      isSuccess,
    });

    if (!result.modifiedCount) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    throw err;
  }
}
