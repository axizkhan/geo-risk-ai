import { decrptProviderConfig } from "../utils/crypto";

export async function decrptProvider({
  configCipher,
  ivHex,
}: {
  configCipher: string;
  ivHex: string;
}) {
  const config: any = decrptProviderConfig(configCipher, ivHex);
  return config;
}
