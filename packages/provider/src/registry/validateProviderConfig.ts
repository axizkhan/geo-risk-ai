import { ProviderName } from "@repo/shared";
import { providerValidatorsFactory } from "./providerConfigValidationFacory";

export function provideConfigValidator(
  providerName: ProviderName,
  config: any,
) {
  const providerValidator = providerValidatorsFactory[providerName];

  if (!providerValidator) {
    throw new Error("Provider dont exist");
  }

  return providerValidator.validateConfig(config);
}
