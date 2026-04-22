import { Request, Response, NextFunction } from "express";
import { AUTH_SUCCESS, InternalServerError } from "@repo/shared";
import { SYSTEM_ERROR_CODE, ERROR_TYPE } from "@repo/shared";
import {
  loginService,
  logoutService,
  signupService,
  verifyService,
} from "./auth.service";
import { env } from "@repo/shared";
import { AuthenicatedRequest } from "../../types/authRequest";
import { responseSender } from "../../utils/responseSender";
import { success } from "zod";

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.validatedData) {
    const data = req.validatedData.body;

    const result = await signupService(data);

    const verifyUrl = `${env.BACKEND_URL}/auth/verify?verifyToken:${result.verifyToken}`;

    return responseSender({
      res,
      codeObj: AUTH_SUCCESS.EMAIL_VERIFICATION_SENT,
      success: true,
      data: { verifyUrl },
    });
  }

  throw new InternalServerError({
    appCode: SYSTEM_ERROR_CODE.INTERNAL_SERVER_ERROR,
    errorType: ERROR_TYPE.SYSTEM,
    message: "Internal server error",
  });
};

export const verifyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.validatedData) {
    const data = req.validatedData.query;

    const verifyResponseData = await verifyService(data);

    return responseSender({
      data: { token: verifyResponseData.token },
      success: verifyResponseData.success,
      res,
      codeObj: AUTH_SUCCESS.EMAIL_VERIFIED,
    });
  }

  throw new InternalServerError({
    appCode: SYSTEM_ERROR_CODE.INTERNAL_SERVER_ERROR,
    errorType: ERROR_TYPE.SYSTEM,
    message: "Internal server error",
  });
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.validatedData) {
    const data = req.validatedData.body;

    const loginResponseData = await loginService(data);

    return responseSender({
      data: { token: loginResponseData.token },
      success: loginResponseData.success,
      codeObj: AUTH_SUCCESS.LOGIN_SUCCESS,
      res,
    });
  }
};

export const logoutController = async (
  req: AuthenicatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const data = req.user;

  const logOutResponse = await logoutService(data);

  return responseSender({
    success: logOutResponse.success,
    res,
    codeObj: AUTH_SUCCESS.LOGOUT_SUCCESS,
    data: logOutResponse.data,
  });
};
