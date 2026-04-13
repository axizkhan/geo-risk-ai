import {
  createNewDelievery,
  createNewMessage,
  findProvider4Job,
  validateApiKey,
} from "@repo/core";
import { publishEmail } from "@repo/queue";
import { CreateMessageService } from "packages/shared/src/contracts/message.contract";

export async function createMessageService({
  apiToken,
  type,
  channel,
  reciepent,
  userId,
  content,
}: CreateMessageService) {
  try {
    const valApiKeyRes = await validateApiKey({
      apiToken,
      type,
      channel,
      userId,
    });

    const provider4Job = await findProvider4Job({ userId, channel });
    const providerId = provider4Job._id.toString();

    const newMessageDoc = await createNewMessage({
      userId,
      reciepent,
      channel,
      content,
      providerId,
    });
    const messageId = newMessageDoc._id.toString();

    const delieveries = await createNewDelievery({
      providerId,
      reciepents: reciepent,
      messageId,
    });

    /**we have to push job to queue */
    await publishEmail({ messageId, type: channel, userId });

    /**and send user success message */
    return { success: true, message: "emails is queue for job " };
  } catch (err) {
    throw err;
  }
}

export async function getMessageDetailsService(id: string) {
  try {
  } catch (err) {
    throw err;
  }
}
