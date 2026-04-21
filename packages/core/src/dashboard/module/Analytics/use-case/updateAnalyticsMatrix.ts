import { updateDailyAnalyticsMatric } from "@repo/db";

export async function updateDailyAnalyticsMatrix({
  id,
  isSuccess,
}: {
  id: string;
  isSuccess: boolean;
}): Promise<{ success: boolean }> {
  try {
    let result = await updateDailyAnalyticsMatric({
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
