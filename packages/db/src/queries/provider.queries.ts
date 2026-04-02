import { EncryptedProviderConfig } from "@repo/shared";
import { IProvider, ProviderModel } from "../models/provider.model";
import { providerCreateDoc } from "../types/provider.types";
import mongoose from "mongoose";

export const createProviderDoc = async (data: providerCreateDoc) => {
  try {
    return await ProviderModel.create(data);
  } catch (err) {
    throw err;
  }
};

export const getAllUserProvider = async (userId: string) => {
  try {
    return await ProviderModel.find({ userId })
      .projection({ config: 0 })
      .lean();
  } catch (err) {
    throw err;
  }
};

export const findProviderByProviderIdAndUserId = async (
  providerId: string,
  userId: string,
) => {
  try {
    return await ProviderModel.findOne({ _id: providerId, userId });
  } catch (err) {
    throw err;
  }
};

export const updateProviderConfigById = async (
  providerId: string,
  config: EncryptedProviderConfig,
): Promise<mongoose.UpdateResult> => {
  return await ProviderModel.updateOne(
    { _id: providerId },
    { $set: { config } },
  );
};

export const toggleProviderById = async (
  _id: string,
  isActive: boolean,
): Promise<mongoose.UpdateResult> => {
  try {
    return await ProviderModel.updateOne(
      { _id },
      { $set: { isEnable: isActive } },
    );
  } catch (err) {
    throw err;
  }
};

export const deleteDocumentByProviderIdAndUserId = async ({
  providerId,
  userId,
}: {
  providerId: string;
  userId: string;
}): Promise<mongoose.DeleteResult> => {
  try {
    return await ProviderModel.deleteOne({ _id: providerId, userId });
  } catch (err) {
    throw err;
  }
};
