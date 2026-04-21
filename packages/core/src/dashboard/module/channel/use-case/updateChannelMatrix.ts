import { updateDailyChannelMatrix } from "@repo/db";
import { ChannelType } from "@repo/shared";

export async function updateChannelMatrix({
  id,
  isSuccess,
}: {
  id: string;
  isSuccess: boolean;
}): Promise<{ success: boolean }> {
  try {
    let result = await updateDailyChannelMatrix({
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
