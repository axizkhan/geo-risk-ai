import { IDailyApi, isDailyApiKeyDocExist } from "@repo/db";
import { IDailyApiKeyLean } from "@repo/db/src/models/dashboard/dailyApiKey.model";

export async function findDailyApiKey({
  userId,
  apiKeyId,
}: {
  userId: string;
  apiKeyId: string;
}): Promise<{ success: boolean; data: IDailyApiKeyLean | null }> {
  try {
    let result = await isDailyApiKeyDocExist({ userId, apiKeyId });
    if (!result) {
      return { success: false, data: null };
    }
    return { success: true, data: result };
  } catch (err) {
    throw err;
  }
}
