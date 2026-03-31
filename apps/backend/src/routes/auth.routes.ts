import { Router } from "express";
import { signupSchema, loginSchema, verifySchema } from "@repo/shared";
import { reqValidatorFunc } from "../middleware/validation";
import {
  loginController,
  signupController,
  verifyController,
} from "../modules/auth/auth.controller";
import { authMiddleware } from "../middleware/authorization";

const authRouter = Router();

authRouter.post(
  "/signup",
  reqValidatorFunc(signupSchema, "body"),
  signupController,
);
authRouter.post(
  "/verify",
  reqValidatorFunc(verifySchema, "query"),
  verifyController,
);

authRouter.post(
  "/login",
  reqValidatorFunc(loginSchema, "body"),
  loginController,
);

authRouter.post("/logout", authMiddleware);

export default authRouter;
