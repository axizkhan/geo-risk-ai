import mongoose from "mongoose";

export interface IUser {
  email: string;
  password: string;
  isVerified: boolean;
  tokenVersion: number;
  name: {
    firstName: string;
    lastName?: string;
  };
  lastLoginAt: Date;
  expireAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },

    expireAt: {
      type: Date,
      default: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 2,
    },

    tokenVersion: { type: Number, default: 0, required: true },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
      },
    },
    lastLoginAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

userSchema.index({ email: 1 });
userSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export const UserModel = mongoose.model<IUser>("User", userSchema);
