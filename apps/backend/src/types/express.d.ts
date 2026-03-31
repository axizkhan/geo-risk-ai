import { Request } from "express";

import { loginSchema, signupSchema, verifySchema } from "@repo/shared";

type validatedDate = loginSchema | signupSchema | verifySchema;

interface user {
  email: string;
  id: string;
  tokenVersion: number;
  token: string;
}

declare global {
  namespace Express {
    interface Request {
      validatedData?: validatedDate;
      user?: user;
    }
    interface Response {
      payload?: {
        code: number;
        statusCode: string;
        message: string;
        data: any;
      };
    }
  }
}
