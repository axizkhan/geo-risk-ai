import { DashboardFieldType, BadRequest } from "@repo/shared";
import { VALIDATION_ERROR_CODE, ERROR_TYPE } from "@repo/shared";
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
      throw new BadRequest({
        appCode: VALIDATION_ERROR_CODE.INVALID_INPUT,
        errorType: ERROR_TYPE.VALIDATION,
        message: `Invalid field '${field}' does not exist in dashboard`,
      });
    }

    let datesValidation = dashboardDatesValidateFunc({ startDate, endDate });

    if (!datesValidation.success) {
      throw new BadRequest({
        appCode: VALIDATION_ERROR_CODE.INVALID_INPUT,
        errorType: ERROR_TYPE.VALIDATION,
        message: datesValidation.error,
      });
    }

    const result = await dashboardFieldSummaryDatafunc.function({ userId });

    return result;
  } catch (err) {
    throw err;
  }
}
