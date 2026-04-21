import { findAndUpdateMessageToProcessing, findMessageById } from "@repo/db";
import { NotFound } from "@repo/shared";
import { MESSAGE_ERROR_CODE, ERROR_TYPE } from "@repo/shared";

export async function findMessageAndStatusToUpd(_id: string) {
  try {
    const message = await findAndUpdateMessageToProcessing(_id);
    if (!message) {
      throw new NotFound({
        appCode: MESSAGE_ERROR_CODE.NOT_FOUND,
        errorType: ERROR_TYPE.BUSINESS,
        message: "Message does not exist",
      });
    }
    return message;
  } catch (err) {
    throw err;
  }
}
