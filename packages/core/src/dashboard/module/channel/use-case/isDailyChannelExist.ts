import { IDailyChannel, isDailyChannelExistQuery } from "@repo/db";
import { ChannelType } from "@repo/shared";

export async function isDailyChannelExist({
  userId,
  channelType,
}: {
  userId: string;
  channelType: ChannelType;
}): Promise<{ success: boolean; data: IDailyChannel | null }> {
  try {
    let result = await isDailyChannelExistQuery({ userId, channelType });
    if (!result) {
      return { success: false, data: null };
    }
    return { success: true, data: result };
  } catch (err) {
    throw err;
  }
}
