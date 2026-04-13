import { DeliveryStatus, retryDelievryAndUpdate } from "@repo/db";
import mongoose from "mongoose";

export const retryDelievry = async ({
  _id,
  error,
}: {
  _id: mongoose.Types.ObjectId;
  error: string;
}): Promise<{ success: boolean; status?: DeliveryStatus }> => {
  try {
    const result = await retryDelievryAndUpdate({ _id, error });
    if (!result) {
      return { success: false };
    }
    return { success: true, status: result.status };
  } catch (err) {
    throw err;
  }
};
