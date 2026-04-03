import { NextFunction, Request, Response } from "express";
import { ApiKeyCreationRequest } from "../../types/authRequest";
import { apiKeyCreationService } from "./apiKey.service";

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
