import { getProviderForMessage } from "@repo/db";
import { IProvider } from "@repo/db/src/models/provider.model";
import { NotFound } from "@repo/shared";
import { PROVIDER_ERROR_CODE, ERROR_TYPE } from "@repo/shared";
import mongoose from "mongoose";

export async function getProviderForMsg(_id: string): Promise<IProvider> {
  try {
    let provider = await getProviderForMessage(_id);
    if (!provider) {
      throw new NotFound({
        appCode: PROVIDER_ERROR_CODE.NOT_FOUND,
        errorType: ERROR_TYPE.BUSINESS,
        message: "Provider not found",
      });
    }
    return provider;
  } catch (err) {
    throw err;
  }
}
