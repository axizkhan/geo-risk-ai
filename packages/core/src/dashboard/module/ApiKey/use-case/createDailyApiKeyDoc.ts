import { createDailyApiKeyDoc } from "@repo/db";
import { ApiKeyAction, ChannelType } from "@repo/shared";

export async function createDailyApiKey({
  userId,
  apiKeyId,
  channel,
  types,
}: {
  userId: string;
  apiKeyId: string;
  channel: [ChannelType];
  types: [ApiKeyAction];
}) {
  try {
    return await createDailyApiKeyDoc({ userId, apiKeyId, channel, types });
  } catch (err) {
    throw err;
  }
}
