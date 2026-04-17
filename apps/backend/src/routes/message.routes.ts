import { Router } from "express";
import { authMiddleware } from "../middleware/authorization";
import { reqValidatorFunc } from "../middleware/validation";
import {
  createMessageBodySchema,
  createMessageQuerySchema,
  getMessageParams,
  getMessageStatusQuey,
} from "@repo/shared";
import {
  createMessageController,
  getMessageDetails,
} from "../modules/message/message.controller";

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

messageRouter.get(
  "/:id",
  authMiddleware,
  reqValidatorFunc({ params: getMessageParams }),
  getMessageDetails,
);

messageRouter.get(
  "/",
  authMiddleware,
  reqValidatorFunc({ query: getMessageStatusQuey }),
);

export { messageRouter };
