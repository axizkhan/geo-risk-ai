import crypto from "crypto";

export function apiKeyGenerator(): string {
  return crypto.randomBytes(32).toString("hex");
}
