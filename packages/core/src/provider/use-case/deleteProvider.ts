import { deleteDocumentByProviderIdAndUserId } from "@repo/db";
import { NotFound } from "@repo/shared";
import { PROVIDER_ERROR_CODE, ERROR_TYPE } from "@repo/shared";

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
      throw new NotFound({
        appCode: PROVIDER_ERROR_CODE.NOT_FOUND,
        errorType: ERROR_TYPE.BUSINESS,
        message: "Provider not found",
      });
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
