import {
  API_KEY_ERROR_CODE,
  AUTH_ERROR_CODE,
  ErrorType,
  MESSAGE_ERROR_CODE,
  PROVIDER_ERROR_CODE,
  SYSTEM_ERROR_CODE,
  VALIDATION_ERROR_CODE,
} from "../codes";

export type AppErrorCode =
  | (typeof API_KEY_ERROR_CODE)[keyof typeof API_KEY_ERROR_CODE]
  | (typeof AUTH_ERROR_CODE)[keyof typeof AUTH_ERROR_CODE]
  | (typeof SYSTEM_ERROR_CODE)[keyof typeof SYSTEM_ERROR_CODE]
  | (typeof VALIDATION_ERROR_CODE)[keyof typeof VALIDATION_ERROR_CODE]
  | (typeof MESSAGE_ERROR_CODE)[keyof typeof MESSAGE_ERROR_CODE]
  | (typeof PROVIDER_ERROR_CODE)[keyof typeof PROVIDER_ERROR_CODE];

export class AppError extends Error {
  public statusCode: number;
  public errorCode: string | AppErrorCode;
  public errorType: string;
  public isOperational: boolean;
  public meta?: Record<string, any>;

  constructor({
    statusCode,
    errorCode,
    errorType,
    message,
    meta,
  }: {
    statusCode: number;
    errorCode: string | AppErrorCode;
    errorType: ErrorType;
    message: string;
    meta?: Record<string, any>;
  }) {
    super(message);

    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.isOperational = true;
    this.meta = meta;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class HttpError extends AppError {
  public httpCode: string; // BAD_REQUEST, INTERNAL_SERVER_ERROR
  public appCode: AppErrorCode; // AUTH_INVALID_CREDENTIALS, APIKEY_NOT_FOUND

  constructor({
    statusCode,
    httpCode,
    appCode,
    errorType,
    message,
    meta,
  }: {
    statusCode: number;
    httpCode: string;
    appCode: AppErrorCode;
    errorType: ErrorType;
    message: string;
    meta?: Record<string, any>;
  }) {
    super({
      statusCode,
      errorCode: appCode, // keep base compatibility
      errorType,
      message,
      meta,
    });

    this.httpCode = httpCode;
    this.appCode = appCode;
  }
}
