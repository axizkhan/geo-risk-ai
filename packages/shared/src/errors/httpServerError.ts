import { ERROR_TYPE, ErrorType } from "../codes/schema.codes";
import { AppErrorCode, HttpError } from "./appError";

export class HttpServerError extends HttpError {
  constructor(params: ConstructorParameters<typeof HttpError>[0]) {
    super(params);
  }
}

export class InternalServerError extends HttpServerError {
  constructor({
    appCode,
    errorType,
    message = "Internel server error",
    meta,
  }: {
    appCode: AppErrorCode;
    errorType: ErrorType;
    message?: string;
    meta?: Record<string, any>;
  }) {
    super({
      appCode,
      errorType,
      message,
      meta,
      httpCode: "INTERNAL_SERVER_ERROR",
      statusCode: 500,
    });
  }
}

export class NotImplemented extends HttpServerError {
  constructor({
    appCode,
    errorType,
    message = "Not Implemented",
    meta,
  }: {
    appCode: AppErrorCode;
    errorType: ErrorType;
    message?: string;
    meta?: Record<string, any>;
  }) {
    super({
      appCode,
      errorType,
      message,
      meta,
      httpCode: "NOT_IMPLEMENTED",
      statusCode: 501,
    });
  }
}

export class BadGateway extends HttpServerError {
  constructor({
    appCode,
    errorType,
    message = "Bad Gateway",
    meta,
  }: {
    appCode: AppErrorCode;
    errorType: ErrorType;
    message?: string;
    meta?: Record<string, any>;
  }) {
    super({
      appCode,
      errorType,
      message,
      meta,
      httpCode: "BAD_GATEWAY",
      statusCode: 502,
    });
  }
}

export class ServiceUnavailable extends HttpServerError {
  constructor({
    appCode,
    errorType,
    message = "Service Unavailable",
    meta,
  }: {
    appCode: AppErrorCode;
    errorType: ErrorType;
    message?: string;
    meta?: Record<string, any>;
  }) {
    super({
      appCode,
      errorType,
      message,
      meta,
      httpCode: "SERVICE_UNAVAILABLE",
      statusCode: 503,
    });
  }
}

export class GatewayTimeout extends HttpServerError {
  constructor({
    appCode,
    errorType,
    message = "Gateway Timeout",
    meta,
  }: {
    appCode: AppErrorCode;
    errorType: ErrorType;
    message?: string;
    meta?: Record<string, any>;
  }) {
    super({
      appCode,
      errorType,
      message,
      meta,
      httpCode: "GATEWAY_TIMEOUT",
      statusCode: 504,
    });
  }
}
