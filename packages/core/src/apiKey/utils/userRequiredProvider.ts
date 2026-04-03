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

function binarySearch(
  arr: Array<string | number>,
  target: string | number,
): boolean {
  let high = arr.length - 1;
  let low = 0;
  let mid: number;
  while (low <= high) {
    mid = Math.floor((high + low) / 2);
    if (arr[mid] === target) {
      return true;
    } else if (arr[mid] > target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return false;
}
