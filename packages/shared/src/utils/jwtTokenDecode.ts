import jwt from "jsonwebtoken";
import env from "../env/env";

export interface JWTPayload extends jwt.JwtPayload {
  id: string;
  email: string;
  tokenVersion: number | undefined;
}

export async function jwtTokenVerifyAndDecode(
  jwtToken: string,
): Promise<JWTPayload> {
  try {
    const decodeToken = jwt.verify(jwtToken, env.JWT_SECRET as string);
    return decodeToken as JWTPayload;
  } catch (err) {
    throw err;
  }
}
