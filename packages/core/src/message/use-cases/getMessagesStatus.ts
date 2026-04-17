import { getMessages } from "@repo/db";

export async function getMessagesStatus({
  userId,
  status,
}: {
  userId: string;
  status: string;
}) {
  try {
    const result = getMessages({ userId, status });
    if (!result) {
      return {
        success: false,
        message: "No data found",
        data: null,
      };
    }
    return {
      success: true,
      message: "Data found successfully",
      data: result,
    };
  } catch (err) {
    throw err;
  }
}
