import { messageStartAt } from "@repo/db";

export async function messageStart(_id: string) {
  try {
    let result = await messageStartAt(_id);
    if (!result.modifiedCount) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    throw err;
  }
}
