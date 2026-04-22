export const DELIVERY_ERROR_CODE = {
  CREATION_FAILED: "DELIVERY_CREATION_FAILED",
  RETRY_FAILED: "DELIVERY_RETRY_FAILED",
} as const;

export const DELIVERY_SUCCESS = {
  CREATED: {
    code: "DELIVERY_CREATED",
    httpCode: 201,
    message: "Delivery created successfully",
  },
  SENT: {
    code: "DELIVERY_SENT",
    httpCode: 200,
    message: "Delivery sent successfully",
  },
  FAILED: {
    code: "DELIVERY_FAILED",
    httpCode: 200,
    message: "Delivery processed with failures",
  },
} as const;
