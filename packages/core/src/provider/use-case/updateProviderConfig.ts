import {
  findProviderByProviderIdAndUserId,
  updateProviderConfigById,
} from "@repo/db";
import {
  decrptyProviderConfig,
  encryptionProviderConfig,
} from "../utils/crypto";
import { configUpdater } from "../utils/configChecker";
import { ProviderName } from "@repo/shared";
import { provideConfigValidator } from "@repo/provider";

export async function updateProviderConfig({
  providerId,
  config,
  provider_name,
  userId,
}: {
  providerId: string;
  config: any;
  provider_name: ProviderName;
  userId: string;
}) {
  try {
    let providerDocument = await findProviderByProviderIdAndUserId(
      providerId,
      userId,
    );

    if (!providerDocument) {
      throw new Error("provider document don't exist");
    }

    const dcrptedConfig = decrptyProviderConfig(
      providerDocument.config.configEnc,
      providerDocument.config.iv,
    );

    const updatedConfig = configUpdater(dcrptedConfig, config);
    const validateConfig = provideConfigValidator(provider_name, updatedConfig);

    if (!validateConfig.success) {
      throw new Error(
        `Validate config fail ${validateConfig.error.issues.toString()}`,
      );
    }

    const encrptedConfig = encryptionProviderConfig(validateConfig);
    const updateConfig = await updateProviderConfigById(
      providerId,
      encrptedConfig,
    );

    return "provider config updated successfully";
  } catch (err) {
    throw err;
  }
}
