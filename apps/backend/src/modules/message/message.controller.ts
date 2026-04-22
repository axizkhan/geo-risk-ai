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
import { responseSender } from "../../utils/responseSender";
import { MESSAGE_SUCCESS } from "@repo/shared";

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

  return responseSender({
    data: result.data,
    success: result.success,
    res,
    codeObj: MESSAGE_SUCCESS.CREATED,
  });
};

export const getMessageDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authNValReq = req as GetMessageRequest;
  const { id } = authNValReq.validatedData.params;
  const result = await getMessageDetailsService(id);

  return responseSender({
    data: result.data,
    success: result.success,
    res,
    codeObj: MESSAGE_SUCCESS.FETCHED,
  });
};

export const getMessageStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authNValReq = req as GetMessageStatusRequest;
  const userId = authNValReq.user.id;
  const messageStatus = authNValReq.validatedData.query.status;

  const result = await getMessageStatusService({ userId, messageStatus });

  return responseSender({
    data: result.data,
    success: result.success,
    res,
    codeObj: MESSAGE_SUCCESS.FETCHED,
  });
};
