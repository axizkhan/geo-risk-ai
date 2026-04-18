import {
  IDailyAnalytics,
  IDailyApi,
  IDailyChannel,
  IDailyProvider,
} from "../models/dashboard";

export type DashBoardMultipleDocsQuery = {
  totalSent?: number;
  totalFailed?: number;
  count?: number;
};

export type FindChannelRangeDoc = DashBoardMultipleDocsQuery & {
  data: IDailyChannel[];
};

export type FindAnalyticsRangeDoc = DashBoardMultipleDocsQuery & {
  data: IDailyAnalytics[];
};

export type FindApiKeyRange = DashBoardMultipleDocsQuery & {
  data: IDailyApi[];
};

export type FindProviderRange = DashBoardMultipleDocsQuery & {
  data: IDailyProvider[];
};
