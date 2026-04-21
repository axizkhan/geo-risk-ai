import { Router } from "express";
import authRouter from "./auth.routes";
import { providerRouter } from "./provider.routes";
import { apiKeyRouter } from "./apiKey.routes";
import { messageRouter } from "./message.routes";
import { dashboardRouter } from "./dashboard.routes";
const indexRouter = Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/provider", providerRouter);
indexRouter.use("/api-key", apiKeyRouter);
indexRouter.use("/message", messageRouter);
indexRouter.use("/dashboard", dashboardRouter);

export default indexRouter;
