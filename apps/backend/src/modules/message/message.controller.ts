import { NextFunction, Request, Response } from "express";
import {
  GetMessageRequest,
  GetMessageStatusRequest,
  MessageCreateRequest,
} from "../../types/authRequest";
import {
  createMessageService,
  getMessageDetailsService,
  getMessageStatusService,
} from "./message.service";

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
  res.status(200);
  res.json(result);
};

export const getMessageDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authNValReq = req as GetMessageRequest;
  const { id } = authNValReq.validatedData.params;
  const result = getMessageDetailsService(id);

  res.status(200);
  res.json(result);
};

export const getMessageStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authNValReq = req as GetMessageStatusRequest;
  const userId = authNValReq.user.id;
  const messageStatus = authNValReq.validatedData.query.status;

  const result = getMessageStatusService({ userId, messageStatus });

  res.status(200);
  res.json(result);
};
