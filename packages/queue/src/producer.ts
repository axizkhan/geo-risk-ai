import { getChannel } from "./channel";

export const publishMessage = async ({
  msg,
  channelName,
  exchange,
  routingKey,
}: {
  msg: Record<string, any>;
  channelName: string;
  exchange: string;
  routingKey: string;
}) => {
  try {
    const channel = await getChannel(channelName);

    await channel?.assertExchange(exchange, "topic", { durable: true });

    channel?.publish(exchange, routingKey, Buffer.from(JSON.stringify(msg)));

    return true;
  } catch (err) {
    throw err;
  }
};
