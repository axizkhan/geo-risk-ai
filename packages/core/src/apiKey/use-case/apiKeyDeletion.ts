import { deleteApiKeyById } from "@repo/db";

export async function apiKeyDeletion(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    let apiKeyDeleteionResult = await deleteApiKeyById(id);
    if (!apiKeyDeleteionResult.deletedCount) {
      return { success: true, message: "No api key is deleted" };
    }
    return {
      success: true,
      message: "Api ket is successfully deleted",
    };
  } catch (err) {
    throw err;
  }
}
