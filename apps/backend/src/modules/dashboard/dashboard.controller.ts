import { NextFunction, Request, Response } from "express";
import {
  DashboardHomeRequest,
  DashboardPaginationRequest,
  DashboardRangeSummaryRequest,
  DashboardSummaryRequest,
  DashboarsRangePaginationRequest,
} from "../../types/authRequest";
import {
  dashboardHomeService,
  dashboardPaginationService,
  dashboardRangePaginationService,
  dashboardRangeSummaryService,
  dashboardSummaryService,
} from "./dashboard.service";

export const dashboardRangePaginationController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authAndValReq = req as DashboarsRangePaginationRequest;
  const { limit, page } = authAndValReq.validatedData.query;
  const { field } = authAndValReq.validatedData.params;
  const { startDate, endDate } = authAndValReq.validatedData.body;
  const userId = authAndValReq.user.id;

  const result = await dashboardRangePaginationService({
    limit,
    page,
    field,
    startDate,
    endDate,
    userId,
  });
  res.status(200);
  res.json(result);
};

export const dashboardPaginationController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authAndValReq = req as DashboardPaginationRequest;
  const { limit, page } = authAndValReq.validatedData.query;
  const { field } = authAndValReq.validatedData.params;

  const userId = authAndValReq.user.id;

  const result = await dashboardPaginationService({
    limit,
    page,
    field,
    userId,
  });
  res.status(200);
  res.json(result);
};

export const dashboardRangeSummaryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authAndValReq = req as DashboardRangeSummaryRequest;

  const { field } = authAndValReq.validatedData.params;
  const { startDate, endDate } = authAndValReq.validatedData.body;
  const userId = authAndValReq.user.id;

  const result = await dashboardRangeSummaryService({
    field,
    startDate,
    endDate,
    userId,
  });

  res.status(200);
  res.json(result);
};

export const dashboardSummaryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authAndValReq = req as DashboardSummaryRequest;
  const { field } = authAndValReq.validatedData.params;
  const userId = authAndValReq.user.id;

  const result = await dashboardSummaryService({ field, userId });

  res.status(200);
  res.json(result);
};

export const dashboardHomeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authAndValReq = req as DashboardHomeRequest;
  const { days } = authAndValReq.validatedData.query;
  const userId = authAndValReq.user.id;

  const result = await dashboardHomeService({ days, userId });

  res.status(200);
  res.json(result);
};
