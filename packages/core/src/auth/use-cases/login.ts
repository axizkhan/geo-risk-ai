import { findUserByEmail } from "@repo/db";
import { LoginRequestDTO, LoginResponseDTO } from "@repo/shared";
import { jwtTokenGeneration } from "../utils/jwtToken";

export async function loginUser(
  data: LoginRequestDTO,
): Promise<LoginResponseDTO> {
  let user = await findUserByEmail(data.email);

  if (!user) {
    throw new Error("Singup before processed");
  }

  if (user && user.isVerified === false && user.expireAt) {
    throw new Error("Verify email before proccessed");
  }

  const authToken = jwtTokenGeneration(
    { id: user._id.toString(), email: user.email },
    user.tokenVersion,
  );
  return {
    token: authToken,
  };
}
