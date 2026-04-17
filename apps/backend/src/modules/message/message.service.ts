import {
  createNewDelievery,
  createNewMessage,
  findProvider4Job,
  getMessagesStatus,
  getProviderForMsg,
  validateApiKey,
} from "@repo/core";
import { getMessageDetailsId } from "@repo/db";
import { publishEmail } from "@repo/queue";
import { CreateMessageService } from "packages/shared/src/contracts/message.contract";
import { GetMesssageData, GetMessageResesponse } from "@repo/shared";

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

export async function getMessageDetailsService(
  id: string,
): Promise<GetMessageResesponse> {
  try {
    const message = await getMessageDetailsId(id);
    let provider;
    let data: GetMesssageData | null = null;
    if (message?.providerId) {
      provider = await getProviderForMsg(message.providerId.toString());
      data = {
        channel: message.channel,
        content: message.content,
        status: message.status,
        totalCount: message.totalCount,
        successCount: message.successCount,
        failedCount: message.failedCount,
        jobStartedAt: message.jobStartedAt,
        jobEndAt: message.jobEndAt,
        providerName: provider.provider_name,
        providerType: provider.type,
      };
    }
    return {
      success: true,
      message: "success",
      data,
    };
  } catch (err) {
    throw err;
  }
}

export async function getMessageStatusService({
  userId,
  messageStatus,
}: {
  userId: string;
  messageStatus: string;
}) {
  try {
    const result = await getMessagesStatus({ userId, status: messageStatus });
    if (!result) {
      return {
        success: false,
        message: "No data is available",
        data: null,
      };
    }

    return {
      success: true,
      message: "Data is available",
      data: result,
    };
  } catch (err) {
    throw err;
  }
}
