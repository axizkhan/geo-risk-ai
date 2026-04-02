import { Request } from "express";
import * as z from "zod";

import {
  loginSchema,
  providerCreationSchema,
  signupSchema,
  verifySchema,
} from "@repo/shared";

type validatedDate =
  | loginSchema
  | signupSchema
  | verifySchema
  | z.infer<typeof providerCreationSchema>;

interface user {
  email: string;
  id: string;
  tokenVersion: number;
  token: string;
}

declare global {
  namespace Express {
    interface Request {
      validatedData?: {
        body?: any;
        query?: any;
        params?: any;
      };
      user?: user;
      payload?: {
        code: number;
        statusCode: string;
        message: string;
        data: any;
      };
    }
  }
}
