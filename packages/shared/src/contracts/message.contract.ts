import * as z from "zod";
import {
  createMessageServiceSchema,
  messageStatusSchema,
} from "../validation/message.schema";

export type MessageStatus = z.infer<typeof messageStatusSchema>;

export type CreateMessageService = z.infer<typeof createMessageServiceSchema>;
