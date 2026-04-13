import { findProviderForJob } from "@repo/db";
import { ChannelType } from "@repo/shared";
import mongoose from "mongoose";
import { IProvider } from "packages/db/src/models/provider.model";

export async function findProvider4Job({
  userId,
  channel,
}: {
  userId: string;
  channel: ChannelType;
}): Promise<mongoose.HydratedDocument<IProvider>> {
  try {
    let providerDoc = await findProviderForJob({ userId, type: channel });
    if (!providerDoc) {
      throw new Error(`User dont have provider for the channel:${channel}`);
    }

    return providerDoc;
  } catch (err) {
    throw err;
  }
}
