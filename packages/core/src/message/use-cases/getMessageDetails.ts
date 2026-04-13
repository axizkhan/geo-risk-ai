import { getMessageDetailsId } from "@repo/db";
import { IMessage } from "@repo/db/src/models/message.model";
import mongoose from "mongoose";

export async function getMessageDetails(
  _id: string,
): Promise<mongoose.InferRawDocType<IMessage>> {
  try {
    let message = await getMessageDetailsId(_id);
    if (!message) {
      throw new Error("Data not found");
    }
    return message;
  } catch (err) {
    throw err;
  }
}
