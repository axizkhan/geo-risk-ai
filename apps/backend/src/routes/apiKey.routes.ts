import { Router } from "express";
import { authMiddleware } from "../middleware/authorization";
import { reqValidatorFunc } from "../middleware/validation";
import { apiKeyCreationSchems } from "@repo/shared";
import { apiKeyCreationController } from "../modules/api-key/apiKey.controller";
const apiKeyRouter = Router();

apiKeyRouter.post(
  "/",
  authMiddleware,
  reqValidatorFunc({ body: apiKeyCreationSchems }),
  apiKeyCreationController,
);
export { apiKeyRouter };
