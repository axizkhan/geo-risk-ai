import { DashboardFieldType } from "@repo/shared";
import { dashboardDatesValidateFunc } from "../util/dashboardDateValidation";
import { fieldRangePaginationFactoryFunc } from "../util/fieldPaginationRangeFactory";

export async function dashboardPaginationRangeOrchestrator({
  userId,
  page,
  limit,
  field,
  startDate,
  endDate,
}: {
  userId: string;
  page: number;
  limit: number;
  field: DashboardFieldType;
  startDate: string;
  endDate: string;
}) {
  try {
    const fieldPaginationFunc = fieldRangePaginationFactoryFunc(field);
    if (!fieldPaginationFunc.function) {
      throw new Error(
        "wrong field this field dont exist in function orchetrator",
      );
    }

    let datesValidation = dashboardDatesValidateFunc({ startDate, endDate });

    if (!datesValidation.success) {
      throw new Error(datesValidation.error);
    }

    let result = await fieldPaginationFunc.function({
      userId,
      limit,
      page,
      startDate,
      endDate,
    });

    return result;
  } catch (err) {
    throw err;
  }
}
