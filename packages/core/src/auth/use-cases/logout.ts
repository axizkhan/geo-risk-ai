import { userTokenVersionIncrement } from "@repo/db";
import {
  LogoutDTO,
  InternalServerError,
  LogoutResponseDTO,
} from "@repo/shared";
import { SYSTEM_ERROR_CODE, ERROR_TYPE } from "@repo/shared";

export async function logoutUser(data: LogoutDTO): Promise<LogoutResponseDTO> {
  const { id } = data;

  const isTokenVersionInc = await userTokenVersionIncrement(id);

  if (!isTokenVersionInc) {
    throw new InternalServerError({
      appCode: SYSTEM_ERROR_CODE.DATABASE_ERROR,
      errorType: ERROR_TYPE.SYSTEM,
      message: "Unable to logout. Please try again",
    });
  }

  return { success: true, data: null };
}
