import { Router } from "express";
import { authMiddleware } from "../middleware/authorization";
import { reqValidatorFunc } from "../middleware/validation";
import {
  createMessageBodySchema,
  createMessageQuerySchema,
} from "@repo/shared";
import { createMessageController } from "../modules/message/message.controller";

const messageRouter = Router();

messageRouter.post(
  "/",
  authMiddleware,
  reqValidatorFunc({
    query: createMessageQuerySchema,
    body: createMessageBodySchema,
  }),
  createMessageController,
);

export { messageRouter };
