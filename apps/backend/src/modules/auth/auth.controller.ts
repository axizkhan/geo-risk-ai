import { Request, Response, NextFunction } from "express";
import { InternalServerError } from "@repo/shared";
import { SYSTEM_ERROR_CODE, ERROR_TYPE } from "@repo/shared";
import {
  loginService,
  logoutService,
  signupService,
  verifyService,
} from "./auth.service";
import { env } from "@repo/shared";
import { AuthenicatedRequest } from "../../types/authRequest";

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.validatedData) {
    const data = req.validatedData.body;

    const result = await signupService(data);

    const verifyUrl = `${env.BACKEND_URL}/auth/verify?verifyToken:${result.verifyToken}`;

    res.status(200);
    res.json({ verifyUrl });
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

    res.status(200);
    res.json({ verifyResponseData });
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

    res.status(200);
    res.json(loginResponseData);
  }
};

export const logoutController = async (
  req: AuthenicatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const data = req.user;

  const logOutResponse = await logoutService(data);

  res.status(200);
  res.json({ message: logOutResponse });
};
