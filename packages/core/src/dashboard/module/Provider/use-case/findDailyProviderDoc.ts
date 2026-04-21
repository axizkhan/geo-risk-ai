import { IDailyProvider, isDailyProviderExist } from "@repo/db";
import { IDailyProviderLean } from "@repo/db/src/models/dashboard/dailyProvider.model";

export async function findDailyProvider({
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
