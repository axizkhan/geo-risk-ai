import { updateDailyAnalyticsMatric, updateDailyChannelMatrix } from "@repo/db";
import { ChannelType } from "@repo/shared";

export async function updateChannelMatrix({
  userId,
  channelType,
  isSuccess,
}: {
  userId: string;
  channelType: ChannelType;
  isSuccess: boolean;
}): Promise<{ success: boolean }> {
  try {
    let result = await updateDailyChannelMatrix({
      userId,
      channelType,
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
