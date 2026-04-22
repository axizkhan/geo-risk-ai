export const AUTH_SUCCESS = {
  LOGIN_SUCCESS: {
    code: "AUTH_LOGIN_SUCCESS",
    httpCode: 200,
    message: "Login successful",
  },
  LOGOUT_SUCCESS: {
    code: "AUTH_LOGOUT_SUCCESS",
    httpCode: 200,
    message: "Logout successful",
  },
  EMAIL_VERIFIED: {
    code: "AUTH_EMAIL_VERIFIED",
    httpCode: 200,
    message: "Email verified successfully",
  },
  EMAIL_VERIFICATION_SENT: {
    code: "AUTH_EMAIL_VERIFICATION_SENT",
    httpCode: 200,
    message: "Verification email sent successfully",
  },
} as const;

export const AUTH_ERROR_CODE = {
  TOKEN_EXPIRED: "AUTH_TOKEN_EXPIRED",
  USER_NOT_VERIFIED: "AUTH_USER_NOT_VERIFIED",
  USER_NOT_AUTHENTICATED: "AUTH_USER_NOT_AUTHENTICATED",
  EMAIL_ALREADY_EXISTS: "AUTH_EMAIL_ALREADY_EXISTS",
  INVALID_CREDENTIALS: "AUTH_INVALID_CREDENTIALS",
  SESSION_EXPIRED: "AUTH_SESSION_EXPIRED",
} as const;
