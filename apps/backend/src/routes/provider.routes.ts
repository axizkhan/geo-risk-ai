import { RequestHandler, Router } from "express";
import { authMiddleware } from "../middleware/authorization";
import { reqValidatorFunc } from "../middleware/validation";
import {
  provideConfigUpdateSchema,
  providerCreationSchema,
  providerDeleteQuerySchema,
  providerToggleParamsSchema,
  providerToggleQuerySchema,
} from "@repo/shared";
import {
  getAllProviderController,
  providerCreateController,
} from "../modules/providers/provider.controller";
const providerRouter = Router();

providerRouter.post(
  "/",
  authMiddleware,
  reqValidatorFunc({ body: providerCreationSchema }),
  providerCreateController,
);
providerRouter.get("/", authMiddleware, getAllProviderController);
providerRouter.put(
  "/:id",
  authMiddleware,
  reqValidatorFunc({ body: provideConfigUpdateSchema }),
);
providerRouter.patch(
  "/:id",
  authMiddleware,
  reqValidatorFunc({
    query: providerToggleQuerySchema,
    params: providerToggleParamsSchema,
  }),
);
providerRouter.delete(
  "/:id",
  authMiddleware,
  reqValidatorFunc({ query: providerDeleteQuerySchema }),
);

export { providerRouter };
