import { createDailyApiKeyDoc, createDailyProviderAnyDoc } from "@repo/db";
import { ApiKeyAction, ChannelType } from "@repo/shared";

export async function createProviderDaily({
  userId,
  providerId,
}: {
  userId: string;
  providerId: string;
}) {
  try {
    return await createDailyProviderAnyDoc({ userId, providerId });
  } catch (err) {
    throw err;
  }
}
