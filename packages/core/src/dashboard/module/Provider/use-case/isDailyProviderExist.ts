import { IDailyProvider, isDailyProviderExist } from "@repo/db";

export async function isDailyProviderExistDoc({
  userId,
  providerId,
}: {
  userId: string;
  providerId: string;
}): Promise<{ success: boolean; data: IDailyProviderLean | null }> {
  try {
    let result = await isDailyProviderExist({ userId, providerId });
    if (!result) {
      return { success: false, data: null };
    }
    return { success: true, data: result };
  } catch (err) {
    throw err;
  }
}
