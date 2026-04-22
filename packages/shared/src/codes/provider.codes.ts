export const PROVIDER_ERROR_CODE = {
  NOT_FOUND: "PROVIDER_NOT_FOUND",
  CHANNEL_NOT_SUPPORTED: "PROVIDER_CHANNEL_NOT_SUPPORTED",
  CONFIG_INVALID: "PROVIDER_CONFIG_INVALID",
  CONFIG_MISMATCH: "PROVIDER_CONFIG_MISMATCH",
} as const;

export const PROVIDER_SUCCESS = {
  CREATED: {
    code: "PROVIDER_CREATED",
    httpCode: 201,
    message: "Provider created successfully",
  },
  UPDATED: {
    code: "PROVIDER_UPDATED",
    httpCode: 200,
    message: "Provider updated successfully",
  },
  DELETED: {
    code: "PROVIDER_DELETED",
    httpCode: 200,
    message: "Provider deleted successfully",
  },
} as const;
