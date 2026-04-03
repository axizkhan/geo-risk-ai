import { Router } from "express";
import authRouter from "./auth.routes";
import { providerRouter } from "./provider.routes";
import { apiKeyRouter } from "./apiKey.routes";
const indexRouter = Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/provider", providerRouter);
indexRouter.use("/api-key", apiKeyRouter);

export default indexRouter;
