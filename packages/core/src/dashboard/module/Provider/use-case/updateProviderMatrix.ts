import { updateDailyProviderMatrix } from "@repo/db";

export async function updateDailyProviderDocMatrix({
  id,
  isSuccess,
}: {
  id: string;
  isSuccess: boolean;
}): Promise<{ success: boolean }> {
  try {
    let result = await updateDailyProviderMatrix({
      _id: id,
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
