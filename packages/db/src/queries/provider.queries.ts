import { ChannelType, EncryptedProviderConfig } from "@repo/shared";
import { IProvider, ProviderModel } from "../models/provider.model";
import { providerCreateDoc } from "../types/provider.types";
import mongoose, { HydratedDocument } from "mongoose";

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

export const findAllProviderByUserId = async (
  userId: string,
): Promise<Array<mongoose.InferRawDocType<IProvider>> | null> => {
  return ProviderModel.find({
    userId: new mongoose.Types.ObjectId(userId),
    isEnable: true,
  })
    .lean()
    .sort({ type: 1 });
};

export const findProviderForJob = async ({
  userId,
  type,
}: {
  userId: string;
  type: ChannelType;
}): Promise<HydratedDocument<IProvider> | null> => {
  try {
    return await ProviderModel.findOne({ userId, type });
  } catch (err) {
    throw err;
  }
};

export const getProviderForMessage = async (
  _id: string,
): Promise<IProvider | null> => {
  try {
    return await ProviderModel.findById(_id).lean();
  } catch (err) {
    throw err;
  }
};
