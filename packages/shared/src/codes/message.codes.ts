export const MESSAGE_ERROR_CODE = {
  NOT_FOUND: "MESSAGE_NOT_FOUND",
  CREATION_FAILED: "MESSAGE_CREATION_FAILED",
  INVALID_DATA: "MESSAGE_INVALID_DATA",
} as const;

export const MESSAGE_SUCCESS = {
  CREATED: {
    code: "MESSAGE_CREATED",
    httpCode: 201,
    message: "Message created successfully",
  },
  FETCHED: {
    code: "MESSAGE_FETCHED",
    httpCode: 200,
    message: "Messages fetched successfully",
  },
} as const;
