export const ERROR_TYPE = {
  VALIDATION: "VALIDATION",
  AUTH: "AUTH",
  BUSINESS: "BUSINESS",
  SYSTEM: "SYSTEM",
} as const;

export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL: 500,
} as const;

export type ErrorType = (typeof ERROR_TYPE)[keyof typeof ERROR_TYPE];
