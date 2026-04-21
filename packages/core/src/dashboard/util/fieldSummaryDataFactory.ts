import { DashboardFieldType } from "@repo/shared";
import {
  findAllDailyAnalyticsDocs,
  findAllDailyApiKeyDocs,
  findAllDailyChannel,
  findAllDailyProviderDocs,
} from "../module";

type DashboardAllDocFunction = ({
  userId,
}: {
  userId: string;
}) => Promise<{ success: boolean; message: string; data: any }>;

const fieldSummaryFactory: Record<DashboardFieldType, DashboardAllDocFunction> =
  {
    apiKey: findAllDailyApiKeyDocs,
    channel: findAllDailyChannel,
    provider: findAllDailyProviderDocs,
    all: findAllDailyAnalyticsDocs,
  };

export function fieldSummaryDataFactoryFunc(field: DashboardFieldType) {
  if (!(field in fieldSummaryFactory)) {
    return {
      success: false,
      message: "function for the field is not exist",
      function: null,
    };
  }

  return {
    success: true,
    message: "function for the field exist",
    function: fieldSummaryFactory[field],
  };
}
