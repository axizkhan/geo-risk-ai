import * as z from "zod";

export const dashboardPaginationQuerySchema = z.object({
  limit: z.number(),
  page: z.number(),
});

export const dashboardFieldTypeSchema = z.enum([
  "all",
  "apiKey",
  "provider",
  "channel",
]);

export const dashboardPaginationParamsSchema = z.object({
  field: dashboardFieldTypeSchema,
});

export const dashboardPaginationRangeBodySchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

export const dashboardHomeQuerySchema = z.object({
  days: z.number(),
});
