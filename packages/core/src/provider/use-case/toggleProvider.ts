import {
  findProviderByProviderIdAndUserId,
  toggleProviderById,
} from "@repo/db";

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
      throw new Error("provider document don't exist");
    }

    const toggleDocument = await toggleProviderById(providerId, isActive);

    if (toggleDocument.matchedCount === 0) {
      throw new Error("Provider not found");
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
