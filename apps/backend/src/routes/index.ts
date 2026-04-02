import { Router } from "express";
import authRouter from "./auth.routes";
import { providerRouter } from "./provider.routes";
const indexRouter = Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/provider", providerRouter);

export default indexRouter;
