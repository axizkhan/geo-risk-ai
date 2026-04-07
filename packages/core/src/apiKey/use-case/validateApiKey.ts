import { ApiKeyAction, ChannelType } from "@repo/shared";
import { apiKeyCreation } from "./apiKeyCreation";
import { hashApiKeyFunc } from "../utils/apiKeyHash";
import { findApiKeyByToken } from "@repo/db";
import { apiKeyPerValid } from "../utils/apiKeyValidation";

export async function validateApiKey({
  apiToken,
  type,
  channel,
  userId,
}: {
  apiToken: string;
  type: ApiKeyAction;
  channel: ChannelType;
  userId: string;
}): Promise<{ success: boolean; hashApiKey: string }> {
  try {
    const hashedKey = await hashApiKeyFunc(apiToken, userId);
    const apiKeyDoc = await findApiKeyByToken({ hashedKey });

    if (!apiKeyDoc) {
      throw new Error("ApiKey don't exist");
    }

    const apiKeyValid = apiKeyPerValid({
      type,
      channel,
      permission: apiKeyDoc.permissions,
    });

    if (!apiKeyValid.success) {
      throw new Error(apiKeyValid.error.errors.toString());
    }

    return { success: true, hashApiKey: hashedKey };
  } catch (err) {
    throw err;
  }
}
