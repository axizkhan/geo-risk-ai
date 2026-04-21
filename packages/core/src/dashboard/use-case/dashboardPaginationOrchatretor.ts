import { DashboardFieldType } from "@repo/shared";
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
      throw new Error(
        "wrong field this field dont exist in function orchetrator",
      );
    }

    let result = await fieldPaginationFunc.function({ userId, limit, page });

    return result;
  } catch (err) {
    throw err;
  }
}
