import { NextFunction, Response } from "express";
import { RequestWithPayload } from "../types/authRequest";

export const responseSender = (
  req: RequestWithPayload,
  res: Response,
  next: NextFunction,
) => {
  if (!req.payload) {
    return next();
  }

  const { code, statusCode, data, message } = req.payload;

  res.status(code);
  return res.json({
    statusCode,
    message,
    data,
    success: true,
  });
};
