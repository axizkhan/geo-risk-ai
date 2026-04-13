import { getChannel } from "./channel";

export const consumeMessage = async ({
  exchangeName,
  queueName,
  key,
  handler,
  channelName,
}: {
  exchangeName: string;
  queueName: string;
  key: string;
  channelName: string;
  handler: (msg: any) => Promise<void>;
}) => {
  try {
    const channel = await getChannel(channelName);

    await channel?.assertExchange(exchangeName, "topic", { durable: true });

    await channel?.assertQueue(queueName, { durable: true });

    await channel?.bindQueue(queueName, exchangeName, key);

    await channel?.prefetch(1);

    channel?.consume(
      queueName,
      async (msg) => {
        if (!msg) return;

        try {
          const message = JSON.parse(msg.content.toString());

          await handler(message);

          channel.ack(msg);
        } catch (err) {
          channel.nack(msg, false, false);
          throw err;
        }
      },
      { noAck: false },
    );
  } catch (err) {
    throw err;
  }
};
