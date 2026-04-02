export function configUpdater(
  oldConfig: Record<string, any>,
  newConfig: Record<string, any>,
): Record<string, any> {
  for (let key in newConfig) {
    if (!(key in oldConfig)) {
      throw new Error("Config mismatch");
    }
    oldConfig[key] = newConfig[key];
  }

  return oldConfig;
}
