export class HttpClientError extends Error {
  public statusCode: number;
  public errorMessage: string;
  public errorType: string;
  public isOperational: boolean;
  public errorCode: string;
  public meta?: Record<string, any>;

  constructor(
    statusCode: number,
    errorMessage: string,
    errorType: string,
    errorCode: string,
    meta?: Record<string, any>,
  ) {
    super(errorMessage);

    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
    this.errorType = errorType;
    this.isOperational = true;
    this.errorCode = errorCode;
    this.meta = meta;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class BadRequest extends HttpClientError {
  constructor(
    errorMessage: string = "Bad Request",
    errorCode: string,
    meta?: Record<string, any>,
  ) {
    super(400, errorMessage, "BAD_REQUEST", errorCode, meta);
  }
}

export class Unauthorized extends HttpClientError {
  constructor(
    errorMessage: string = "Unauthorized",
    errorCode: string,
    meta?: Record<string, any>,
  ) {
    super(401, errorMessage, "UNAUTHORIZED", errorCode, meta);
  }
}

export class Forbidden extends HttpClientError {
  constructor(
    errorMessage: string = "Forbidden",
    errorCode: string,
    meta?: Record<string, any>,
  ) {
    super(403, errorMessage, "FORBIDDEN", errorCode, meta);
  }
}

export class NotFound extends HttpClientError {
  constructor(
    errorMessage: string = "Data Not Found",
    errorCode: string,
    meta?: Record<string, any>,
  ) {
    super(404, errorMessage, "RESOURCE_NOT_FOUND", errorCode, meta);
  }
}

export class MethodNotAllowed extends HttpClientError {
  constructor(
    errorMessage: string = "Method Not Allowed",
    errorCode: string,
    meta?: Record<string, any>,
  ) {
    super(405, errorMessage, "METHOD_NOT_ALLOWED", errorCode, meta);
  }
}

export class Conflict extends HttpClientError {
  constructor(
    errorMessage: string = "Conflict",
    errorCode: string,
    meta?: Record<string, any>,
  ) {
    super(409, errorMessage, "CONFLICT", errorCode, meta);
  }
}

export class UnprocessableEntity extends HttpClientError {
  constructor(
    errorMessage: string = "Unprocessable Entity",
    errorCode: string,
    meta?: Record<string, any>,
  ) {
    super(422, errorMessage, "UNPROCESSABLE_ENTITY", errorCode, meta);
  }
}

export class TooManyRequests extends HttpClientError {
  constructor(
    errorMessage: string = "Too Many Requests",
    errorCode: string,
    meta?: Record<string, any>,
  ) {
    super(429, errorMessage, "TOO_MANY_REQUESTS", errorCode, meta);
  }
}
