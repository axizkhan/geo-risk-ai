import { ApiKeyCreationService } from "@repo/shared";

import { apiKeyCreation, apiKeyDeletion, getAllApiKey } from "@repo/core";

export async function apiKeyCreationService(
  data: ApiKeyCreationService,
): Promise<{ success: boolean; data: Record<string, any> }> {
  try {
    let result = await apiKeyCreation(data);
    return { success: result.success, data: { apiKey: result.apiKey } };
  } catch (err) {
    throw err;
  }
}

export async function getAllApiKeyService(userId: string) {
  try {
    let result = await getAllApiKey(userId);
    return { success: result.success, data: { apiKeys: result.data } };
  } catch (err) {
    throw err;
  }
}

export async function apiKeyDeletionService(apiKeyId: string) {
  try {
    let result = await apiKeyDeletion(apiKeyId);
    return { success: result.success, data: null };
  } catch (err) {
    throw err;
  }
}
