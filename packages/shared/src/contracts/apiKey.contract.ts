import * as z from "zod";
import {
  actionSchema,
  apiKeyCreationSchems,
  apiKeyCreationServiceSchema,
} from "../validation/apiKeyschema";

export type ApiKeyAction = z.infer<typeof actionSchema>;
export type ApiKeyCreation = z.infer<typeof apiKeyCreationSchems>;
export type ApiKeyCreationService = z.infer<typeof apiKeyCreationServiceSchema>;
