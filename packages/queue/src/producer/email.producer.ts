import { publishMessage } from "@repo/queue";
import { ChannelType, env } from "@repo/shared";

export const publishEmail = async (msg: {
  messageId: string;
  userId: string;
  type: ChannelType;
}) => {
  try {
    await publishMessage({
      msg,
      channelName: "email_consume_channel",
      //@ts-ignore
      exchange: env.MESSAGE_EXCHANGE,
      //@ts-ignore
      routingKey: env.EMAIL_MSG,
    });
  } catch (err) {
    throw err;
  }
};
