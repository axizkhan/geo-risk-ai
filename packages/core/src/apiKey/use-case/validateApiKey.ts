import { ApiKeyAction, ChannelType, NotFound, BadRequest } from "@repo/shared";
import {
  API_KEY_ERROR_CODE,
  ERROR_TYPE,
  VALIDATION_ERROR_CODE,
} from "@repo/shared";
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
      throw new NotFound({
        appCode: API_KEY_ERROR_CODE.NOT_FOUND,
        errorType: ERROR_TYPE.BUSINESS,
        message: "API key does not exist",
      });
    }

    const apiKeyValid = apiKeyPerValid({
      type,
      channel,
      permission: apiKeyDoc.permissions,
    });

    if (!apiKeyValid.success) {
      throw new BadRequest({
        appCode: VALIDATION_ERROR_CODE.SCHEMA_VALIDATION_FAILED,
        errorType: ERROR_TYPE.VALIDATION,
        message: apiKeyValid.error.errors.toString(),
      });
    }

    return { success: true, hashApiKey: hashedKey };
  } catch (err) {
    throw err;
  }
}
