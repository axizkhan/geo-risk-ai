import { DashboardFieldType } from "@repo/shared";
import {
  dailyAnalyticsPagination,
  dailyApiKeyPagination,
  dailyChannelPagination,
  dailyProviderPagination,
} from "../module";

type DashboardPaginationFunction = ({
  userId,
  limit,
  page,
}: {
  userId: string;
  limit: number;
  page: number;
}) => Promise<{ success: boolean; message: string; data: any }>;

const fieldPaginationFactory: Record<
  DashboardFieldType,
  DashboardPaginationFunction
> = {
  apiKey: dailyApiKeyPagination,
  channel: dailyChannelPagination,
  provider: dailyProviderPagination,
  all: dailyAnalyticsPagination,
};

export const fieldPaginationFactoryFunc = (
  field: DashboardFieldType,
): {
  success: boolean;
  message: string;
  function: DashboardPaginationFunction | null;
} => {
  if (!(field in fieldPaginationFactory)) {
    return {
      success: false,
      message: "function for the field is not exist",
      function: null,
    };
  }

  return {
    success: true,
    message: "function for the field exist",
    function: fieldPaginationFactory[field],
  };
};
