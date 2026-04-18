import { IDailyApi, isDailyApiKeyDocExist } from "@repo/db";

export async function findDailyApiKey({
  userId,
  apiKeyId,
}: {
  userId: string;
  apiKeyId: string;
}): Promise<{ success: boolean; data: IDailyApi | null }> {
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
