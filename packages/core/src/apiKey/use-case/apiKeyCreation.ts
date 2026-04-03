import { ApiKeyCreationService, ChannelType } from "@repo/shared";
import { apiKeyGenerator } from "../utils/apiKeyGenerator";
import { hashApiKeyFunc } from "../utils/apiKeyHash";
import { createApiKeyDoc, findAllProviderByUserId } from "@repo/db";
import { userRequiredProvider } from "../utils/userRequiredProvider";

export async function apiKeyCreation(data: ApiKeyCreationService) {
  try {
    const { apiKeyName, permissions, userId } = data;
    const rawApiKey = apiKeyGenerator();
    const hashApiKey = await hashApiKeyFunc(rawApiKey);
    const allUserProvider = await findAllProviderByUserId(data.userId);

    if (!allUserProvider) {
      throw new Error("Provider dont exist");
    }

    const allProviderType = allUserProvider.map((provider) => provider.type);

    const providerForChannel = userRequiredProvider(
      // @ts-ignore
      allProviderType,
      data.permissions.channel,
    );

    if (providerForChannel.success) {
      throw new Error(providerForChannel.message);
    }

    const newApiKeyDoc = await createApiKeyDoc({
      keyHash: hashApiKey,
      name: apiKeyName,
      userId: userId,
      permissions: permissions,
    });

    if (!newApiKeyDoc) {
      throw new Error("Internal server error");
    }

    return {
      success: true,
      apiKey: rawApiKey,
    };
  } catch (err) {
    throw err;
  }
}
