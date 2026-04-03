import { Router } from "express";
import { authMiddleware } from "../middleware/authorization";
import { reqValidatorFunc } from "../middleware/validation";
import { apiKeyCreationSchems, apiKeyDeletionSchema } from "@repo/shared";
import {
  apiKeyCreationController,
  getAllApiKeyController,
} from "../modules/api-key/apiKey.controller";
const apiKeyRouter = Router();

apiKeyRouter.post(
  "/",
  authMiddleware,
  reqValidatorFunc({ body: apiKeyCreationSchems }),
  apiKeyCreationController,
);
apiKeyRouter.get("/", authMiddleware, getAllApiKeyController);
apiKeyRouter.delete(
  "/:id",
  authMiddleware,
  reqValidatorFunc({ params: apiKeyDeletionSchema }),
);
export { apiKeyRouter };
