import { NextFunction, Request } from "express";
import { ResponseWithPayload } from "../types/authRequest";

export const responseSender = (
  req: Request,
  res: ResponseWithPayload,
  next: NextFunction,
) => {
  res.status(res.payload.code);
  res.json({
    success: true,
    statusCode: res.payload.statusCode,
    data: res.payload.data,
    message: res.payload.message,
  });
};
