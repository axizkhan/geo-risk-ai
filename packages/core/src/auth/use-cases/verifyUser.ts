import { findVerifyToken, verifyUser } from "@repo/db";
import {
  jwtTokenVerifyAndDecode,
  VerifyRequestDTO,
  VerifyResponseDTO,
  Unauthorized,
} from "@repo/shared";
import { AUTH_ERROR_CODE, ERROR_TYPE } from "@repo/shared";
import { jwtTokenGeneration } from "../utils/jwtToken";

export async function verifyUserToken(
  data: VerifyRequestDTO,
): Promise<VerifyResponseDTO> {
  const { verifyToken } = data;

  const verifyTokenDocument = await findVerifyToken(verifyToken);

  if (!verifyTokenDocument) {
    throw new Unauthorized({
      appCode: AUTH_ERROR_CODE.TOKEN_EXPIRED,
      errorType: ERROR_TYPE.AUTH,
      message: "Verification token has expired. Please signup again",
    });
  }

  const decodeToken = await jwtTokenVerifyAndDecode(verifyToken);

  const verifyUserDocument = await verifyUser(decodeToken.id);

  if (!verifyUserDocument) {
    throw new Unauthorized({
      appCode: AUTH_ERROR_CODE.TOKEN_EXPIRED,
      errorType: ERROR_TYPE.AUTH,
      message: "Verification token has expired. Please signup again",
    });
  }

  const authToken = jwtTokenGeneration(
    {
      id: verifyUserDocument._id.toString(),
      email: verifyUserDocument.email,
    },
    verifyUserDocument.tokenVersion,
  );

  return { token: authToken };
}
