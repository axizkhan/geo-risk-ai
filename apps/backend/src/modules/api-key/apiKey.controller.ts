import { NextFunction, Request, Response } from "express";
import {
  ApiKeyCreationRequest,
  ApiKeyDeletionRequest,
  AuthenicatedRequest,
} from "../../types/authRequest";
import {
  apiKeyCreationService,
  apiKeyDeletionService,
  getAllApiKeyService,
} from "./apiKey.service";
import { responseSender } from "../../utils/responseSender";
import { API_KEY_SUCCESS } from "@repo/shared";

export const apiKeyCreationController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const valNAuthReq = req as ApiKeyCreationRequest;
  const apiKeyName = valNAuthReq.validatedData.body.apiKeyName;
  const permissions = valNAuthReq.validatedData.body.permissions;
  const userId = valNAuthReq.user.id;

  const result = await apiKeyCreationService({
    permissions,
    apiKeyName,
    userId,
  });

  return responseSender({
    res,
    codeObj: API_KEY_SUCCESS.CREATED,
    success: result.success,
    data: result.data,
  });
};

export const getAllApiKeyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authReq = req as AuthenicatedRequest;
  const userId = authReq.user.id;
  const result = await getAllApiKeyService(userId);

  return responseSender({
    data: result.data,
    success: result.success,
    res,
    codeObj: API_KEY_SUCCESS.FETCHED,
  });
};

export const apiKeyDeletionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authNValReq = req as ApiKeyDeletionRequest;
  const apiKeyId = authNValReq.validatedData.body.id;

  const result = await apiKeyDeletionService(apiKeyId);

  return responseSender({
    data: result.data,
    success: result.success,
    res,
    codeObj: API_KEY_SUCCESS.DELETED,
  });

  res.status(200);
  res.json(result);
};
