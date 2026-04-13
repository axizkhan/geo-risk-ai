import { consumeMessage } from "@repo/queue";
import { sendEmail } from "../service/sendEmail.service";
import { env } from "@repo/shared";

export const startEmailConsumer = async (idx: number) => {
  await consumeMessage({
    //@ts-ignore
    exchangeName: env.MESSAGE_EXCHANGE,
    channelName: `email_consumer_channel_${idx}`,
    //@ts-ignore
    queueName: env.EMAIL_MESSAGE_QUEUE,
    key: "email.*",
    handler: sendEmail,
  });
};
