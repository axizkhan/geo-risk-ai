import { createNewDelieveryDocs, CreateNewDelievries } from "@repo/db";

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
      throw new Error("Delieveries creation failed please try again");
    }
  } catch (err) {
    throw err;
  }
}
