import {
  loginUser,
  logoutUser,
  signupUser,
  SingupUserFunDTO,
  verifyUserToken,
} from "@repo/core";
import {
  SignupRequestDTO,
  VerifyRequestDTO,
  VerifyResponseDTO,
  LoginRequestDTO,
  LoginResponseDTO,
  LogoutDTO,
  LogoutResponseDTO,
} from "@repo/shared";
import { success } from "zod";
import { da } from "zod/v4/locales";

export async function signupService(
  data: SignupRequestDTO,
): Promise<SingupUserFunDTO> {
  return await signupUser(data);
}

export async function verifyService(
  data: VerifyRequestDTO,
): Promise<VerifyResponseDTO> {
  return await verifyUserToken(data);
}

export async function loginService(
  data: LoginRequestDTO,
): Promise<LoginResponseDTO> {
  return await loginUser(data);
}

export async function logoutService(
  data: LogoutDTO,
): Promise<LogoutResponseDTO> {
  return await logoutUser(data);
}
