import { DashboardFieldType, BadRequest } from "@repo/shared";
import { VALIDATION_ERROR_CODE, ERROR_TYPE } from "@repo/shared";
import { fieldPaginationFactoryFunc } from "../util/fieldPaginationFactory";

export async function dashboardPaginationOrchestrator({
  userId,
  page,
  limit,
  field,
}: {
  userId: string;
  page: number;
  limit: number;
  field: DashboardFieldType;
}) {
  try {
    const fieldPaginationFunc = fieldPaginationFactoryFunc(field);
    if (!fieldPaginationFunc.function) {
      throw new BadRequest({
        appCode: VALIDATION_ERROR_CODE.INVALID_INPUT,
        errorType: ERROR_TYPE.VALIDATION,
        message: `Invalid field '${field}' does not exist in dashboard`,
      });
    }

    let result = await fieldPaginationFunc.function({ userId, limit, page });

    return result;
  } catch (err) {
    throw err;
  }
}
