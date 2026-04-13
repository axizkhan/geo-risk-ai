import { findDelieveriesForSending } from "@repo/db";

export async function findDelieverie4Sending({
  messageId,
  batchSize,
}: {
  messageId: string;
  batchSize: number;
}) {
  try {
    return await findDelieveriesForSending({ batchSize, messageId });
  } catch (err) {
    throw err;
  }
}
