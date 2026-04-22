import { findUserByEmail } from "@repo/db";
import {
  InternalServerError,
  LoginRequestDTO,
  LoginResponseDTO,
  NotFound,
  SYSTEM_ERROR_CODE,
  Unauthorized,
} from "@repo/shared";
import { AUTH_ERROR_CODE, ERROR_TYPE } from "@repo/shared";
import { jwtTokenGeneration } from "../utils/jwtToken";

export async function loginUser(
  data: LoginRequestDTO,
): Promise<LoginResponseDTO> {
  let user = await findUserByEmail(data.email);

  if (!user) {
    throw new NotFound({
      appCode: AUTH_ERROR_CODE.USER_NOT_AUTHENTICATED,
      errorType: ERROR_TYPE.AUTH,
      message: "User not found. Please signup first",
    });
  }

  if (user && user.isVerified === false && user.expireAt) {
    throw new Unauthorized({
      appCode: AUTH_ERROR_CODE.USER_NOT_VERIFIED,
      errorType: ERROR_TYPE.AUTH,
      message: "Please verify your email before login",
    });
  }

  const authToken = jwtTokenGeneration(
    { id: user._id.toString(), email: user.email },
    user.tokenVersion,
  );

  if (!authToken) {
    throw new InternalServerError({
      appCode: SYSTEM_ERROR_CODE.INTERNAL_SERVER_ERROR,
      errorType: ERROR_TYPE.SYSTEM,
      message: "Internal server error",
    });
  }
  return {
    token: authToken,
    success: true,
  };
}
