import * as z from "zod";

export const standeredResSchema = (dataSchema: z.ZodType) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    data: dataSchema.nullable(),
  });
