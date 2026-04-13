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

export const apiKeyCreationController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const valNAuthReq = req as ApiKeyCreationRequest;
  const apiKeyName = valNAuthReq.validatedData.body.apiKeyName;
  const permissions = valNAuthReq.validatedData.body.permissions;
  const userId = valNAuthReq.user.id;

  const result = apiKeyCreationService({ permissions, apiKeyName, userId });

  res.status(200);
  res.json(result);
};

export const getAllApiKeyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authReq = req as AuthenicatedRequest;
  const userId = authReq.user.id;
  const result = await getAllApiKeyService(userId);

  res.status(200);
  res.json(result);
};

export const apiKeyDeletionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authNValReq = req as ApiKeyDeletionRequest;
  const apiKeyId = authNValReq.validatedData.body.id;

  const result = apiKeyDeletionService(apiKeyId);

  res.status(200);
  res.json(result);
};
