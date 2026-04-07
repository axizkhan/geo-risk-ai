import { ApiKeyAction, ChannelType } from "@repo/shared";

export function apiKeyPerValid({
  permission,
  type,
  channel,
}: {
  permission: { actions: Array<ApiKeyAction>; channel: Array<ChannelType> };
  channel: ChannelType;
  type: ApiKeyAction;
}):
  | { success: true; message: string }
  | { success: false; error: { message: string; errors: Array<string> } } {
  const actionArr = permission.actions;
  const channelArr = permission.channel;
  const errors = [];

  if (!actionArr.includes(type)) {
    errors.push(`Api key doesn't support action:${type}`);
  }

  if (!channelArr.includes(channel)) {
    errors.push(`Api key doesn't support channel:${channel}`);
  }

  if (errors.length) {
    return {
      success: false,
      error: { message: "Api key is not valid for task", errors },
    };
  }

  return { success: true, message: "Api key is valid for task" };
}
