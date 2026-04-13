import * as z from "zod";
import {
  createMessageServiceSchema,
  getMessageDataSchema,
  getMessageResSchema,
  messageStatusSchema,
} from "../validation/message.schema";

export type MessageStatus = z.infer<typeof messageStatusSchema>;

export type CreateMessageService = z.infer<typeof createMessageServiceSchema>;

export type GetMessageResesponse = z.infer<typeof getMessageResSchema>;

export type GetMesssageData = z.infer<typeof getMessageDataSchema>;
