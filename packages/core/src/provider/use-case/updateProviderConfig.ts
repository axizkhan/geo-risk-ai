import {
  findProviderByProviderIdAndUserId,
  updateProviderConfigById,
} from "@repo/db";
import { NotFound, BadRequest } from "@repo/shared";
import { PROVIDER_ERROR_CODE, ERROR_TYPE } from "@repo/shared";
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
      throw new NotFound({
        appCode: PROVIDER_ERROR_CODE.NOT_FOUND,
        errorType: ERROR_TYPE.BUSINESS,
        message: "Provider not found",
      });
    }

    const dcrptedConfig = decrptyProviderConfig(
      providerDocument.config.configEnc,
      providerDocument.config.iv,
    );

    const updatedConfig = configUpdater(dcrptedConfig, config);
    const validateConfig = provideConfigValidator(provider_name, updatedConfig);

    if (!validateConfig.success) {
      throw new BadRequest({
        appCode: PROVIDER_ERROR_CODE.CONFIG_INVALID,
        errorType: ERROR_TYPE.VALIDATION,
        message: `Provider config validation failed: ${validateConfig.error.issues.toString()}`,
      });
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
