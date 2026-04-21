import { DashboardFieldType } from "@repo/shared";
import {
  findAnalyticsRange,
  findApiKeyRange,
  findChannelRange,
  findProviderRange,
} from "../module";

type DashboardAllDocFunction = ({
  userId,
  startDate,
  endDate,
}: {
  userId: string;
  startDate: string;
  endDate: string;
}) => Promise<{ success: boolean; message: string; data: any }>;

const fieldSummaryFactory: Record<DashboardFieldType, DashboardAllDocFunction> =
  {
    apiKey: findApiKeyRange,
    channel: findChannelRange,
    provider: findProviderRange,
    all: findAnalyticsRange,
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
