import { getAllUserProvider, IProvider } from "@repo/db";

export async function getAllProvider(userId: string) {
  try {
    let result = await getAllUserProvider(userId);
    return { data: result, success: result ? true : false };
  } catch (err) {
    throw err;
  }
}
