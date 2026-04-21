import { findDailyChannelDoc } from "@repo/db";
import { IDailyChannelLean } from "@repo/db/src/models/dashboard/dailyChannel.model";

export async function findDailyChannel(
  userId: string,
): Promise<{ success: boolean; data: IDailyChannelLean | null }> {
  try {
    let result = await findDailyChannelDoc(userId);
    if (!result) {
      return { success: false, data: null };
    }
    return { success: true, data: result };
  } catch (err) {
    throw err;
  }
}
