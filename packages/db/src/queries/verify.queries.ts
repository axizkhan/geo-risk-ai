import { HydratedDocument, Schema } from "mongoose";
import { IVerify, VerifyModel } from "../models/verify.model";

export const createVerify = async (
  verifyToken: string,
  userId: string,
): Promise<HydratedDocument<IVerify>> => {
  try {
    return await VerifyModel.create({ verifyToken, userId });
  } catch (err) {
    throw err;
  }
};

export const findVerifyToken = async (
  verifyToken: string,
): Promise<HydratedDocument<IVerify> | null> => {
  try {
    return await VerifyModel.findOneAndDelete({ verifyToken });
  } catch (err) {
    throw err;
  }
};
