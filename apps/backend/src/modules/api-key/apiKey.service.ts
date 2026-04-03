import { ApiKeyCreationService } from "@repo/shared";
import { ApiKeyCreationRequest } from "../../types/authRequest";
import { apiKeyCreation } from "@repo/core";

export async function apiKeyCreationService(data: ApiKeyCreationService) {
  try {
    return await apiKeyCreation(data);
  } catch (err) {
    throw err;
  }
}
