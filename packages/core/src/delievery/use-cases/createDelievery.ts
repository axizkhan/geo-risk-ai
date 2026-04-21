import { createNewDelieveryDocs, CreateNewDelievries } from "@repo/db";
import { InternalServerError } from "@repo/shared";
import { SYSTEM_ERROR_CODE, ERROR_TYPE } from "@repo/shared";
import mongoose, { mongo } from "mongoose";

export async function createNewDelievery({
  messageId,
  providerId,
  reciepents,
}: {
  messageId: string;
  providerId: string;
  reciepents: Array<string>;
}) {
  try {
    let successCount = 0;
    const deliveriesArray: CreateNewDelievries = reciepents.map((recipent) => ({
      recipent,
      messageId: new mongoose.Types.ObjectId(messageId),
      providerId: new mongoose.Types.ObjectId(providerId),
    }));

    const delieveriesInstDb = await createNewDelieveryDocs(deliveriesArray);
    if (deliveriesArray.length !== delieveriesInstDb.length) {
      throw new InternalServerError({
        appCode: SYSTEM_ERROR_CODE.INTERNAL_SERVER_ERROR,
        errorType: ERROR_TYPE.SYSTEM,
        message: "Failed to create deliveries. Please try again",
      });
    }
  } catch (err) {
    throw err;
  }
}
