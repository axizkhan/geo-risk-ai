import { SignupRequestDTO } from "@repo/shared";
import { IUser, UserModel } from "../models/user.model";
import { HydratedDocument } from "mongoose";

export async function findUserByEmail(
  email: string,
): Promise<HydratedDocument<IUser> | null> {
  try {
    return await UserModel.findOne({ email });
  } catch (err) {
    throw err;
  }
}

export async function findUserById(
  id: string,
): Promise<HydratedDocument<IUser> | null> {
  try {
    return await UserModel.findById(id);
  } catch (err) {
    throw err;
  }
}

export async function createNewUser(
  data: SignupRequestDTO,
): Promise<HydratedDocument<IUser>> {
  try {
    return await UserModel.create(data);
  } catch (err) {
    throw err;
  }
}

export const verifyUser = async (
  userId: string,
): Promise<HydratedDocument<IUser> | null> => {
  try {
    const user = await UserModel.findByIdAndUpdate(userId, {
      isVerified: true,
      expireAt: null,
    });

    return user;
  } catch (err) {
    throw err;
  }
};

export const userTokenVersionIncrement = async (
  userId: string,
): Promise<boolean> => {
  try {
    let user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $inc: { tokenVersion: 1 } },
    );
    if (!user) {
      return false;
    }

    return true;
  } catch (err) {
    throw err;
  }
};

// export const findVerifiedUserByEmail = async (
//   email: string,
// ): Promise<HydratedDocument<IUser> | null> => {
//   try {
//     return await UserModel.findOne({
//       email,
//       isVerified: { $eq: true },
//       expireAt: { $eq: null },
//     });
//   } catch (err) {
//     throw err;
//   }
// };
