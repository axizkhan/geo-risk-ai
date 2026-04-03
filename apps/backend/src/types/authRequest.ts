import { Request, Response } from "express";
import * as z from "zod";
import {
  apiKeyCreationSchems,
  apiKeyDeletionSchema,
  loginSchema,
  provideConfigUpdateSchema,
  providerCreationSchema,
  providerDeleteQuerySchema,
  providerToggleParamsSchema,
  providerToggleQuerySchema,
  signupSchema,
  verifySchema,
} from "@repo/shared";

type ValidationValueType =
  | z.infer<typeof loginSchema>
  | z.infer<typeof signupSchema>
  | z.infer<typeof verifySchema>
  | z.infer<typeof providerCreationSchema>
  | z.infer<typeof provideConfigUpdateSchema>
  | z.infer<typeof providerToggleParamsSchema>
  | z.infer<typeof providerToggleQuerySchema>
  | z.infer<typeof providerDeleteQuerySchema>
  | z.infer<typeof apiKeyCreationSchems>
  | z.infer<typeof apiKeyDeletionSchema>;

export type ValidateDataType = {
  body?: ValidationValueType;
  query?: ValidationValueType;
  params?: ValidationValueType;
};

export interface AuthenicatedRequest extends Request {
  user: {
    email: string;
    id: string;
    token: string;
    tokenVersion: number;
  };
}

export interface ValidateRequest extends Request {
  validatedData: ValidateDataType;
}

export interface ValidatedAndAuthenticateRequest extends Request {
  user: {
    email: string;
    id: string;
    token: string;
    tokenVersion: number;
  };
  validatedData: ValidateDataType;
}

export interface RequestWithPayload extends Request {
  payload: {
    code: number;
    data: any;
    statusCode: string;
    message: string;
  };
}

export interface UpdateConfigRequest extends ValidatedAndAuthenticateRequest {
  validatedData: {
    body: z.infer<typeof provideConfigUpdateSchema>;
  };
}

export interface ToggleConfigRequest extends ValidatedAndAuthenticateRequest {
  validatedData: {
    params: z.infer<typeof providerToggleParamsSchema>;
    query: z.infer<typeof providerToggleQuerySchema>;
  };
}

export interface DeleteConfigRequest extends ValidatedAndAuthenticateRequest {
  validatedData: {
    params: z.infer<typeof providerDeleteQuerySchema>;
  };
}

export interface ApiKeyCreationRequest extends ValidatedAndAuthenticateRequest {
  validatedData: {
    body: z.infer<typeof apiKeyCreationSchems>;
  };
}

export interface ApiKeyDeletionRequest extends ValidatedAndAuthenticateRequest {
  validatedData: {
    body: z.infer<typeof apiKeyDeletionSchema>;
  };
}
