import { findVerifyToken, verifyUser } from "@repo/db";
import {
  jwtTokenVerifyAndDecode,
  VerifyRequestDTO,
  VerifyResponseDTO,
} from "@repo/shared";
import { jwtTokenGeneration } from "../utils/jwtToken";

export async function verifyUserToken(
  data: VerifyRequestDTO,
): Promise<VerifyResponseDTO> {
  const { verifyToken } = data;

  const verifyTokenDocument = await findVerifyToken(verifyToken);

  if (!verifyTokenDocument) {
    throw new Error("verify token expire please signup again");
  }

  const decodeToken = await jwtTokenVerifyAndDecode(verifyToken);

  const verifyUserDocument = await verifyUser(decodeToken.id);

  if (!verifyUserDocument) {
    throw new Error("Verify token expire please signup again");
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
