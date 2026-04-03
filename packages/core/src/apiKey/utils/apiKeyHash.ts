import bcrypt from "bcrypt";
import { env } from "@repo/shared";

export async function hashApiKeyFunc(password: string): Promise<string> {
  return await bcrypt.hash(password, env.SALT_ROUND);
}

export async function compareHasApiKeyFunc(
  plainPassword: string,
  hashPassword: string,
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashPassword);
}
