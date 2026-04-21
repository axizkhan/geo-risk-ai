import { providerCreationDTO, BadRequest } from "@repo/shared";
import { PROVIDER_ERROR_CODE, ERROR_TYPE } from "@repo/shared";
import {
  provideConfigValidator,
  validateProviderChannel,
} from "@repo/provider";
import { encryptionProviderConfig } from "../utils/crypto";
import { createProviderDoc } from "@repo/db";
import { HydratedDocument } from "mongoose";
import { IProvider } from "packages/db/src/models/provider.model";

export async function createProvider(
  data: providerCreationDTO,
  userId: string,
): Promise<HydratedDocument<IProvider>> {
  try {
    const { provider_name, type, config } = data;

    const isProviderSupportChannel = validateProviderChannel(
      provider_name,
      type,
    );

    if (!isProviderSupportChannel) {
      throw new BadRequest({
        appCode: PROVIDER_ERROR_CODE.CHANNEL_NOT_SUPPORTED,
        errorType: ERROR_TYPE.VALIDATION,
        message: "Channel not supported by this provider",
      });
    }

    const configAllowed = provideConfigValidator(provider_name, config);

    if (!configAllowed.success) {
      throw new BadRequest({
        appCode: PROVIDER_ERROR_CODE.CONFIG_INVALID,
        errorType: ERROR_TYPE.VALIDATION,
        message: `Provider config invalid: ${configAllowed.error.issues.toString()}`,
      });
    }

    let encrptedProviderConfig = encryptionProviderConfig(config);

    let newProviderDoc = await createProviderDoc({
      userId: "jjkjnje",
      provider_name,
      type,
      config: encrptedProviderConfig,
    });

    return newProviderDoc;
  } catch (err) {
    throw err;
  }
}
