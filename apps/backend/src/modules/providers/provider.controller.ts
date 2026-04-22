import { NextFunction, Request, Response } from "express";
import { PROVIDER_SUCCESS, Unauthorized } from "@repo/shared";
import { AUTH_ERROR_CODE, ERROR_TYPE } from "@repo/shared";
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
import { responseSender } from "../../utils/responseSender";

export const providerCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    throw new Unauthorized({
      appCode: AUTH_ERROR_CODE.USER_NOT_AUTHENTICATED,
      errorType: ERROR_TYPE.AUTH,
      message: "User is not authenticated",
    });
  }
  const typedReq = req as ValidatedAndAuthenticateRequest;
  const user = typedReq.user;

  const data = req.validatedData?.body;

  const result = await createProviderService(data, user.id);

  return responseSender({
    data: result.data,
    success: result.success,
    res,
    codeObj: PROVIDER_SUCCESS.CREATED,
  });
};

export const getAllProviderController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    throw new Unauthorized({
      appCode: AUTH_ERROR_CODE.USER_NOT_AUTHENTICATED,
      errorType: ERROR_TYPE.AUTH,
      message: "User is not authenticated",
    });
  }

  const user = req.user;

  const result = await getAllProviderService(user.id);

  return responseSender({
    res,
    codeObj: PROVIDER_SUCCESS.CREATED,
    success: result.success,
    data: { providers: result.data },
  });
};

export const updateProviderConfig = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    throw new Unauthorized({
      appCode: AUTH_ERROR_CODE.USER_NOT_AUTHENTICATED,
      errorType: ERROR_TYPE.AUTH,
      message: "User is not authenticated",
    });
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

  return responseSender({
    data: result.data,
    success: result.success,
    codeObj: PROVIDER_SUCCESS.UPDATED,
    res,
  });
};

export const toggleProvider = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    throw new Unauthorized({
      appCode: AUTH_ERROR_CODE.USER_NOT_AUTHENTICATED,
      errorType: ERROR_TYPE.AUTH,
      message: "User is not authenticated",
    });
  }
  const authReq = req as ToggleConfigRequest;

  const userId = req.user.id;
  const providerId = authReq.validatedData.params.providerId;
  const isActive = Boolean(authReq.validatedData.query.isActive);

  const result = await toggleProviderService({ userId, providerId, isActive });

  return responseSender({
    data: result.data,
    success: result.success,
    codeObj: PROVIDER_SUCCESS.UPDATED,
    res,
  });
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

  return responseSender({
    data: result.data,
    success: result.success,
    res,
    codeObj: PROVIDER_SUCCESS.DELETED,
  });
};
