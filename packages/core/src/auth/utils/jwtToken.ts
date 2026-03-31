import { env } from "@repo/shared";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export function jwtTokenGeneration(
  {
    id,
    email,
  }: {
    id: string;
    email: string;
  },
  tokenVersion: number | undefined = undefined,
): string {
  const token = jwt.sign(
    { id, email, tokenVersion },
    env.JWT_SECRET as string,
    {
      expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    },
  );

  return token;
}
