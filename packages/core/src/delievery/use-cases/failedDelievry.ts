import { failedDelievryAndUpdate } from "@repo/db";
import mongoose from "mongoose";

export const failedDelievry = async ({
  _id,
  error,
}: {
  _id: mongoose.Types.ObjectId;
  error: string;
}): Promise<{ success: boolean }> => {
  try {
    let result = await failedDelievryAndUpdate({ _id, error });
    if (result.modifiedCount) {
      return { success: true };
    }
    return { success: false };
  } catch (err) {
    throw err;
  }
};
