import { userTokenVersionIncrement } from "@repo/db";
import { LogoutDTO } from "@repo/shared";

export async function logoutUser(data: LogoutDTO): Promise<string> {
  const { id } = data;

  const isTokenVersionInc = await userTokenVersionIncrement(id);

  if (!isTokenVersionInc) {
    throw new Error("Enable to logout");
  }

  return "Logout successfull";
}
