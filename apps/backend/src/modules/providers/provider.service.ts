import {
  createProvider,
  deleteProvider,
  getAllProvider,
  toggleProvider,
  updateProviderConfig,
} from "@repo/core";
import { providerCreationDTO, ProviderName } from "@repo/shared";
import { ProviderCreateReturnDTO } from "./provider.types";

export async function createProviderService(
  data: providerCreationDTO,
  userId: string,
): Promise<ProviderCreateReturnDTO> {
  try {
    const createdProvider = await createProvider(data, userId);

    return {
      success: true,
      data: {
        _id: createdProvider._id.toString(),
        provider_name: createdProvider.provider_name,
        channel: createdProvider.type,
        userId: createdProvider.userId.toString(),
      },
    };
  } catch (err) {
    throw err;
  }
}

export async function getAllProviderService(userId: string) {
  try {
    return await getAllProvider(userId);
  } catch (err) {
    throw err;
  }
}

export async function updateProviderConfigService({
  providerId,
  config,
  provider_name,
  userId,
}: {
  providerId: string;
  config: any;
  provider_name: ProviderName;
  userId: string;
}) {
  try {
    return await updateProviderConfig({
      providerId,
      provider_name,
      config,
      userId,
    });
  } catch (err) {
    throw err;
  }
}

export async function toggleProviderService({
  providerId,
  isActive,
  userId,
}: {
  providerId: string;
  isActive: boolean;
  userId: string;
}) {
  try {
    return await toggleProvider({ isActive, providerId, userId });
  } catch (err) {
    throw err;
  }
}

export async function deleteProviderService({
  userId,
  providerId,
}: {
  userId: string;
  providerId: string;
}) {
  try {
    return await deleteProvider({ userId, providerId });
  } catch (err) {
    throw err;
  }
}
