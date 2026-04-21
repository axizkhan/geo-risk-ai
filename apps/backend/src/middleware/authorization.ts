import { findUserByEmail } from "@repo/db";
import { jwtTokenVerifyAndDecode, Unauthorized } from "@repo/shared";
import { AUTH_ERROR_CODE, ERROR_TYPE } from "@repo/shared";
import { NextFunction, Request, Response } from "express";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new Unauthorized({
      appCode: AUTH_ERROR_CODE.USER_NOT_AUTHENTICATED,
      errorType: ERROR_TYPE.AUTH,
      message: "Authentication token is missing. Please login first",
    });
  }

  let decodedToken = await jwtTokenVerifyAndDecode(token);

  let user = await findUserByEmail(decodedToken.email);

  if (!user) {
    throw new Unauthorized({
      appCode: AUTH_ERROR_CODE.USER_NOT_AUTHENTICATED,
      errorType: ERROR_TYPE.AUTH,
      message: "User not found. Please signup first",
    });
  }

  if (decodedToken.tokenVersion !== user.tokenVersion) {
    throw new Unauthorized({
      appCode: AUTH_ERROR_CODE.SESSION_EXPIRED,
      errorType: ERROR_TYPE.AUTH,
      message: "Session has expired. Please login again",
    });
  }

  req.user = {
    id: decodedToken.id,
    email: decodedToken.email,
    tokenVersion: decodedToken.tokenVersion,
    token,
  };

  next();
}
