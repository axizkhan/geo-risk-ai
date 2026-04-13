import amqp, { ChannelModel } from "amqplib";
import { env } from "@repo/shared";

let connection: undefined | ChannelModel = undefined;

export const getConnection = async () => {
  try {
    if (!connection) {
      connection = await amqp.connect(env.RABBIT_QUEUE_LINK as string);
    }

    return connection;
  } catch (err) {
    throw err;
  }
};
