import { ProviderName, InternalServerError } from "@repo/shared";
import { SYSTEM_ERROR_CODE, ERROR_TYPE } from "@repo/shared";
import { providerValidatorsFactory } from "./providerConfigValidationFacory";

export function provideConfigValidator(
  providerName: ProviderName,
  config: any,
) {
  const providerValidator = providerValidatorsFactory[providerName];

  if (!providerValidator) {
    throw new InternalServerError({
      appCode: SYSTEM_ERROR_CODE.INTERNAL_SERVER_ERROR,
      errorType: ERROR_TYPE.SYSTEM,
      message: `Provider '${providerName}' validator not found`,
    });
  }

  return providerValidator.validateConfig(config);
}
