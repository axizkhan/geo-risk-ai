import * as z from "zod";

export const createNewDelieveriesSchema = z.array(
  z.object({
    messageId: z.string(),
    providerId: z.string(),
    recipent: z.string(),
  }),
);
