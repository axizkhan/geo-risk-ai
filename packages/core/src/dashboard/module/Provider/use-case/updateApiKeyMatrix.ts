import { updateDailyApiMatrix } from "@repo/db";

export async function updateDailyApiKeyMatrix({
  id,
  isSuccess,
}: {
  id: string;
  isSuccess: boolean;
}): Promise<{ success: boolean }> {
  try {
    let result = await updateDailyApiMatrix({
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
