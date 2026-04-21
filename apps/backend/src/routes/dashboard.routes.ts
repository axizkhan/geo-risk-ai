import { Router } from "express";
import { authMiddleware } from "../middleware/authorization";
import { reqValidatorFunc } from "../middleware/validation";
import {
  dashboardPaginationParamsSchema,
  dashboardPaginationQuerySchema,
  dashboardPaginationRangeBodySchema,
} from "@repo/shared";
import {
  dashboardPaginationController,
  dashboardRangePaginationController,
  dashboardRangeSummaryController,
  dashboardSummaryController,
} from "../modules/dashboard/dashboard.controller";

const dashboardRouter = Router();

dashboardRouter.get(
  "/pagination/:field",
  authMiddleware,
  reqValidatorFunc({
    query: dashboardPaginationQuerySchema,
    params: dashboardPaginationParamsSchema,
  }),
);

dashboardRouter.get(
  "/pagination/range/:field",
  authMiddleware,
  reqValidatorFunc({
    query: dashboardPaginationQuerySchema,
    params: dashboardPaginationParamsSchema,
    body: dashboardPaginationRangeBodySchema,
  }),
  dashboardRangePaginationController,
);

dashboardRouter.get(
  "/pagination/:field",
  authMiddleware,
  reqValidatorFunc({
    query: dashboardPaginationQuerySchema,
    params: dashboardPaginationParamsSchema,
  }),
  dashboardPaginationController,
);

dashboardRouter.get(
  "/summary/range/:field",
  authMiddleware,
  reqValidatorFunc({
    params: dashboardPaginationParamsSchema,
    body: dashboardPaginationRangeBodySchema,
  }),
  dashboardRangeSummaryController,
);

dashboardRouter.get(
  "/summary/:field",
  authMiddleware,
  reqValidatorFunc({ params: dashboardPaginationParamsSchema }),
  dashboardSummaryController,
);

dashboardRouter.get(
  "/",
  authMiddleware,
  reqValidatorFunc({ query: dashboardHomeQuerySchema }),
);
export { dashboardRouter };
