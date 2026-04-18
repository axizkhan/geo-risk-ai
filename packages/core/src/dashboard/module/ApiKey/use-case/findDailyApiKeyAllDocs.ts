import { FindApiKeyRange, findDailyApiKeyDocs } from "@repo/db";

export async function findAllDailyApiKeyDocs({
  userId,
}: {
  userId: string;
}): Promise<{
  success: boolean;
  message: string;
  data: FindApiKeyRange | null;
}> {
  try {
    let result = await findDailyApiKeyDocs(userId);

    if (!result.data.length) {
      return {
        success: false,
        message: "document found for this range",
        data: null,
      };
    }
    return {
      success: true,
      message: "Documents found successFully",
      data: result,
    };
  } catch (err) {
    throw err;
  }
}
