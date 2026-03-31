import { SignupRequestDTO } from "@repo/shared";
import { findUserByEmail, createNewUser, createVerify } from "@repo/db";
import { hashPasswordFunc } from "../utils/hasingPasswordUtil";
import { jwtTokenGeneration } from "../utils/jwtToken";

export type SingupUserFunDTO = {
  verifyToken: string;
};

export async function signupUser(
  data: SignupRequestDTO,
): Promise<SingupUserFunDTO> {
  try {
    const { email, password, name } = data;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      throw new Error("User already exist");
    }

    const hashPassword = await hashPasswordFunc(password);
    const newUser = await createNewUser({
      email,
      password: hashPassword,
      name,
    });
    const verifyToken = jwtTokenGeneration({
      id: newUser._id.toString(),
      email: newUser.email,
    });
    await createVerify(verifyToken, newUser._id.toString());

    return {
      verifyToken,
    };
  } catch (err) {
    throw err;
  }
}
