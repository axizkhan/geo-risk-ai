import { DashboardFieldType } from "@repo/shared";
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
      throw new Error(
        "wrong field this field dont exist in function orchetrator",
      );
    }

    const result = await dashboardFieldSummaryDatafunc.function({ userId });

    return result;
  } catch (err) {
    throw err;
  }
}
