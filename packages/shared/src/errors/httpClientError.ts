import { ERROR_TYPE, ErrorType } from "../codes/schema.codes";
import { AppErrorCode, HttpError } from "./appError";

export class HttpClientError extends HttpError {
  constructor(params: ConstructorParameters<typeof HttpError>[0]) {
    super(params);
  }
}

export class BadRequest extends HttpClientError {
  constructor({
    appCode,
    errorType,
    message = "Bad Request",
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
      httpCode: "BAD_REQUEST",
      statusCode: 401,
    });
  }
}

export class Unauthorized extends HttpClientError {
  constructor({
    appCode,
    errorType,
    message = "Unauthorized",
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
      httpCode: "UNAUTHORIZED",
      statusCode: 401,
    });
  }
}

export class Forbidden extends HttpClientError {
  constructor({
    appCode,
    errorType,
    message = "Forbidden",
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
      httpCode: "FORBIDDEN",
      statusCode: 403,
    });
  }
}

export class NotFound extends HttpClientError {
  constructor({
    appCode,
    errorType,
    message = "Data Not Found",
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
      httpCode: "RESOURCE_NOT_FOUND",
      statusCode: 404,
    });
  }
}

export class MethodNotAllowed extends HttpClientError {
  constructor({
    appCode,
    errorType,
    message = "Method Not Allowed",
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
      httpCode: "METHOD_NOT_ALLOWED",
      statusCode: 405,
    });
  }
}

export class Conflict extends HttpClientError {
  constructor({
    appCode,
    errorType,
    message = "Conflict",
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
      httpCode: "CONFLICT",
      statusCode: 409,
    });
  }
}

export class UnprocessableEntity extends HttpClientError {
  constructor({
    appCode,
    errorType,
    message = "Unprocessable Entity",
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
      httpCode: "UNPROCESSABLE_ENTITY",
      statusCode: 422,
    });
  }
}

export class TooManyRequests extends HttpClientError {
  constructor({
    appCode,
    errorType,
    message = "Too Many Requests",
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
      httpCode: "TOO_MANY_REQUESTS",
      statusCode: 429,
    });
  }
}
