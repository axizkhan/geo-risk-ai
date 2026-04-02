import { providerCreationDTO } from "@repo/shared";
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
      throw new Error("Channel not supported by provider");
    }

    const configAllowed = provideConfigValidator(provider_name, config);

    if (!configAllowed.success) {
      throw new Error(
        `Provider config not matched, ${configAllowed.error.issues.toString()}`,
      );
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
