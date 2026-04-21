import { DashboardFieldType, BadRequest } from "@repo/shared";
import { VALIDATION_ERROR_CODE, ERROR_TYPE } from "@repo/shared";
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
