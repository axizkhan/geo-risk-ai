import { Request, Response } from "express";
import { loginSchema, signupSchema, verifySchema } from "@repo/shared";

export interface AuthenicatedRequest extends Request {
  user: {
    email: string;
    id: string;
    token: string;
    tokenVersion: number;
  };
}

export interface ValidateRequest extends Request {
  validatedData: typeof loginSchema | typeof signupSchema | typeof verifySchema;
}

export interface ValidatedAndAuthenticateRequest extends Request {
  user: {
    email: string;
    id: string;
    token: string;
    tokenVersion: number;
  };
  validatedData: typeof loginSchema | typeof signupSchema | typeof verifySchema;
}

export interface ResponseWithPayload extends Response {
  payload: {
    code: number;
    data: any;
    statusCode: string;
    message: string;
  };
}
