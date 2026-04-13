import { getProviderForMessage } from "@repo/db";
import { IProvider } from "@repo/db/src/models/provider.model";
import mongoose from "mongoose";

export async function getProviderForMsg(_id: string): Promise<IProvider> {
  try {
    let provider = await getProviderForMessage(_id);
    if (!provider) {
      throw new Error("Resource not found");
    }
    return provider;
  } catch (err) {
    throw err;
  }
}
