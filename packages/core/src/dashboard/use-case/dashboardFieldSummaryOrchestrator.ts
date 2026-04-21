import { DashboardFieldType, BadRequest } from "@repo/shared";
import { VALIDATION_ERROR_CODE, ERROR_TYPE } from "@repo/shared";
import { fieldSummaryDataFactoryFunc } from "../util/fieldSummaryDataFactory";

export async function dashboardFieldSummaryOrchestarto({
  field,
  userId,
}: {
  field: DashboardFieldType;
  userId: string;
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

    const result = await dashboardFieldSummaryDatafunc.function({ userId });

    return result;
  } catch (err) {
    throw err;
  }
}
