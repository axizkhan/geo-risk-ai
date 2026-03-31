import { findUserByEmail } from "@repo/db";
import { jwtTokenVerifyAndDecode } from "@repo/shared";
import { NextFunction, Request, Response } from "express";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new Error("Login before processed");
  }

  let decodedToken = await jwtTokenVerifyAndDecode(token);

  let user = await findUserByEmail(decodedToken.email);

  if (!user) {
    throw new Error("Signup before processed");
  }

  if (decodedToken.tokenVersion !== user.tokenVersion) {
    throw new Error("Session Expired");
  }

  req.user = {
    id: decodedToken.id,
    email: decodedToken.email,
    tokenVersion: decodedToken.tokenVersion,
    token,
  };

  next();
}
