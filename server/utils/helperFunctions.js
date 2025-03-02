import { hash } from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const hashPasswordFUn = async (password) => {
  const result = await hash(password, Number(process.env.SOLT_ROUNDS));
  return result;
};

export const createTokenFun = async (userId, validity) => {
  const token = jwt.sign({ userId }, String(process.env.JWT_SECRET), {
    expiresIn: validity,
  });
  return token
};
