import { EncryptedProviderConfig, env } from "@repo/shared";
import crypto from "crypto";

const key = env.PROVIDER_ENC_KEY;
const algorithm = env.ENC_ALGORITHM;

export function encryptionProviderConfig(
  config: object,
): EncryptedProviderConfig {
  const iv = crypto.randomBytes(16);

  const cipherEngine = crypto.createCipheriv(
    algorithm as crypto.CipherCCMTypes,
    key as crypto.CipherKey,
    iv,
  );

  let encrypted = cipherEngine.update(JSON.stringify(config), "utf8");
  encrypted = Buffer.concat([encrypted, cipherEngine.final()]);

  return {
    configEnc: encrypted.toString("hex"),
    iv: iv.toString("hex"),
  };
}

export function decrptyProviderConfig(
  configCipher: string,
  ivHex: string,
): object {
  const iv = Buffer.from(ivHex, "utf8");

  const decipherEngine = crypto.createDecipheriv(
    algorithm as crypto.CipherCCMTypes,
    key as crypto.CipherKey,
    iv,
  );

  let decrypted = decipherEngine.update(Buffer.from(configCipher, "utf8"));
  decrypted = Buffer.concat([decrypted, decipherEngine.final()]);

  return JSON.parse(decrypted.toString("utf8"));
}
