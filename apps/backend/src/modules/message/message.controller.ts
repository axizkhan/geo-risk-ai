import { NextFunction, Request, Response } from "express";
import { MessageCreateRequest } from "../../types/authRequest";
import { createMessageService } from "./message.service";

export const createMessageController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authNValReq = req as MessageCreateRequest;

  const { apiToken, type, channel } = authNValReq.validatedData.query;
  const { reciepent, content } = authNValReq.validatedData.body;
  const userId = authNValReq.user.id;

  const result = await createMessageService({
    apiToken,
    type,
    channel,
    reciepent,
    content,
    userId,
  });
};
