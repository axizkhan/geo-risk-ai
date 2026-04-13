import { Channel } from "amqplib";
import { getConnection } from "./connection";

const channels: Map<string, Channel> = new Map();

export const getChannel = async (name: string) => {
  try {
    if (!channels.has(name)) {
      const connection = await getConnection();
      const channel = await connection.createChannel();
      channels.set(name, channel);
    }
    return channels.get(name);
  } catch (err) {
    throw err;
  }
};
