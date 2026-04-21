import { getMessageDetailsId } from "@repo/db";
import { IMessage } from "@repo/db/src/models/message.model";
import { NotFound } from "@repo/shared";
import { MESSAGE_ERROR_CODE, ERROR_TYPE } from "@repo/shared";
import mongoose from "mongoose";

export async function getMessageDetails(_id: string): Promise<IMessage> {
  try {
    let message = await getMessageDetailsId(_id);
    if (!message) {
      throw new NotFound({
        appCode: MESSAGE_ERROR_CODE.NOT_FOUND,
        errorType: ERROR_TYPE.BUSINESS,
        message: "Message not found",
      });
    }
    return message;
  } catch (err) {
    throw err;
  }
}
