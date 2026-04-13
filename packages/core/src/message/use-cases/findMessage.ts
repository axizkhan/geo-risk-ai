import { findAndUpdateMessageToProcessing, findMessageById } from "@repo/db";

export async function findMessageAndStatusToUpd(_id: string) {
  try {
    const message = await findAndUpdateMessageToProcessing(_id);
    if (!message) {
      throw new Error("Message dont exist");
    }
    return message;
  } catch (err) {
    throw err;
  }
}
