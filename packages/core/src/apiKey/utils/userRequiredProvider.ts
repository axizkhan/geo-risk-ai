import { ChannelType } from "@repo/shared";

export const userRequiredProvider = (
  existingChannelArr: Array<ChannelType>,
  requestedChannelArr: Array<ChannelType>,
): {
  success: boolean;
  message: string;
} => {
  const exitingSet = new Set(existingChannelArr);
  let missing: Array<ChannelType> = [];
  let success: boolean = true;

  for (let channel of requestedChannelArr) {
    if (!exitingSet.has(channel)) {
      missing.push(channel);
      success = false;
    }
  }

  if (!success) {
    return { success, message: `Missing provider for: ${missing.join(", ")}` };
  }
  return { success, message: "All required provider exist" };
};
