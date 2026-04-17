import { findDailyChannelDoc, IDailyChannel } from "@repo/db";

export async function findDailyChannel(
  userId: string,
): Promise<{ success: boolean; data: IDailyChannel | null }> {
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
