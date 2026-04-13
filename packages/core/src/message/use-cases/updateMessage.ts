import { handleMessageDeliveryResult } from "@repo/db";

export const updateMessageForDelivery = async ({
  messageId,
  isSuccess,
}: {
  messageId: string;
  isSuccess: boolean;
}): Promise<{ success: boolean }> => {
  try {
    let result = await handleMessageDeliveryResult({ messageId, isSuccess });
    if (!result.modifiedCount) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    throw err;
  }
};
