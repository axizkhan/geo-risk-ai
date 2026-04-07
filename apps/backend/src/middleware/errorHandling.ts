import { HttpClientError, HttpServerError } from "@repo/shared";
import { NextFunction, Request, Response } from "express";

export const globalErroHandler = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof HttpClientError || error instanceof HttpServerError) {
  }
};
