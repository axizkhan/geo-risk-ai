import { ApiKeyCreationService } from "@repo/shared";
import { ApiKeyCreationRequest } from "../../types/authRequest";
import { apiKeyCreation, apiKeyDeletion, getAllApiKey } from "@repo/core";

export async function apiKeyCreationService(data: ApiKeyCreationService) {
  try {
    return await apiKeyCreation(data);
  } catch (err) {
    throw err;
  }
}

export async function getAllApiKeyService(userId: string) {
  try {
    return await getAllApiKey(userId);
  } catch (err) {}
}

export async function apiKeyDeletionService(apiKeyId: string) {
  try {
    return await apiKeyDeletion(apiKeyId);
  } catch (err) {
    throw err;
  }
}
