export class HttpServerError extends Error {
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

export class InternalServerError extends HttpServerError {
  constructor(
    errorMessage: string = "Internal Server Error",
    errorCode: string,
  ) {
    super(500, errorMessage, "INTERNAL_SERVER_ERROR", errorCode);
  }
}

export class NotImplemented extends HttpServerError {
  constructor(errorMessage: string = "Not Implemented", errorCode: string) {
    super(501, errorMessage, "NOT_IMPLEMENTED", errorCode);
  }
}

export class BadGateway extends HttpServerError {
  constructor(errorMessage: string = "Bad Gateway", errorCode: string) {
    super(502, errorMessage, "BAD_GATEWAY", errorCode);
  }
}

export class ServiceUnavailable extends HttpServerError {
  constructor(errorMessage: string = "Service Unavailable", errorCode: string) {
    super(503, errorMessage, "SERVICE_UNAVAILABLE", errorCode);
  }
}

export class GatewayTimeout extends HttpServerError {
  constructor(errorMessage: string = "Gateway Timeout", errorCode: string) {
    super(504, errorMessage, "GATEWAY_TIMEOUT", errorCode);
  }
}
