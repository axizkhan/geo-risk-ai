export const API_KEY_ERROR_CODE = {
  NOT_FOUND: "APIKEY_NOT_FOUND",
  INVALID: "APIKEY_INVALID",
  PROVIDER_NOT_FOUND: "APIKEY_PROVIDER_NOT_FOUND",
} as const;

export const API_KEY_SUCCESS = {
  CREATED: {
    code: "APIKEY_CREATED",
    httpCode: 201,
    message: "API key created successfully",
  },
  DELETED: {
    code: "APIKEY_DELETED",
    httpCode: 200,
    message: "API key deleted successfully",
  },
  FETCHED: {
    code: "APIKEY_FETCHED",
    httpCode: 200,
    message: "API keys fetched successfully",
  },
} as const;
