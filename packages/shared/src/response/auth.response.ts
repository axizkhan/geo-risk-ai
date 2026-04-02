import { AUTH_SUCCESS_CODE } from "../codes/auth.codes";

export const AUTH_RESPONSES = {
  LOGIN_SUCCESS: {
    code: 200,
    statusCode: AUTH_CODE.LOGIN_SUCCESS,
    message: "Login successfull",
  },
  LOGOUT_SUCCESS: {
    code: 200,
    statusCode: AUTH_CODE.LOGOUT_SUCCESS,
    message: "Logout successfull",
  },
  SIGNUP_SUCCESS: {
    code: 200,
    statusCode: AUTH_CODE.EMAIL_VERIFICATION_SENT,
    message: "Verification email sent",
  },
  VERIFIED_SUCCESS: {
    code: 201,
    statusCode: AUTH_CODE.EMAIL_VERIFIED,
    message: "Email verified successfully",
  },
};
