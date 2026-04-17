import { findDailyChannelDocRange } from "@repo/db";

export async function findChannelRange({
  userId,
  startDate,
  endDate,
}: {
  userId: string;
  startDate: string;
  endDate: string;
}) {
  try {
    let startDateConver = new Date(startDate);
    let endDateConver = new Date(endDate);

    let result = await findDailyChannelDocRange({
      userId,
      startDate: startDateConver,
      endDate: endDateConver,
    });
  } catch (err) {
    throw err;
  }
}
