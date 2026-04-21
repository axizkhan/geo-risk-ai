import {
  decrptProvider,
  failedDelievry,
  findDelieverie4Sending,
  findMessageAndStatusToUpd,
  findProvider4Job,
  messageDelievriesStatus,
  messageEnd,
  messageStart,
  retryDelievry,
  successDelievry,
  updateMessageForDelivery,
} from "@repo/core";
import { providers } from "@repo/provider";
import { NotFound, InternalServerError } from "@repo/shared";
import {
  PROVIDER_ERROR_CODE,
  SYSTEM_ERROR_CODE,
  ERROR_TYPE,
} from "@repo/shared";

export const sendEmail = async (job: any) => {
  try {
    //get messageId userId and channel
    const { messageId, userId, type } = job;
    //get the providerDocument
    const provider = await findProvider4Job({ userId, channel: type });
    if (!provider) {
      throw new NotFound({
        appCode: PROVIDER_ERROR_CODE.NOT_FOUND,
        errorType: ERROR_TYPE.BUSINESS,
        message: "Provider not found",
      });
    }
    //get the messageDocument and update it status
    const message = await findMessageAndStatusToUpd(messageId);

    //decrypt the config

    if (!provider.config) {
      throw new InternalServerError({
        appCode: SYSTEM_ERROR_CODE.INTERNAL_SERVER_ERROR,
        errorType: ERROR_TYPE.SYSTEM,
        message: "Provider configuration is missing",
      });
    }
    const config = await decrptProvider({
      configCipher: provider.config.configCipher,
      ivHex: provider.config.iv,
    });
    //find delievries for email in batch till their is no email
    //loop true
    await messageStart(messageId);
    while (true) {
      //find delieveir for batch
      const delievries = await findDelieverie4Sending({
        messageId,
        batchSize: 30,
      });
      if (!delievries.length) {
        await messageEnd(messageId);
        break;
      }
      delievries.forEach(async (delivery) => {
        //provider function call
        const result = await providers[provider.provider_name]?.send({
          config,
          payload: message.content,
          recipient: delivery.recipent as string,
        });
        //success success process
        if (result?.success) {
          await successDelievry(delivery._id);
          // in the above case of success and failure update the messageDocument
          await updateMessageForDelivery({ messageId, isSuccess: true });
        } else {
          //failure failure updates
          if (result?.isRetryable) {
            //if retry mark for retry
            let retryResult = await retryDelievry({
              _id: delivery._id,
              error: result.error,
            });
            if (retryResult.status && retryResult.status === "failed") {
              // in the above case of success and failure update the messageDocument
              await updateMessageForDelivery({ messageId, isSuccess: true });
            }
          } else {
            //else failed them
            await failedDelievry({ _id: delivery._id, error: result?.error });
            // in the above case of success and failure update the messageDocument
            await updateMessageForDelivery({ messageId, isSuccess: true });
          }
        }
      });

      //after loop check all of them are send if true success failed or partial notify the user
      const messageDelievery = await messageDelievriesStatus(messageId);
      if (messageDelievery) {
        if (messageDelievery.totalCount === messageDelievery.successCount) {
          console.log("success message");
        } else if (
          messageDelievery.totalCount === messageDelievery.failedCount
        ) {
          console.log("failed message");
        } else {
          console.log("partial success");
        }
      }
      //pass the config and message to the provider
    }
  } catch (err) {
    ///error handler for
    throw err;
  }
};
