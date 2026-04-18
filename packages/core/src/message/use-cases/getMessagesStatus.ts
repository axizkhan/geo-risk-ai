import { getMessages } from "@repo/db";

export async function getMessagesStatus({
  userId,
  status,
}: {
  userId: string;
  status: string;
}) {
  try {
    const result = await getMessages({ userId, status });
    return result;
  } catch (err) {
    throw err;
  }
}
