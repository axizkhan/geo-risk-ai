import { DashboardFieldType } from "@repo/shared";
import { fieldSummaryDataFactoryFunc } from "../util/fieldSummaryDataFactory";
import { dashboardDatesValidateFunc } from "../util/dashboardDateValidation";

export async function dashboardRangeFieldRangeSummaryOrchestarto({
  field,
  userId,
  startDate,
  endDate,
}: {
  field: DashboardFieldType;
  userId: string;
  startDate: string;
  endDate: string;
}) {
  try {
    const dashboardFieldSummaryDatafunc = fieldSummaryDataFactoryFunc(field);

    if (!dashboardFieldSummaryDatafunc.function) {
      throw new Error(
        "wrong field this field dont exist in function orchetrator",
      );
    }

    let datesValidation = dashboardDatesValidateFunc({ startDate, endDate });

    if (!datesValidation.success) {
      throw new Error(datesValidation.error);
    }

    const result = await dashboardFieldSummaryDatafunc.function({ userId });

    return result;
  } catch (err) {
    throw err;
  }
}
