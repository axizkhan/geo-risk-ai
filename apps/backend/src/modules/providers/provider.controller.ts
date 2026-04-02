import { NextFunction, Request, Response } from "express";
import {
  DeleteConfigRequest,
  ToggleConfigRequest,
  UpdateConfigRequest,
  ValidatedAndAuthenticateRequest,
} from "../../types/authRequest";
import {
  createProviderService,
  deleteProviderService,
  getAllProviderService,
  toggleProviderService,
  updateProviderConfigService,
} from "./provider.service";

export const providerCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    throw new Error("User is not authorized");
  }
  const typedReq = req as ValidatedAndAuthenticateRequest;
  const user = typedReq.user;

  const data = req.validatedData?.body;

  const result = await createProviderService(data, user.id);

  res.status(201);
  res.json(result);
};

export const getAllProviderController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    throw new Error("User is not authorized");
  }

  const user = req.user;

  const result = await getAllProviderService(user.id);

  res.status(200);
  res.json(result);
};

export const updateProviderConfig = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    throw new Error("User is not authorized");
  }

  const valAndAuthReq = req as UpdateConfigRequest;

  const providerId = valAndAuthReq.params.id as string;
  const config = valAndAuthReq.validatedData.body!.config;
  const provider_name = valAndAuthReq.validatedData.body.provider_name;
  const userId = valAndAuthReq.user.id;

  let result = await updateProviderConfigService({
    providerId,
    config,
    provider_name,
    userId,
  });

  res.status(200);
  res.json(result);
};

export const toggleProvider = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    throw new Error("User is not authorized");
  }
  const authReq = req as ToggleConfigRequest;

  const userId = req.user.id;
  const providerId = authReq.validatedData.params.providerId;
  const isActive = Boolean(authReq.validatedData.query.isActive);

  const result = await toggleProviderService({ userId, providerId, isActive });

  res.status(200);
  res.json(result);
};

export const deleteProvider = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authNValidReq = req as DeleteConfigRequest;
  const userId = authNValidReq.user.id;
  const providerId = authNValidReq.validatedData.params.id;

  const result = await deleteProviderService({ userId, providerId });

  res.status(200);
  res.json(result);
};
