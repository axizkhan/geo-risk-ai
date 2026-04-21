import { createMessageDocuement } from "@repo/db";
import { ChannelType, InternalServerError } from "@repo/shared";
import { SYSTEM_ERROR_CODE, ERROR_TYPE } from "@repo/shared";

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
      throw new InternalServerError({
        appCode: SYSTEM_ERROR_CODE.INTERNAL_SERVER_ERROR,
        errorType: ERROR_TYPE.SYSTEM,
        message: "Failed to create message",
      });
    }
    return newMessageDoc;
  } catch (err) {
    throw err;
  }
}
