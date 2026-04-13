import { getAllApiKeyByUserId } from "@repo/db";
import { IApiKey } from "packages/db/src/models/apiKey.model";
import { success } from "zod";

export async function getAllApiKey(userId: string): Promise<{
  success: boolean;
  message: string;
  data: Array<IApiKey>;
}> {
  try {
    const allApiKey = await getAllApiKeyByUserId(userId);
    if (!allApiKey.length) {
      return { success: true, message: "No api keys", data: [] };
    }
    return { success: true, message: "Api keys found", data: allApiKey };
  } catch (err) {
    throw err;
  }
}
