import { createMessageDocuement } from "@repo/db";
import { ChannelType } from "@repo/shared";

export async function createNewMessage({
  content,
  channel,
  userId,
  providerId,
  reciepent,
}: {
  content: string;
  channel: ChannelType;
  userId: string;
  providerId: string;
  reciepent: Array<string>;
}) {
  try {
    const totalMessagesCount = reciepent.length;
    const newMessageDoc = createMessageDocuement({
      content,
      channel,
      userId,
      providerId,
      totalCount: totalMessagesCount,
    });
    if (!newMessageDoc) {
      throw new Error("Internel server error");
    }
    return newMessageDoc;
  } catch (err) {
    throw err;
  }
}
