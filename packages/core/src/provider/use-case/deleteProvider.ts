import { deleteDocumentByProviderIdAndUserId } from "@repo/db";

export async function deleteProvider({
  userId,
  providerId,
}: {
  userId: string;
  providerId: string;
}) {
  try {
    const deletedProviderResult = await deleteDocumentByProviderIdAndUserId({
      userId,
      providerId,
    });

    if (!deletedProviderResult.deletedCount) {
      throw new Error("Provider not found");
    }

    return {
      success: true,
      message: "Provider deleted successfully",
      data: {
        providerId,
      },
    };
  } catch (err) {
    throw err;
  }
}
