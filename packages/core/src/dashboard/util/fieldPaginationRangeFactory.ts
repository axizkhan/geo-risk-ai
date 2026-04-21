import { DashboardFieldType } from "@repo/shared";
import {
  dailyAnalyticsRangePagination,
  dailyApiKeyRangePagination,
  dailyChannelRangePagination,
  dailyProviderRangePagination,
} from "../module";

/**validation function type */
type DashboardPaginationRangeFunction = ({
  userId,
  limit,
  page,
  startDate,
  endDate,
}: {
  userId: string;
  limit: number;
  page: number;
  startDate: string;
  endDate: string;
}) => Promise<{ success: boolean; message: string; data: any }>;

/**validation function factory object */
const fieldRangePaginationFactory: Record<
  DashboardFieldType,
  DashboardPaginationRangeFunction
> = {
  apiKey: dailyApiKeyRangePagination,
  channel: dailyChannelRangePagination,
  provider: dailyProviderRangePagination,
  all: dailyAnalyticsRangePagination,
};

/**validation factory function */
export const fieldRangePaginationFactoryFunc = (
  field: DashboardFieldType,
): {
  success: boolean;
  message: string;
  function: DashboardPaginationRangeFunction | null;
} => {
  if (!(field in fieldRangePaginationFactory)) {
    return {
      success: false,
      message: "function for the field is not exist",
      function: null,
    };
  }

  return {
    success: true,
    message: "function for the field exist",
    function: fieldRangePaginationFactory[field],
  };
};
