import * as z from "zod";
import {
  signupSchema,
  loginSchema,
  verifySchema,
} from "../validation/auth.schema";

type SignupRequestDTO = z.infer<typeof signupSchema>;
type LoginRequestDTO = z.infer<typeof loginSchema>;
type VerifyRequestDTO = z.infer<typeof verifySchema>;

type AuthResponse = {
  token: string;
  success: boolean;
};

type VerifyResponseDTO = AuthResponse;
type LoginResponseDTO = AuthResponse;

export type LogoutResponseDTO = { success: boolean; data: null };

type LogoutDTO = {
  id: string;
  email: string;
  token: string;
  tokenVersion: number;
};

export {
  SignupRequestDTO,
  LoginRequestDTO,
  LoginResponseDTO,
  VerifyResponseDTO,
  VerifyRequestDTO,
  LogoutDTO,
};
