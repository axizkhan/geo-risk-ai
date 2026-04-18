import {
  FindApiKeyRange,
  findDailyApiKeyDocs,
  findDailyProviderDocs,
  FindProviderRange,
} from "@repo/db";

export async function findAllDailyProviderDocs({
  userId,
}: {
  userId: string;
}): Promise<{
  success: boolean;
  message: string;
  data: FindProviderRange | null;
}> {
  try {
    let result = await findDailyProviderDocs(userId);

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
