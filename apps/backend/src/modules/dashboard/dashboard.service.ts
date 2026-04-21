import {
  dashboardFieldSummaryOrchestarto,
  dashboardPaginationOrchestrator,
  dashboardPaginationRangeOrchestrator,
  dashboardRangeFieldRangeSummaryOrchestarto,
} from "@repo/core";
import { DashboardFieldType } from "@repo/shared";

export async function dashboardRangePaginationService({
  limit,
  page,
  field,
  userId,
  startDate,
  endDate,
}: {
  limit: number;
  page: number;
  field: DashboardFieldType;
  userId: string;
  startDate: string;
  endDate: string;
}) {
  try {
    let result = await dashboardPaginationRangeOrchestrator({
      userId,
      startDate,
      endDate,
      limit,
      page,
      field,
    });

    return result;
  } catch (err) {}
}

export async function dashboardPaginationService({
  userId,
  limit,
  page,
  field,
}: {
  userId: string;
  limit: number;
  page: number;
  field: DashboardFieldType;
}) {
  try {
    const result = dashboardPaginationOrchestrator({
      userId,
      page,
      limit,
      field,
    });

    return result;
  } catch (err) {
    throw err;
  }
}

export async function dashboardRangeSummaryService({
  userId,
  startDate,
  endDate,
  field,
}: {
  userId: string;
  startDate: string;
  endDate: string;
  field: DashboardFieldType;
}) {
  try {
    const result = await dashboardRangeFieldRangeSummaryOrchestarto({
      userId,
      field,
      startDate,
      endDate,
    });

    return result;
  } catch (err) {}
}

export async function dashboardSummaryService({
  userId,
  field,
}: {
  userId: string;
  field: DashboardFieldType;
}) {
  try {
    const result = await dashboardFieldSummaryOrchestarto({ field, userId });

    return result;
  } catch (err) {
    throw err;
  }
}

export async function dashboardHomeService({
  userId,
  days,
}: {
  userId: string;
  days: number;
}) {
  try {
    const startDate = new Date(new Date().setHours(0, 0, 0, 0));
    const endDate = new Date(
      new Date(new Date().getDate() - days).setHours(0, 0, 0, 0),
    );
  } catch (err) {
    throw err;
  }
}
