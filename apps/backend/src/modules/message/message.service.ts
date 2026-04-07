import {
  createNewDelievery,
  createNewMessage,
  findProvider4Job,
  validateApiKey,
} from "@repo/core";
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

    /**and send user success message */
  } catch (err) {
    throw err;
  }
}
