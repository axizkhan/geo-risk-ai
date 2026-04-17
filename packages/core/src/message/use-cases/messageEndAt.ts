import { messageEndAt } from "@repo/db";

export async function messageEnd(_id: string) {
  try {
    let result = await messageEndAt(_id);
    if (!result.modifiedCount) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    throw err;
  }
}
