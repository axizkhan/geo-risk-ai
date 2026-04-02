import { getAllUserProvider } from "@repo/db";

export async function getAllProvider(userId: string) {
  try {
    return getAllUserProvider(userId);
  } catch (err) {
    throw err;
  }
}
