import { successDelievryAndUpdate } from "@repo/db";
import mongoose from "mongoose";

export async function successDelievry(
  _id: mongoose.Types.ObjectId,
): Promise<{ success: boolean }> {
  try {
    let result = await successDelievryAndUpdate({ _id });
    if (result.modifiedCount) {
      return { success: true };
    }
    return { success: false };
  } catch (err) {
    throw err;
  }
}
