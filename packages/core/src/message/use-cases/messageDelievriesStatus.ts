import { findMessageDelievryStatus, MessageStatus } from "@repo/db";

export async function messageDelievriesStatus(
  _id: string,
): Promise<MessageStatus | null> {
  try {
    return await findMessageDelievryStatus(_id);
  } catch (err) {
    throw err;
  }
}
