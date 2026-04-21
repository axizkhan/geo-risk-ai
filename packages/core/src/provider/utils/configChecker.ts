import { BadRequest } from "@repo/shared";
import { PROVIDER_ERROR_CODE, ERROR_TYPE } from "@repo/shared";

export function configUpdater(
  oldConfig: Record<string, any>,
  newConfig: Record<string, any>,
): Record<string, any> {
  for (let key in newConfig) {
    if (!(key in oldConfig)) {
      throw new BadRequest({
        appCode: PROVIDER_ERROR_CODE.CONFIG_MISMATCH,
        errorType: ERROR_TYPE.VALIDATION,
        message: `Configuration key '${key}' is not supported`,
      });
    }
    oldConfig[key] = newConfig[key];
  }

  return oldConfig;
}
