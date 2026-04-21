import { dailyApiKeyDocPagination } from "@repo/db";
import { IDailyApiKeyLean } from "@repo/db/src/models/dashboard/dailyApiKey.model";

export async function dailyApiKeyPagination({
  userId,
  page,
  limit,
}: {
  userId: string;
  page: number;
  limit: number;
}): Promise<{
  success: boolean;
  message: string;
  data: Array<IDailyApiKeyLean> | null;
}> {
  try {
    let skip: number = limit * (page - 1);
    let result = await dailyApiKeyDocPagination({ userId, skip, limit });

    if (!result) {
      return { success: false, message: "Their is no data", data: null };
    }

    return {
      success: true,
      message: "Documents found successfully",
      data: result,
    };
  } catch (err) {
    throw err;
  }
}
