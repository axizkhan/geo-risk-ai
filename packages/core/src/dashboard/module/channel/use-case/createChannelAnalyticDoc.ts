import { createDailyChannelDoc } from "@repo/db";
import { ChannelType } from "@repo/shared";

export async function createAnalyticsDaily({
  userId,
  channelType,
}: {
  userId: string;
  channelType: ChannelType;
}) {
  try {
    return await createDailyChannelDoc({ userId, channelType });
  } catch (err) {
    throw err;
  }
}
