import bcrypt from "bcrypt";
import { env } from "@repo/shared";
import crypto from "crypto";

export async function hashApiKeyFunc(
  password: string,
  userId: string,
): Promise<string> {
  return crypto
    .createHash("sha256")
    .update(password + userId)
    .digest("hex");
}

export async function compareHasApiKeyFunc(
  plainPassword: string,
  hashPassword: string,
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashPassword);
}
