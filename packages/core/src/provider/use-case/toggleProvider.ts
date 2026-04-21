import {
  findProviderByProviderIdAndUserId,
  toggleProviderById,
} from "@repo/db";
import { NotFound } from "@repo/shared";
import { PROVIDER_ERROR_CODE, ERROR_TYPE } from "@repo/shared";

export async function toggleProvider({
  providerId,
  userId,
  isActive,
}: {
  userId: string;
  providerId: string;
  isActive: boolean;
}) {
  try {
    const providerDocument = await findProviderByProviderIdAndUserId(
      providerId,
      userId,
    );

    if (!providerDocument) {
      throw new NotFound({
        appCode: PROVIDER_ERROR_CODE.NOT_FOUND,
        errorType: ERROR_TYPE.BUSINESS,
        message: "Provider not found",
      });
    }

    const toggleDocument = await toggleProviderById(providerId, isActive);

    if (toggleDocument.matchedCount === 0) {
      throw new NotFound({
        appCode: PROVIDER_ERROR_CODE.NOT_FOUND,
        errorType: ERROR_TYPE.BUSINESS,
        message: "Provider not found",
      });
    }

    if (toggleDocument.modifiedCount === 0) {
      return {
        success: true,
        message: "No change needed (already in desired state)",
      };
    }

    return {
      success: true,
      message: "Provider toggled successfully",
    };
  } catch (err) {
    throw err;
  }
}
