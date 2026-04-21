import {
  ApiKeyCreationService,
  ChannelType,
  NotFound,
  BadRequest,
  InternalServerError,
} from "@repo/shared";
import {
  PROVIDER_ERROR_CODE,
  VALIDATION_ERROR_CODE,
  SYSTEM_ERROR_CODE,
  ERROR_TYPE,
} from "@repo/shared";
import { apiKeyGenerator } from "../utils/apiKeyGenerator";
import { hashApiKeyFunc } from "../utils/apiKeyHash";
import { createApiKeyDoc, findAllProviderByUserId } from "@repo/db";
import { userRequiredProvider } from "../utils/userRequiredProvider";

export async function apiKeyCreation(data: ApiKeyCreationService) {
  try {
    const { apiKeyName, permissions, userId } = data;
    const rawApiKey = apiKeyGenerator();
    const hashApiKey = await hashApiKeyFunc(rawApiKey, userId);
    const allUserProvider = await findAllProviderByUserId(data.userId);

    if (!allUserProvider) {
      throw new NotFound({
        appCode: PROVIDER_ERROR_CODE.NOT_FOUND,
        errorType: ERROR_TYPE.BUSINESS,
        message: "Provider does not exist",
      });
    }

    const allProviderType = allUserProvider.map((provider) => provider.type);

    const providerForChannel = userRequiredProvider(
      // @ts-ignore
      allProviderType,
      permissions.channel,
    );

    if (providerForChannel.success) {
      throw new BadRequest({
        appCode: VALIDATION_ERROR_CODE.SCHEMA_VALIDATION_FAILED,
        errorType: ERROR_TYPE.VALIDATION,
        message: providerForChannel.message,
      });
    }

    const newApiKeyDoc = await createApiKeyDoc({
      keyHash: hashApiKey,
      name: apiKeyName,
      userId: userId,
      permissions: permissions,
    });

    if (!newApiKeyDoc) {
      throw new InternalServerError({
        appCode: SYSTEM_ERROR_CODE.INTERNAL_SERVER_ERROR,
        errorType: ERROR_TYPE.SYSTEM,
        message: "Failed to create API key",
      });
    }

    return {
      success: true,
      apiKey: rawApiKey,
    };
  } catch (err) {
    throw err;
  }
}
