import { findProviderForJob } from "@repo/db";
import { ChannelType, NotFound } from "@repo/shared";
import { PROVIDER_ERROR_CODE, ERROR_TYPE } from "@repo/shared";
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
      throw new NotFound({
        appCode: PROVIDER_ERROR_CODE.NOT_FOUND,
        errorType: ERROR_TYPE.BUSINESS,
        message: `No provider configured for channel: ${channel}`,
      });
    }

    return providerDoc;
  } catch (err) {
    throw err;
  }
}
