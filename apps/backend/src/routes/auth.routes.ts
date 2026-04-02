import { Router } from "express";
import { signupSchema, loginSchema, verifySchema } from "@repo/shared";
import { reqValidatorFunc } from "../middleware/validation";
import {
  loginController,
  signupController,
  verifyController,
} from "../modules/auth/auth.controller";
import { authMiddleware } from "../middleware/authorization";
import { logoutUser } from "@repo/core";

const authRouter = Router();

authRouter.post(
  "/signup",
  reqValidatorFunc({ body: signupSchema }),
  signupController,
);
authRouter.post(
  "/verify",
  reqValidatorFunc({ query: verifySchema }),
  verifyController,
);

authRouter.post(
  "/login",
  reqValidatorFunc({ body: loginSchema }),
  loginController,
);

authRouter.post("/logout", authMiddleware, logoutUser);

export default authRouter;
