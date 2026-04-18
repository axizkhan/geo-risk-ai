import { dailyProviderDocPagination, IDailyProvider } from "@repo/db";

export async function dailyProviderPagination({
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
  data: Array<IDailyProvider> | null;
}> {
  try {
    let skip: number = limit * (page - 1);
    let result = await dailyProviderDocPagination({ userId, skip, limit });

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
