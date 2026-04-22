import { Response } from "express";
import { boolean } from "zod";

export const responseSender = async ({
  data,
  success = true,
  codeObj,
  res,
  meta = { timeStamp: new Date().toISOString() },
}: {
  data: any;
  success?: boolean;
  codeObj: { code: string; httpCode: number; message: string };
  res: Response;
  meta?: Record<string, any>;
}) => {
  return res.status(codeObj.httpCode).json({
    success,
    statusCode: codeObj.code,
    message: codeObj.code,
    data,
    meta,
  });
};
