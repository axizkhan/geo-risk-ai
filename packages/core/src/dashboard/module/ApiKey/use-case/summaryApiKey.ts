import { summaryApiKeyQuery } from "@repo/db";

export async function summaryApiKey({
  userId,
  endDate,
  startDate,
}: {
  userId: string;
  endDate: Date;
  startDate: Date;
}) {
  try {
    return await summaryApiKeyQuery({ userId, endDate, startDate });
  } catch (err) {
    throw err;
  }
}
